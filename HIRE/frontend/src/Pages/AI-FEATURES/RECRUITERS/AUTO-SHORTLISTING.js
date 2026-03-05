import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlineCheck, HiOutlineX, HiOutlineEye } from 'react-icons/hi';
import { getMyJobs, getJobApplications } from '../../../api';

const AutoShortlisting = () => {
    const [jobs, setJobs] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filtering states
    const [minMatch, setMinMatch] = useState(75);
    const [selectedJobId, setSelectedJobId] = useState('All');

    const [stats, setStats] = useState({ screened: 0, shortlisted: 0, review: 0, rejected: 0 });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jobsRes = await getMyJobs();
                const myJobs = jobsRes.data || [];
                setJobs(myJobs);

                let allCandidates = [];
                for (const job of myJobs) {
                    try {
                        const appRes = await getJobApplications(job._id);
                        const appsWithJob = appRes.data.map(app => ({ ...app, jobObj: job }));
                        allCandidates = [...allCandidates, ...appsWithJob];
                    } catch (e) { /* skip */ }
                }

                setCandidates(allCandidates);

                // Calculate stats based on 75% threshold
                const shortlisted = allCandidates.filter(c => (c.aiScore || 0) >= 75).length;
                const review = allCandidates.filter(c => (c.aiScore || 0) >= 50 && (c.aiScore || 0) < 75).length;
                const rejected = allCandidates.filter(c => (c.aiScore || 0) < 50).length;

                setStats({
                    screened: allCandidates.length,
                    shortlisted,
                    review,
                    rejected
                });

            } catch (err) {
                console.error("Error fetching shortlisting data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Apply Filters
    const filteredCandidates = candidates.filter(c => {
        const meetsScore = (c.aiScore || 0) >= minMatch;
        const meetsJob = selectedJobId === 'All' ? true : c.jobId === selectedJobId || c.jobObj?._id === selectedJobId;
        return meetsScore && meetsJob;
    });

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user") || '{"name":"Guest"}').name)} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header"><h1>AI Auto-Shortlisting</h1><p>AI-powered candidate shortlisting based on job requirements</p></div>

                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[
                        { l: 'Total Screened', v: stats.screened },
                        { l: 'Auto-Shortlisted', v: stats.shortlisted },
                        { l: 'Needs Review', v: stats.review },
                        { l: 'Rejected', v: stats.rejected }
                    ].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-value">{s.v}</div><div className="stat-label">{s.l}</div></div>
                    ))}
                </div>

                <div className="glass-card" style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '12px' }}>Shortlisting Criteria</h3>
                    <div className="grid-3" style={{ gap: '12px' }}>
                        <div className="input-group">
                            <label>Min Match Score (%)</label>
                            <input
                                className="input-field"
                                type="number"
                                value={minMatch}
                                onChange={e => setMinMatch(Number(e.target.value))}
                            />
                        </div>
                        <div className="input-group">
                            <label>Position</label>
                            <select
                                className="select-field"
                                value={selectedJobId}
                                onChange={e => setSelectedJobId(e.target.value)}
                            >
                                <option value="All">All Positions</option>
                                {jobs.map(j => (
                                    <option key={j._id} value={j._id}>{j.title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="data-table">
                        <thead><tr><th>Candidate</th><th>Job Applied</th><th>AI Match</th><th>Overall</th><th>Auto</th><th>Actions</th></tr></thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Loading shortlisting data...</td></tr>
                            ) : filteredCandidates.length === 0 ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No candidates meet the criteria.</td></tr>
                            ) : (
                                filteredCandidates.map((c, i) => {
                                    const score = c.aiScore || 0;
                                    let overall = 'Not Recommended';
                                    if (score >= 75) overall = 'Recommended';
                                    else if (score >= 50) overall = 'Maybe';

                                    return (
                                        <tr key={c._id || i}>
                                            <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.candidateId?.name || 'Unknown'}</td>
                                            <td>{c.jobObj?.title || 'Unknown Job'}</td>
                                            <td style={{ fontWeight: 700 }}>{score}%</td>
                                            <td><span className="badge badge-outline">{overall}</span></td>
                                            <td>{score >= 75 ? '✓' : '—'}</td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '4px' }}>
                                                    <button className="btn-icon" title="View"><HiOutlineEye /></button>
                                                    <button className="btn-icon" title="Approve"><HiOutlineCheck /></button>
                                                    <button className="btn-icon" title="Reject"><HiOutlineX /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AutoShortlisting;
