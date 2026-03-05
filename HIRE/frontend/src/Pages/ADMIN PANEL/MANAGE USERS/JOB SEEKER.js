import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { adminLinks } from '../../Components/SidebarLinks';
import { HiOutlineSearch, HiOutlineBan, HiOutlineCheck, HiOutlineEye, HiOutlineTrash } from 'react-icons/hi';
import { getUsers, deleteUser } from '../../../api';

const ManageJobSeekers = () => {
    const [seekers, setSeekers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Admin' };

    useEffect(() => {
        const fetchSeekers = async () => {
            try {
                const res = await getUsers();
                setSeekers(res.data.filter(u => u.role === 'seeker'));
            } catch (err) {
                console.error('Error fetching seekers:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSeekers();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await deleteUser(id);
            setSeekers(prev => prev.filter(s => s._id !== id));
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    const filtered = filter === 'All' ? seekers : seekers.filter(s => s.status === filter);

    return (
        <DashboardLayout sidebarLinks={adminLinks} userName={user.name} userRole="Administrator">
            <div className="page-wrapper">
                <div className="page-header"><h1>Manage Job Seekers</h1><p>View and manage all job seeker accounts</p></div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <div className="search-bar" style={{ flex: 1 }}><HiOutlineSearch className="search-icon" /><input placeholder="Search seekers..." /></div>
                    <div className="tabs">{['All', 'Active', 'Suspended', 'Blocked'].map(t => <button key={t} className={`tab ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>)}</div>
                </div>
                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="data-table">
                        <thead><tr><th>User</th><th>Email</th><th>Joined</th><th>Applications</th><th>Verified</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No seekers found.</td></tr>
                            ) : (
                                filtered.map((s, i) => (
                                    <tr key={s._id || i}>
                                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="avatar-sm">{s.name?.[0] || '?'}</div>{s.name}</div></td>
                                        <td>{s.email}</td>
                                        <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                                        <td>-</td>
                                        <td>✓</td>
                                        <td><span className="badge badge-outline">Active</span></td>
                                        <td><div style={{ display: 'flex', gap: '4px' }}><button className="btn-icon" title="Delete" onClick={() => handleDelete(s._id)}><HiOutlineTrash /></button></div></td>
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

export default ManageJobSeekers;


