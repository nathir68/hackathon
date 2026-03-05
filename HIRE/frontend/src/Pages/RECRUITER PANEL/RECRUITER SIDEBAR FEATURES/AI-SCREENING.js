import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { getMyJobs, getJobApplications, getResume } from '../../../api';

const AIScreening = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ screened: 0, passed: 0, flagged: 0, accuracy: '96%' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getMyJobs();
                const myJobs = res.data;

                let allCandidates = [];
                for (const job of myJobs) {
                    try {
                        const appRes = await getJobApplications(job._id);
                        const appsWithJob = appRes.data.map(app => ({ ...app, jobTitle: job.title }));
                        allCandidates = [...allCandidates, ...appsWithJob];
                    } catch (e) { /* skip */ }
                }

                setCandidates(allCandidates);
                const passed = allCandidates.filter(c => (c.aiScore || 0) >= 75).length;
                const flagged = allCandidates.filter(c => (c.aiScore || 0) < 75).length;

                setStats({
                    screened: allCandidates.length,
                    passed,
                    flagged,
                    accuracy: '98%'
                });
            } catch (err) {
                console.error("Error fetching screening data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleReview = async (applicationId) => {
        try {
            const res = await getResume(applicationId);
            const file = new Blob([res.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
        } catch (err) {
            console.error('Failed to load resume:', err);
            alert('Could not load resume. The candidate might not have uploaded one.');
        }
    };

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user") || '{"name":"Guest"}').name)} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header"><h1>AI Resume Screening</h1><p>Automated resume analysis and candidate scoring</p></div>

                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[
                        { l: 'Screened', v: stats.screened },
                        { l: 'Passed (>=75%)', v: stats.passed },
                        { l: 'Flagged (<75%)', v: stats.flagged },
                        { l: 'Accuracy', v: stats.accuracy }
                    ].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-value">{s.v}</div><div className="stat-label">{s.l}</div></div>
                    ))}
                </div>

                <div className="glass-card" style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>How AI Screening Works</h3>
                    <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>Our Gemini AI analyzes resumes for skill matching, experience relevance, and overall fit. Flagged candidates are marked for manual review.</p>
                </div>

                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="data-table">
                        <thead><tr><th>Candidate</th><th>Job Applied</th><th>AI Score</th><th>Status</th><th>Flag</th><th>Action</th></tr></thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Loading AI Screening Data...</td></tr>
                            ) : candidates.length === 0 ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No candidates found for your jobs.</td></tr>
                            ) : (
                                candidates.map((s, i) => {
                                    const score = s.aiScore || 0;
                                    const flag = score >= 75 ? 'None' : 'Needs Review';
                                    return (
                                        <tr key={s._id || i}>
                                            <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{s.candidateId?.name || 'Unknown'}</td>
                                            <td>{s.jobTitle}</td>
                                            <td style={{ fontWeight: 700 }}>{score}%</td>
                                            <td><span className="badge badge-outline">{s.status}</span></td>
                                            <td><span className={`badge ${score >= 75 ? 'badge-light' : 'badge-warning'}`}>{flag}</span></td>
                                            <td><button className="btn btn-ghost btn-sm" onClick={() => handleReview(s._id)}>Review Resume</button></td>
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

export default AIScreening;
