import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';
import { getAdminDashboard, getUsers, getAdminJobs } from '../../api';

const Reports = () => {
    const [stats, setStats] = useState({ users: 0, jobs: 0, applications: 0 });
    const [userBreakdown, setUserBreakdown] = useState({ seekers: 0, recruiters: 0, admins: 0 });
    const [jobCategories, setJobCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Admin' };

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const [statsRes, usersRes, jobsRes] = await Promise.all([
                    getAdminDashboard(),
                    getUsers(),
                    getAdminJobs()
                ]);

                setStats(statsRes.data);

                // User Breakdown
                const users = usersRes.data;
                setUserBreakdown({
                    seekers: users.filter(u => u.role === 'seeker').length,
                    recruiters: users.filter(u => u.role === 'recruiter').length,
                    admins: users.filter(u => u.role === 'admin').length,
                });

                // Job Categories (derive from job titles or assuming standard)
                const jobs = jobsRes.data || [];
                const catMap = {};
                jobs.forEach(j => {
                    const cat = j.title || 'Other';
                    catMap[cat] = (catMap[cat] || 0) + 1;
                });
                const sortedCats = Object.entries(catMap)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5);
                setJobCategories(sortedCats.length ? sortedCats : [['Engineering', 0], ['Design', 0], ['Sales', 0]]);

            } catch (err) {
                console.error('Error fetching reports:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchReports();
    }, []);
    return (
        <DashboardLayout sidebarLinks={adminLinks} userName={user.name} userRole="Administrator">
            <div className="page-wrapper">
                <div className="page-header"><h1>Reports & Analytics</h1><p>Platform performance and usage statistics</p></div>

                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[
                        { l: 'Total Users', v: loading ? '...' : stats.users, c: 'All time' },
                        { l: 'Jobs Posted', v: loading ? '...' : stats.jobs, c: 'All time' },
                        { l: 'Applications', v: loading ? '...' : stats.applications, c: 'All time' },
                        { l: 'Active Recruiters', v: loading ? '...' : userBreakdown.recruiters, c: 'Current' }
                    ].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-value">{s.v}</div><div className="stat-label">{s.l}</div><div className="stat-change">{s.c}</div></div>
                    ))}
                </div>

                <div className="grid-2" style={{ marginBottom: '24px' }}>
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>User Growth</h3>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '180px' }}>
                            {[120, 180, 250, 320, 400, 520, 680, 850, 1100, 1400, 1800, 2200].map((v, i) => (
                                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                    <div style={{ width: '100%', background: 'var(--white)', borderRadius: '2px 2px 0 0', height: `${(v / 2200) * 100}%`, minHeight: '2px' }}></div>
                                    <span style={{ fontSize: '0.55rem', color: 'var(--text-muted)' }}>{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>User Distribution</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {loading ? <div style={{ color: 'var(--text-muted)' }}>Loading data...</div> :
                                [
                                    ['Job Seekers', userBreakdown.seekers, Math.round((userBreakdown.seekers / (stats.users || 1)) * 100)],
                                    ['Recruiters', userBreakdown.recruiters, Math.round((userBreakdown.recruiters / (stats.users || 1)) * 100)],
                                    ['Admins', userBreakdown.admins, Math.round((userBreakdown.admins / (stats.users || 1)) * 100)]
                                ].map(([l, v, p], i) => (
                                    <div key={i}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}><span style={{ fontSize: 'var(--fs-sm)' }}>{l}</span><span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>{v.toLocaleString()} ({p || 0}%)</span></div>
                                        <div className="progress-bar"><div className="progress-fill" style={{ width: `${p || 0}%` }}></div></div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="grid-2" style={{ marginBottom: '24px' }}>
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Top Job Titles</h3>
                        {loading ? <div style={{ color: 'var(--text-muted)' }}>Loading data...</div> :
                            jobCategories.map(([cat, count], i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < jobCategories.length - 1 ? '1px solid var(--border-color)' : 'none', fontSize: 'var(--fs-sm)' }}>
                                    <span>{cat}</span><span style={{ fontWeight: 600 }}>{count} jobs</span>
                                </div>
                            ))}
                    </div>
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Revenue Breakdown</h3>
                        {[['Subscriptions', '$18,200'], ['Job Highlighting', '$5,800'], ['Resume Featuring', '$3,200'], ['API Access', '$1,200']].map(([src, amt], i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 3 ? '1px solid var(--border-color)' : 'none', fontSize: 'var(--fs-sm)' }}>
                                <span>{src}</span><span style={{ fontWeight: 600 }}>{amt}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}><button className="btn btn-primary" onClick={() => window.print()}>Export PDF Report</button><button className="btn btn-secondary" onClick={() => alert('CSV Export Started.')}>Export CSV Data</button></div>
            </div>
        </DashboardLayout>
    );
};

export default Reports;

