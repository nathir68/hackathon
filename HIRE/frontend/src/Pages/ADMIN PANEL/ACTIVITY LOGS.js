import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';
import { HiOutlineSearch } from 'react-icons/hi';
import { getActivityLogs } from '../../api';

const ActivityLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Admin' };

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await getActivityLogs();
                setLogs(res.data);
            } catch (err) {
                console.error('Error fetching logs:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    return (
        <DashboardLayout sidebarLinks={adminLinks} userName={user.name} userRole="Administrator">
            <div className="page-wrapper">
                <div className="page-header"><h1>Activity Logs</h1><p>Monitor all platform activity</p></div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <div className="search-bar" style={{ flex: 1 }}><HiOutlineSearch className="search-icon" /><input placeholder="Search logs..." /></div>
                    <select className="select-field" style={{ width: '160px' }}><option>All Types</option><option>Job</option><option>Application</option><option>Admin</option><option>Security</option></select>
                    <select className="select-field" style={{ width: '160px' }}><option>Last 24h</option><option>Last 7 days</option><option>Last 30 days</option></select>
                </div>
                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="data-table">
                        <thead><tr><th>User</th><th>Action</th><th>Type</th><th>Time</th><th>IP Address</th></tr></thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
                            ) : logs.length === 0 ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No activity logs yet.</td></tr>
                            ) : (
                                logs.map((l, i) => (
                                    <tr key={l._id || i}>
                                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{l.userName || 'System'}</td>
                                        <td>{l.action}</td>
                                        <td><span className="badge badge-outline">{l.type}</span></td>
                                        <td>{new Date(l.createdAt).toLocaleString()}</td>
                                        <td style={{ fontFamily: 'monospace', fontSize: 'var(--fs-xs)' }}>{l.ip}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ActivityLogs;
