import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';
import { HiOutlineCurrencyDollar, HiOutlineTrendingUp, HiOutlineUsers, HiOutlineCreditCard } from 'react-icons/hi';
import { getAdminDashboard, getUsers } from '../../api';

const RevenueDashboard = () => {
    const [stats, setStats] = useState({ users: 0, jobs: 0, applications: 0 });
    const [userBreakdown, setUserBreakdown] = useState({ seekers: 0, recruiters: 0, admins: 0 });
    const [loading, setLoading] = useState(true);
    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Admin' };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, usersRes] = await Promise.all([getAdminDashboard(), getUsers()]);
                setStats(statsRes.data);
                const users = usersRes.data;
                setUserBreakdown({
                    seekers: users.filter(u => u.role === 'seeker').length,
                    recruiters: users.filter(u => u.role === 'recruiter').length,
                    admins: users.filter(u => u.role === 'admin').length,
                });
            } catch (err) {
                console.error('Revenue dashboard error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <DashboardLayout sidebarLinks={adminLinks} userName={user.name} userRole="Administrator">
            <div className="page-wrapper">
                <div className="page-header"><h1>Revenue Dashboard</h1><p>Platform analytics and user metrics</p></div>

                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[
                        { icon: <HiOutlineUsers />, label: 'Total Users', value: loading ? '...' : stats.users, change: 'Registered' },
                        { icon: <HiOutlineCurrencyDollar />, label: 'Total Jobs', value: loading ? '...' : stats.jobs, change: 'Posted' },
                        { icon: <HiOutlineTrendingUp />, label: 'Applications', value: loading ? '...' : stats.applications, change: 'Submitted' },
                        { icon: <HiOutlineCreditCard />, label: 'Recruiters', value: loading ? '...' : userBreakdown.recruiters, change: 'Active' },
                    ].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-icon">{s.icon}</div><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div><div className="stat-change">{s.change}</div></div>
                    ))}
                </div>

                <div className="grid-2" style={{ marginBottom: '24px' }}>
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>User Breakdown</h3>
                        {loading ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
                        ) : (
                            [
                                { label: 'Job Seekers', count: userBreakdown.seekers, pct: Math.round((userBreakdown.seekers / (stats.users || 1)) * 100) },
                                { label: 'Recruiters', count: userBreakdown.recruiters, pct: Math.round((userBreakdown.recruiters / (stats.users || 1)) * 100) },
                                { label: 'Admins', count: userBreakdown.admins, pct: Math.round((userBreakdown.admins / (stats.users || 1)) * 100) },
                            ].map((p, i) => (
                                <div key={i} style={{ marginBottom: '16px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                        <div>
                                            <span style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{p.label}</span>
                                            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginLeft: '8px' }}>{p.count} users</span>
                                        </div>
                                        <span style={{ fontWeight: 700, fontSize: 'var(--fs-sm)' }}>{p.pct}%</span>
                                    </div>
                                    <div className="progress-bar"><div className="progress-fill" style={{ width: `${p.pct}%` }} /></div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Platform Health</h3>
                        <div className="grid-2" style={{ gap: '8px' }}>
                            {[
                                { label: 'Total Users', value: loading ? '...' : stats.users },
                                { label: 'Total Jobs', value: loading ? '...' : stats.jobs },
                                { label: 'Applications', value: loading ? '...' : stats.applications },
                                { label: 'Seekers', value: loading ? '...' : userBreakdown.seekers },
                            ].map((m, i) => (
                                <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
                                    <div style={{ fontSize: 'var(--fs-lg)', fontWeight: 800 }}>{m.value}</div>
                                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{m.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default RevenueDashboard;
