import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlineSearch, HiOutlineDownload, HiOutlineEye, HiOutlineChatAlt2, HiOutlineDocumentText } from 'react-icons/hi';
import { getMyJobs, getJobApplications, updateAppStatus, getResume } from '../../../api';

const ViewApplications = () => {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const statuses = ['All', 'Applied', 'Shortlisted', 'Rejected'];

    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Recruiter' };

    useEffect(() => {
        const fetchApps = async () => {
            try {
                const jobsRes = await getMyJobs();
                const jobs = jobsRes.data;
                let allApps = [];
                for (const job of jobs) {
                    try {
                        const appRes = await getJobApplications(job._id);
                        const jobApps = appRes.data.map(a => ({ ...a, jobTitle: job.title }));
                        allApps = [...allApps, ...jobApps];
                    } catch (e) { /* skip jobs with no apps */ }
                }
                setApps(allApps);
            } catch (err) {
                console.error('Error fetching applications:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchApps();
    }, []);

    const handleStatusChange = async (appId, newStatus) => {
        try {
            await updateAppStatus(appId, { status: newStatus });
            setApps(prev => prev.map(a => a._id === appId ? { ...a, status: newStatus } : a));
        } catch (err) {
            console.error('Failed to update status:', err);
        }
    };

    const handleResumeReview = async (applicationId) => {
        try {
            const res = await getResume(applicationId);
            const file = new Blob([res.data], { type: 'application/pdf' });
            window.open(URL.createObjectURL(file), '_blank');
        } catch (err) {
            console.error('Failed to load resume:', err);
            alert('Candidate has not uploaded a resume.');
        }
    };

    const filtered = filter === 'All' ? apps : apps.filter(a => a.status === filter);

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={user.name} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header"><h1>Applications</h1><p>Review and manage candidate applications</p></div>

                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[{ l: 'Total', v: apps.length }, { l: 'Applied', v: apps.filter(a => a.status === 'Applied').length }, { l: 'Shortlisted', v: apps.filter(a => a.status === 'Shortlisted').length }, { l: 'Rejected', v: apps.filter(a => a.status === 'Rejected').length }].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-value">{s.v}</div><div className="stat-label">{s.l}</div></div>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <div className="search-bar" style={{ flex: 1 }}><HiOutlineSearch className="search-icon" /><input placeholder="Search candidates..." /></div>
                    <div className="tabs">{statuses.map(s => <button key={s} className={`tab ${filter === s ? 'active' : ''}`} onClick={() => setFilter(s)}>{s}</button>)}</div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {loading ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading applications...</div>
                    ) : filtered.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No applications found.</div>
                    ) : (
                        filtered.map((a, i) => (
                            <div className="glass-card" key={a._id || i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div className="avatar-lg">{a.candidateId?.name?.[0] || '?'}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700 }}>{a.candidateId?.name || 'Unknown'}</div>
                                    <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{a.jobTitle || 'Job'} · {a.candidateId?.email || ''}</div>
                                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Applied {new Date(a.createdAt).toLocaleDateString()}</div>
                                </div>
                                <div style={{ textAlign: 'center', marginRight: '16px' }}>
                                    <div style={{ fontWeight: 800, fontSize: 'var(--fs-xl)' }}>{a.aiScore || '-'}%</div>
                                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>AI Score</div>
                                </div>
                                <span className={`badge ${a.status === 'Shortlisted' ? 'badge-primary' : a.status === 'Rejected' ? 'badge-danger' : 'badge-outline'}`}>{a.status}</span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="btn btn-ghost btn-sm" onClick={() => handleResumeReview(a._id)}><HiOutlineDocumentText /> Resume</button>
                                    <button className="btn btn-primary btn-sm" onClick={() => handleStatusChange(a._id, 'Shortlisted')}>Shortlist</button>
                                    <button className="btn btn-ghost btn-sm" onClick={() => handleStatusChange(a._id, 'Rejected')}>Reject</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ViewApplications;

