import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlineSearch, HiOutlineChatAlt2, HiOutlineDocumentText } from 'react-icons/hi';
import { getMyJobs, getJobApplications, getResume, sendMessage } from '../../../api';

const CandidateRanking = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [messaging, setMessaging] = useState({});
    const navigate = useNavigate();
    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Guest' };

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const jobsRes = await getMyJobs();
                let allCandidates = [];
                for (const job of jobsRes.data) {
                    try {
                        const appRes = await getJobApplications(job._id);
                        const jobCandidates = appRes.data.map(a => ({
                            ...a,
                            jobTitle: job.title,
                            name: a.candidateId?.name || 'Unknown',
                            email: a.candidateId?.email || '',
                        }));
                        allCandidates = [...allCandidates, ...jobCandidates];
                    } catch (e) { /* skip */ }
                }
                setCandidates(allCandidates);
            } catch (err) {
                console.error('Error fetching candidates:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCandidates();
    }, []);

    const handleViewResume = async (applicationId, candidateName) => {
        try {
            const res = await getResume(applicationId);
            const file = new Blob([res.data], { type: 'application/pdf' });
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
        } catch (err) {
            console.error('Failed to load resume:', err);
            alert('Could not load resume. The candidate might not have uploaded one.');
        }
    };

    const handleMessageCandidate = async (candidateId, jobTitle) => {
        setMessaging(prev => ({ ...prev, [candidateId]: true }));
        try {
            await sendMessage({
                receiverId: candidateId,
                text: `Hi! Thank you for applying to the ${jobTitle} position. We would like to learn more about your experience.`
            });
            navigate('/recruiter/messages');
        } catch (err) {
            console.error('Failed to send message:', err);
            alert('Could not initiate chat. Please check your connection.');
        } finally {
            setMessaging(prev => ({ ...prev, [candidateId]: false }));
        }
    };

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={user.name} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header"><h1>Candidate Ranking</h1><p>AI-ranked candidates based on job requirements</p></div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                    <div className="search-bar" style={{ flex: 1 }}><HiOutlineSearch className="search-icon" /><input placeholder="Search candidates..." /></div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {loading ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading candidates...</div>
                    ) : candidates.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No candidates have applied yet.</div>
                    ) : (
                        candidates.map((c, i) => (
                            <div className="glass-card" key={c._id || i} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ width: '36px', textAlign: 'center', fontWeight: 900, fontSize: 'var(--fs-xl)', color: 'var(--grey-500)' }}>#{i + 1}</div>
                                <div className="avatar-lg">{c.name?.[0] || '?'}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700 }}>{c.name}</div>
                                    <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{c.jobTitle} · {c.email}</div>
                                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>Applied {new Date(c.createdAt).toLocaleDateString()}</div>
                                </div>
                                <div style={{ textAlign: 'center' }}><div style={{ fontWeight: 800, fontSize: 'var(--fs-xl)' }}>{c.aiScore || '-'}%</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>AI Score</div></div>
                                <span className={`badge ${c.status === 'Shortlisted' ? 'badge-primary' : c.status === 'Rejected' ? 'badge-danger' : 'badge-outline'}`}>{c.status}</span>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        className="btn btn-outline btn-sm"
                                        onClick={() => handleViewResume(c._id, c.name)}
                                    >
                                        <HiOutlineDocumentText /> View Resume
                                    </button>
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleMessageCandidate(c.candidateId?._id || c.candidateId, c.jobTitle)}
                                        disabled={messaging[c.candidateId?._id || c.candidateId]}
                                    >
                                        <HiOutlineChatAlt2 /> {messaging[c.candidateId?._id || c.candidateId] ? '...' : 'Message'}
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CandidateRanking;
