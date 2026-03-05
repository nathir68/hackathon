import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { getMyJobs, getJobApplications } from '../../../api';

const HiringAnalytics = () => {
    const [stats, setStats] = useState({ totalJobs: 0, totalApps: 0, shortlisted: 0, rejected: 0 });
    const [pipeline, setPipeline] = useState([]);
    const [loading, setLoading] = useState(true);
    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Guest' };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jobsRes = await getMyJobs();
                const jobs = jobsRes.data;
                let applied = 0, shortlisted = 0, rejected = 0;
                for (const job of jobs) {
                    try {
                        const appRes = await getJobApplications(job._id);
                        const apps = appRes.data;
                        applied += apps.length;
                        shortlisted += apps.filter(a => a.status === 'Shortlisted').length;
                        rejected += apps.filter(a => a.status === 'Rejected').length;
                    } catch (e) { /* skip */ }
                }
                setStats({ totalJobs: jobs.length, totalApps: applied, shortlisted, rejected });
                setPipeline([
                    { stage: 'Applied', count: applied },
                    { stage: 'Shortlisted', count: shortlisted },
                    { stage: 'Rejected', count: rejected },
                ]);
            } catch (err) {
                console.error('Analytics error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const maxCount = Math.max(...pipeline.map(p => p.count), 1);

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={user.name} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header"><h1>Hiring Analytics</h1><p>Insights into your hiring performance</p></div>

                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[
                        { label: 'Total Jobs', value: loading ? '...' : stats.totalJobs, change: 'Posted' },
                        { label: 'Total Applicants', value: loading ? '...' : stats.totalApps, change: 'All time' },
                        { label: 'Shortlisted', value: loading ? '...' : stats.shortlisted, change: 'Candidates' },
                        { label: 'Rejected', value: loading ? '...' : stats.rejected, change: 'Candidates' },
                    ].map((m, i) => (
                        <div className="stat-card" key={i}><div className="stat-value">{m.value}</div><div className="stat-label">{m.label}</div><div className="stat-change">{m.change}</div></div>
                    ))}
                </div>

                <div className="glass-card" style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Hiring Pipeline</h3>
                    {loading ? (
                        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
                    ) : pipeline.length === 0 ? (
                        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No data yet.</div>
                    ) : (
                        pipeline.map((p, i) => (
                            <div key={i} style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontSize: 'var(--fs-sm)' }}>{p.stage}</span>
                                    <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>{p.count}</span>
                                </div>
                                <div className="progress-bar"><div className="progress-fill" style={{ width: `${(p.count / maxCount) * 100}%` }}></div></div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default HiringAnalytics;
