import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlineDocumentText, HiOutlineUserGroup, HiOutlineEye, HiOutlineTrendingUp, HiOutlineChevronRight } from 'react-icons/hi';
import { getMyJobs, getJobApplications } from '../../../api';



const RecruiterDashboard = () => {
    const [jobs, setJobs] = useState([]);
    const [topCandidates, setTopCandidates] = useState([]);
    const [stats, setStats] = useState({ activeJobs: 0, totalApplicants: 0, shortlisted: 0 });
    const [loading, setLoading] = useState(true);
    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Guest' };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getMyJobs();
                const myJobs = res.data;
                setJobs(myJobs);

                let allCandidates = [];
                for (const job of myJobs) {
                    try {
                        const appRes = await getJobApplications(job._id);
                        allCandidates = [...allCandidates, ...appRes.data];
                    } catch (e) { /* skip */ }
                }

                const totalApps = allCandidates.length;
                const shortApps = allCandidates.filter(c => c.status === 'Shortlisted').length;

                // Sort by AI score
                const sortedCandidates = allCandidates.sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0));
                setTopCandidates(sortedCandidates.slice(0, 3));

                setStats({ activeJobs: myJobs.length, totalApplicants: totalApps, shortlisted: shortApps });

            } catch (err) {
                console.error('Dashboard fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={user.name} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="glass-card" style={{ marginBottom: '24px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '100%', background: 'radial-gradient(circle at right, rgba(255,255,255,0.03), transparent)', pointerEvents: 'none' }} />
                    <h1 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800, marginBottom: '8px' }}>Welcome back, {user.name.split(' ')[0]} 👋</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Here's your hiring overview for today.</p>
                </div>

                <div className="grid-3" style={{ marginBottom: '24px' }}>
                    {[
                        { icon: <HiOutlineDocumentText />, label: 'Active Jobs', value: stats.activeJobs, change: 'Total posted' },
                        { icon: <HiOutlineUserGroup />, label: 'Total Applicants', value: stats.totalApplicants, change: 'Across all jobs' },
                        { icon: <HiOutlineTrendingUp />, label: 'Shortlisted', value: stats.shortlisted, change: 'Moved to next round' },
                    ].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-icon">{s.icon}</div><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div><div className="stat-change">{s.change}</div></div>
                    ))}
                </div>

                <div className="grid-2" style={{ marginBottom: '24px' }}>
                    <div className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontWeight: 700 }}>Recent Job Posts</h3>
                            <Link to="/recruiter/manage-jobs" className="btn btn-ghost btn-sm">View All <HiOutlineChevronRight /></Link>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {loading ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
                            ) : jobs.length === 0 ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No jobs posted yet.</div>
                            ) : (
                                jobs.slice(0, 4).map((j, i) => (
                                    <div key={j._id || i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{j.title}</div>
                                            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{j.location} · {new Date(j.createdAt).toLocaleDateString()}</div>
                                        </div>
                                        <span className="badge badge-outline">Active</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontWeight: 700 }}>Top AI Candidates</h3>
                            <Link to="/recruiter/candidate-ranking" className="btn btn-ghost btn-sm">View All <HiOutlineChevronRight /></Link>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                            {loading ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
                            ) : topCandidates.length === 0 ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Top candidates will appear here when applicants apply.</div>
                            ) : (
                                topCandidates.map((c, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                            <div className="avatar" style={{ width: '32px', height: '32px', fontSize: 'var(--fs-xs)' }}>{c.candidateId?.name?.[0] || '?'}</div>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{c.candidateId?.name || 'Unknown'}</div>
                                                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>{c.jobId?.title || 'Applied Job'}</div>
                                            </div>
                                        </div>
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ fontWeight: 800, color: 'var(--primary-color)' }}>{c.aiScore || '-'}%</div>
                                            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Match</div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <Link to="/recruiter/post-job" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>Post New Job</Link>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default RecruiterDashboard;

