import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { seekerLinks } from '../Components/SidebarLinks';
import { HiOutlineSearch, HiOutlineDocumentText } from 'react-icons/hi';
import { getMyApplications, getResume } from '../../api';

const statuses = ['All', 'Applied', 'Shortlisted', 'Rejected'];

const MyApplication = () => {
    const [filter, setFilter] = useState('All');
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);

    // Get user from local storage
    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Guest' };

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const res = await getMyApplications();
                setApps(res.data);
            } catch (error) {
                console.error("Error fetching applications:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchApps();
    }, []);

    const filtered = filter === 'All' ? apps : apps.filter(a => a.status === filter);

    const handleViewResume = async (applicationId) => {
        try {
            const res = await getResume(applicationId);
            const file = new Blob([res.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
        } catch (err) {
            console.error('Failed to load resume:', err);
            alert('Could not load resume. Please contact support if this issue persists.');
        }
    };

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={user.name} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header"><h1>My Applications</h1><p>Track all your job applications in one place</p></div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
                    {statuses.map(s => (
                        <button key={s} className={`tab ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>{s}</button>
                    ))}
                </div>
                <div className="search-bar" style={{ marginBottom: '24px' }}><HiOutlineSearch className="search-icon" /><input placeholder="Search applications..." /></div>
                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="data-table">
                        <thead><tr><th>Position</th><th>Company</th><th>Date Applied</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Loading applications...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No applications found.</td></tr>
                            ) : (
                                filtered.map((a, i) => (
                                    <tr key={a._id || i}>
                                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{a.jobId?.title || 'Unknown Position'}</td>
                                        <td>{a.jobId?.company || 'Company'}</td>
                                        <td>{new Date(a.createdAt || Date.now()).toLocaleDateString()}</td>
                                        <td><span className={`badge ${a.status === 'Shortlisted' ? 'badge-primary' : a.status === 'Rejected' ? 'badge-danger' : 'badge-outline'}`}>{a.status}</span></td>
                                        <td>
                                            <button
                                                className="btn btn-outline btn-sm"
                                                onClick={() => handleViewResume(a._id)}
                                            >
                                                <HiOutlineDocumentText /> View Resume
                                            </button>
                                        </td>
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

export default MyApplication;

