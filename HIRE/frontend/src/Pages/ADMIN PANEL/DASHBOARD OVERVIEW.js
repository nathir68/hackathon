import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';
import { HiOutlineUserGroup, HiOutlineBriefcase, HiOutlineDocumentText, HiOutlineTrendingUp, HiOutlineChevronRight } from 'react-icons/hi';
import { getAdminDashboard, getUsers, getAdminJobs } from '../../api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ users: 0, jobs: 0, applications: 0 });
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Admin' };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, usersRes, jobsRes] = await Promise.all([
                    getAdminDashboard(), getUsers(), getAdminJobs()
                ]);
                setStats(statsRes.data);
                setUsers(usersRes.data);
                setJobs(jobsRes.data);
            } catch (err) {
                console.error('Admin dashboard error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <DashboardLayout sidebarLinks={adminLinks} userName={user.name} userRole="Administrator">
            <div className="page-wrapper">
                <div className="glass-card" style={{ marginBottom: '24px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '100%', background: 'radial-gradient(circle at right, rgba(255,255,255,0.03), transparent)', pointerEvents: 'none' }} />
                    <h1 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800, marginBottom: '8px' }}>Admin Dashboard</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Platform overview and system health</p>
                </div>

                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[
                        { icon: <HiOutlineUserGroup />, label: 'Total Users', value: loading ? '...' : stats.users, change: 'All registered' },
                        { icon: <HiOutlineBriefcase />, label: 'Active Jobs', value: loading ? '...' : stats.jobs, change: 'Total posted' },
                        { icon: <HiOutlineDocumentText />, label: 'Applications', value: loading ? '...' : stats.applications, change: 'Total submitted' },
                        { icon: <HiOutlineTrendingUp />, label: 'Platform', value: 'Active', change: 'All systems go' },
                    ].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-icon">{s.icon}</div><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div><div className="stat-change">{s.change}</div></div>
                    ))}
                </div>

                <div className="grid-2" style={{ marginBottom: '24px' }}>
                    <div className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontWeight: 700 }}>Recent Users</h3>
                            <Link to="/admin/manage-seekers" className="btn btn-ghost btn-sm">View All <HiOutlineChevronRight /></Link>
                        </div>
                        {loading ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
                        ) : users.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No users found.</div>
                        ) : (
                            users.slice(0, 4).map((u, i) => (
                                <div key={u._id || i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div className="avatar">{u.name?.[0] || '?'}</div><div><div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{u.name}</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{u.role} · {new Date(u.createdAt).toLocaleDateString()}</div></div></div>
                                    <span className="badge badge-outline">Active</span>
                                </div>
                            ))
                        )}
                    </div>
                    <div className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontWeight: 700 }}>Recent Job Posts</h3>
                            <Link to="/admin/manage-jobs" className="btn btn-ghost btn-sm">View All <HiOutlineChevronRight /></Link>
                        </div>
                        {loading ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
                        ) : jobs.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No jobs found.</div>
                        ) : (
                            jobs.slice(0, 3).map((j, i) => (
                                <div key={j._id || i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '8px' }}>
                                    <div><div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{j.title}</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{j.recruiterId?.name || 'Recruiter'} · {new Date(j.createdAt).toLocaleDateString()}</div></div>
                                    <span className="badge badge-outline">Active</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;

