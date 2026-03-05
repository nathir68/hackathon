import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { seekerLinks } from '../Components/SidebarLinks';
import { getJobs, applyJob } from '../../api';

const RecommendedJobs = () => {
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
                console.error('Error fetching jobs:', err);
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
                <div className="page-header"><h1>Recommended Jobs</h1><p>AI-matched opportunities based on your profile</p></div>
                <div className="glass-card" style={{ marginBottom: '24px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>💡 Complete your profile to improve match accuracy</div>
                    <button className="btn btn-primary btn-sm">Update Profile</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {loading ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading recommendations...</div>
                    ) : jobs.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No recommendations yet. Check back later!</div>
                    ) : (
                        jobs.map((j, i) => (
                            <div className="glass-card" key={j._id || i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                                <div style={{ width: '56px', height: '56px', borderRadius: 'var(--radius-md)', background: 'var(--grey-800)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>{j.title?.[0] || '?'}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                        <div><div style={{ fontWeight: 700, fontSize: 'var(--fs-lg)' }}>{j.title}</div><div style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>{j.location}</div></div>
                                    </div>
                                    <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', marginBottom: '12px', padding: '8px 12px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-sm)' }}>{j.description?.substring(0, 120) || 'No description'}...</div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div style={{ display: 'flex', gap: '6px' }}>
                                            {j.skills?.slice(0, 3).map((s, k) => <span className="chip" key={k}>{s}</span>)}
                                        </div>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 700 }}>{j.salary || 'Not specified'}</span>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => openApplyModal(j._id)}
                                                disabled={applyingObj[j._id]}
                                            >
                                                {applyingObj[j._id] ? 'Applying...' : 'Apply'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
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

export default RecommendedJobs;
