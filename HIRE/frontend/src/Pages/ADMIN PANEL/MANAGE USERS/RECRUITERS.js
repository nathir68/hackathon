import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { adminLinks } from '../../Components/SidebarLinks';
import { HiOutlineSearch, HiOutlineBan, HiOutlineCheck, HiOutlineEye, HiOutlineTrash } from 'react-icons/hi';
import { getUsers, deleteUser } from '../../../api';

const ManageRecruiters = () => {
    const [recruiters, setRecruiters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Admin' };

    useEffect(() => {
        const fetchRecruiters = async () => {
            try {
                const res = await getUsers();
                setRecruiters(res.data.filter(u => u.role === 'recruiter'));
            } catch (err) {
                console.error('Error fetching recruiters:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchRecruiters();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this recruiter?')) return;
        try {
            await deleteUser(id);
            setRecruiters(prev => prev.filter(r => r._id !== id));
        } catch (err) {
            console.error('Error deleting recruiter:', err);
        }
    };

    const filtered = filter === 'All' ? recruiters : recruiters.filter(r => r.status === filter);

    return (
        <DashboardLayout sidebarLinks={adminLinks} userName={user.name} userRole="Administrator">
            <div className="page-wrapper">
                <div className="page-header"><h1>Manage Recruiters</h1><p>View and manage recruiter accounts</p></div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <div className="search-bar" style={{ flex: 1 }}><HiOutlineSearch className="search-icon" /><input placeholder="Search recruiters..." /></div>
                    <div className="tabs">{['All', 'Active', 'Suspended', 'Pending'].map(t => <button key={t} className={`tab ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>)}</div>
                </div>
                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="data-table">
                        <thead><tr><th>Name</th><th>Email</th><th>Joined</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No recruiters found.</td></tr>
                            ) : (
                                filtered.map((r, i) => (
                                    <tr key={r._id || i}>
                                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.name}</td>
                                        <td>{r.email}</td>
                                        <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                                        <td><span className="badge badge-outline">{r.role}</span></td>
                                        <td><span className="badge badge-outline">Active</span></td>
                                        <td><div style={{ display: 'flex', gap: '4px' }}><button className="btn-icon" title="Delete" onClick={() => handleDelete(r._id)}><HiOutlineTrash /></button></div></td>
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

export default ManageRecruiters;


