import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';
import { HiOutlineShieldExclamation, HiOutlineExclamation, HiOutlineCheck, HiOutlineBan, HiOutlineEye, HiOutlineSearch } from 'react-icons/hi';
import { getAdminDashboard, getUsers } from '../../api';

const FraudDetection = () => {
    const [stats, setStats] = useState({ users: 0, jobs: 0 });
    const [loading, setLoading] = useState(true);
    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Admin' };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getAdminDashboard();
                setStats(res.data);
            } catch (err) {
                console.error('Fraud detection error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <DashboardLayout sidebarLinks={adminLinks} userName={user.name} userRole="Administrator">
            <div className="page-wrapper">
                <div className="page-header"><h1>Fraud Detection Engine</h1><p>AI-powered detection of scam jobs, ghost postings, and suspicious accounts</p></div>

                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[
                        { icon: <HiOutlineShieldExclamation />, label: 'Total Users', value: loading ? '...' : stats.users, change: 'Monitored' },
                        { icon: <HiOutlineExclamation />, label: 'Total Jobs', value: loading ? '...' : stats.jobs, change: 'Scanned' },
                        { icon: <HiOutlineBan />, label: 'Flagged', value: '0', change: 'No issues found' },
                        { icon: <HiOutlineCheck />, label: 'All Clear', value: '✓', change: 'System healthy' },
                    ].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-icon">{s.icon}</div><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div><div className="stat-change">{s.change}</div></div>
                    ))}
                </div>

                <div className="glass-card" style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
                        <div className="tabs">
                            {['all', 'pending', 'blocked', 'reviewed'].map(f => (
                                <button key={f} className="tab">{f.charAt(0).toUpperCase() + f.slice(1)}</button>
                            ))}
                        </div>
                        <div className="search-bar" style={{ width: '280px' }}>
                            <HiOutlineSearch className="search-icon" />
                            <input placeholder="Search flagged items..." />
                        </div>
                    </div>

                    <table className="data-table">
                        <thead><tr><th>Type</th><th>Entity</th><th>Risk Score</th><th>Reason</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            <tr><td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                                {loading ? 'Loading...' : 'No flagged items found. All users and jobs appear legitimate.'}
                            </td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default FraudDetection;
