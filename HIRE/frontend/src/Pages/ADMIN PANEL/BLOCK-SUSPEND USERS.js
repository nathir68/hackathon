import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';
import { HiOutlineSearch, HiOutlineBan, HiOutlineCheck, HiOutlineTrash } from 'react-icons/hi';
import { getUsers, deleteUser } from '../../api';

const BlockSuspend = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await getUsers();
                setUsers(res.data);
            } catch (err) {
                console.error('Error fetching users:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this user?')) return;
        try {
            await deleteUser(id);
            setUsers(prev => prev.filter(u => u._id !== id));
        } catch (err) {
            console.error('Error:', err);
        }
    };

    const filtered = filter === 'All' ? users : users.filter(u => u.role === filter.toLowerCase());

    return (
        <DashboardLayout sidebarLinks={adminLinks} userName={(JSON.parse(localStorage.getItem("hire_user") || '{"name":"Admin"}').name)} userRole="Administrator">
            <div className="page-wrapper">
                <div className="page-header"><h1>Block / Suspend Users</h1><p>Manage restricted user accounts</p></div>
                <div className="grid-3" style={{ marginBottom: '24px' }}>
                    {[{ l: 'Total Restricted', v: users.length }, { l: 'Suspended', v: users.filter(u => u.status === 'Suspended').length }, { l: 'Blocked', v: users.filter(u => u.status === 'Blocked').length }].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-value">{s.v}</div><div className="stat-label">{s.l}</div></div>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <div className="search-bar" style={{ flex: 1 }}><HiOutlineSearch className="search-icon" /><input placeholder="Search users..." /></div>
                    <div className="tabs">{['All', 'Suspended', 'Blocked'].map(t => <button key={t} className={`tab ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>)}</div>
                </div>
                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="data-table">
                        <thead><tr><th>User</th><th>Type</th><th>Reason</th><th>Status</th><th>Since</th><th>Actions</th></tr></thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No users found.</td></tr>
                            ) : (
                                filtered.map((u, i) => (
                                    <tr key={u._id || i}>
                                        <td><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="avatar-sm">{u.name?.[0] || '?'}</div><div><div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{u.name}</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{u.email}</div></div></div></td>
                                        <td>{u.role}</td><td>-</td>
                                        <td><span className="badge badge-outline">Active</span></td>
                                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                        <td><div style={{ display: 'flex', gap: '4px' }}><button className="btn btn-ghost btn-sm" onClick={() => handleDelete(u._id)}><HiOutlineTrash /> Remove</button></div></td>
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

export default BlockSuspend;

