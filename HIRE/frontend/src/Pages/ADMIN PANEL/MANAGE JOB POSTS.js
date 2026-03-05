import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';
import { HiOutlineSearch, HiOutlineCheck, HiOutlineX, HiOutlineFlag, HiOutlineTrash } from 'react-icons/hi';
import { getAdminJobs, deleteAdminJob } from '../../api';

const ManageJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Admin' };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await getAdminJobs();
                setJobs(res.data);
            } catch (err) {
                console.error('Error fetching jobs:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this job posting?')) return;
        try {
            await deleteAdminJob(id);
            setJobs(prev => prev.filter(j => j._id !== id));
        } catch (err) {
            console.error('Error deleting job:', err);
        }
    };

    const filtered = filter === 'All' ? jobs : jobs.filter(j => j.status === filter);

    return (
        <DashboardLayout sidebarLinks={adminLinks} userName={user.name} userRole="Administrator">
            <div className="page-wrapper">
                <div className="page-header"><h1>Manage Job Posts</h1><p>Review, approve, and monitor job listings</p></div>
                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[{ l: 'Total Jobs', v: jobs.length }, { l: 'Active', v: jobs.length }, { l: 'Pending', v: 0 }, { l: 'Flagged', v: 0 }].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-value">{s.v}</div><div className="stat-label">{s.l}</div></div>
                    ))}
                </div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <div className="search-bar" style={{ flex: 1 }}><HiOutlineSearch className="search-icon" /><input placeholder="Search jobs..." /></div>
                    <div className="tabs">{['All', 'Active'].map(t => <button key={t} className={`tab ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>)}</div>
                </div>
                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="data-table">
                        <thead><tr><th>Job Title</th><th>Recruiter</th><th>Location</th><th>Salary</th><th>Posted</th><th>Actions</th></tr></thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No jobs found.</td></tr>
                            ) : (
                                filtered.map((j, i) => (
                                    <tr key={j._id || i}>
                                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{j.title}</td>
                                        <td>{j.recruiterId?.name || 'Unknown'}</td>
                                        <td>{j.location}</td>
                                        <td>{j.salary}</td>
                                        <td>{new Date(j.createdAt).toLocaleDateString()}</td>
                                        <td><div style={{ display: 'flex', gap: '4px' }}><button className="btn-icon" title="Delete" onClick={() => handleDelete(j._id)}><HiOutlineTrash /></button></div></td>
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

export default ManageJobs;

