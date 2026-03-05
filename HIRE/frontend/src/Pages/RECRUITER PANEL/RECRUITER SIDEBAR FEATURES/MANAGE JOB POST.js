import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlineSearch, HiOutlinePencil, HiOutlineTrash, HiOutlineEye, HiOutlinePause } from 'react-icons/hi';
import { getMyJobs, deleteJob } from '../../../api';

const ManageJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const navigate = useNavigate();

    // Get user from local storage
    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Recruiter' };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await getMyJobs();
                setJobs(res.data);
            } catch (error) {
                console.error("Error fetching recruiter jobs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleDelete = async (jobId) => {
        if (!window.confirm("Are you sure you want to delete this job posting permanently?")) return;
        try {
            await deleteJob(jobId);
            setJobs(jobs.filter(j => j._id !== jobId));
        } catch (error) {
            console.error("Failed to delete job:", error);
            alert("Could not delete job at this time.");
        }
    };

    // Active status logic could be more complex, simplify for now or use real status if available
    const filtered = filter === 'All' ? jobs : jobs.filter(j => j.status === filter || 'Active' === filter);

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={user.name} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header"><h1>Manage Jobs</h1><p>View and manage all your job postings</p></div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
                    <div className="search-bar" style={{ flex: 1 }}><HiOutlineSearch className="search-icon" /><input placeholder="Search jobs..." /></div>
                    <div className="tabs">{['All', 'Active', 'Paused', 'Closed'].map(t => <button key={t} className={`tab ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>)}</div>
                </div>
                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="data-table">
                        <thead><tr><th>Job Title</th><th>Department</th><th>Type</th><th>Applicants</th><th>Posted</th><th>Status</th><th>Actions</th></tr></thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>Loading jobs...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No jobs found.</td></tr>
                            ) : (
                                filtered.map((j, i) => (
                                    <tr key={j._id || i}>
                                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{j.title}</td>
                                        <td>{j.skills && j.skills.length > 0 ? j.skills[0] : 'General'}</td>
                                        <td><span className="badge badge-outline">{j.location === 'Remote' || j.location === 'remote' ? 'Remote' : 'On-site'}</span></td>
                                        <td>-</td>
                                        <td>{new Date(j.createdAt || Date.now()).toLocaleDateString()}</td>
                                        <td><span className="badge badge-outline">Active</span></td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <button className="btn-icon" title="View Applications" onClick={() => navigate(`/recruiter/candidates?jobId=${j._id}`)}><HiOutlineEye /></button>
                                                <button className="btn-icon" title="View Job Page" onClick={() => navigate(`/jobs/${j._id}`)}><HiOutlineSearch /></button>
                                                <button className="btn-icon" title="Edit" onClick={() => alert("Job editing coming soon.")}><HiOutlinePencil /></button>
                                                <button className="btn-icon" title="Pause"><HiOutlinePause /></button>
                                                <button className="btn-icon" title="Delete" onClick={() => handleDelete(j._id)}><HiOutlineTrash /></button>
                                            </div>
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

export default ManageJobs;

