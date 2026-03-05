import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { seekerLinks } from '../Components/SidebarLinks';
import { HiOutlineSearch, HiOutlineLocationMarker, HiOutlineBookmark } from 'react-icons/hi';
import { getJobs, applyJob } from '../../api';

const BrowseJobs = () => {
    const [search, setSearch] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal state for applying
    const [showApplyModal, setShowApplyModal] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);
    const [applyingObj, setApplyingObj] = useState({}); // Track which job is being applied to

    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Guest' };

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await getJobs();
                setJobs(res.data);
            } catch (err) {
                console.error('Fetch jobs failed:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const openApplyModal = (jobId) => {
        setSelectedJobId(jobId);
        setResumeFile(null);
        setShowApplyModal(true);
    };

    const handleApplySubmit = async () => {
        if (!resumeFile) return alert('Please select a resume (PDF) to upload.');

        setApplyingObj(prev => ({ ...prev, [selectedJobId]: true }));
        try {
            const formData = new FormData();
            formData.append('jobId', selectedJobId);
            formData.append('resume', resumeFile);

            await applyJob(formData);
            alert('Successfully applied to the job!');
            setShowApplyModal(false);
        } catch (err) {
            console.error('Apply job failed:', err);
            alert(err.response?.data?.message || 'Apply job failed');
        } finally {
            setApplyingObj(prev => ({ ...prev, [selectedJobId]: false }));
        }
    };

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={user.name} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header"><h1>Browse Jobs</h1><p>Find your next opportunity</p></div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <div className="search-bar" style={{ flex: 1 }}><HiOutlineSearch className="search-icon" /><input placeholder="Search jobs..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                    <select className="select-field" style={{ width: '160px' }}><option>All Types</option><option>Full-time</option><option>Remote</option><option>Part-time</option></select>
                    <select className="select-field" style={{ width: '160px' }}><option>Sort: Latest</option><option>Sort: Salary</option><option>Sort: Relevance</option></select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {loading ? (
                        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading jobs...</div>
                    ) : jobs.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', background: 'var(--grey-800)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>💼</div>
                            <h3 style={{ marginBottom: '8px' }}>No Jobs Available</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Check back later for new opportunities.</p>
                        </div>
                    ) : jobs.map((job) => (
                        <div className="glass-card" key={job._id} style={{ display: 'flex', alignItems: 'center', gap: '20px', cursor: 'pointer' }}>
                            <div className="avatar-lg" style={{ background: 'var(--grey-800)', border: '1px solid var(--border-color)', fontSize: 'var(--fs-sm)', fontWeight: 700 }}>
                                {job.recruiterId?.company ? job.recruiterId.company.substring(0, 2).toUpperCase() : 'CO'}
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 700, marginBottom: '4px' }}>{job.title}</div>
                                <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)', marginBottom: '8px' }}>{job.recruiterId?.company || 'Unknown Company'}</div>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    <span className="chip"><HiOutlineLocationMarker /> {job.location}</span>
                                    <span className="badge badge-outline">Full-time</span>
                                    {job.skills && job.skills.map((s, j) => <span className="chip" key={j}>{s}</span>)}
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 700, marginBottom: '4px' }}>{job.salary || 'Negotiable'}</div>
                                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginBottom: '12px' }}>
                                    Posted {new Date(job.createdAt).toLocaleDateString()}
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="btn-icon"><HiOutlineBookmark /></button>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => openApplyModal(job._id)}
                                        disabled={applyingObj[job._id]}
                                    >
                                        {applyingObj[job._id] ? 'Applying...' : 'Apply'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Apply Modal */}
                {showApplyModal && (
                    <div className="modal-overlay" onClick={() => setShowApplyModal(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <h3 style={{ marginBottom: '20px', fontWeight: 700 }}>Apply for Job</h3>
                            <div className="auth-form">
                                <div className="input-group">
                                    <label>Upload Resume (PDF)</label>
                                    <input
                                        type="file"
                                        className="input-field"
                                        accept=".pdf"
                                        onChange={(e) => setResumeFile(e.target.files[0])}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                                    <button
                                        className="btn btn-outline"
                                        style={{ flex: 1 }}
                                        onClick={() => setShowApplyModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        style={{ flex: 1 }}
                                        onClick={handleApplySubmit}
                                        disabled={applyingObj[selectedJobId] || !resumeFile}
                                    >
                                        {applyingObj[selectedJobId] ? 'Submitting...' : 'Submit Application'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </DashboardLayout>
    );
};

export default BrowseJobs;

