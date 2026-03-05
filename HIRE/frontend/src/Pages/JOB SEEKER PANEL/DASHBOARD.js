import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../Components/DashboardLayout';
import { HiOutlineHome, HiOutlineBriefcase, HiOutlineDocumentText, HiOutlineStar, HiOutlineBell, HiOutlineCalendar, HiOutlineChatAlt2, HiOutlineCog, HiOutlineLightningBolt, HiOutlineAdjustments, HiOutlineUser, HiOutlineChevronRight, HiOutlineTrendingUp, HiOutlineEye, HiOutlineBookmark, HiOutlineClock, HiOutlineLocationMarker } from 'react-icons/hi';
import { getMyApplications, getJobs, getJobAlerts } from '../../api';

const sidebarLinks = [
    { path: '/seeker/dashboard', label: 'Dashboard', icon: <HiOutlineHome /> },
    { section: 'Jobs' },
    { path: '/seeker/browse-jobs', label: 'Browse Jobs', icon: <HiOutlineBriefcase /> },
    { path: '/seeker/my-applications', label: 'My Applications', icon: <HiOutlineDocumentText /> },
    { path: '/seeker/recommended-jobs', label: 'Recommended', icon: <HiOutlineStar /> },
    { path: '/seeker/job-alerts', label: 'Job Alerts', icon: <HiOutlineBell /> },
    { path: '/seeker/saved-jobs', label: 'Saved Jobs', icon: <HiOutlineBookmark /> },
    { section: 'Schedule' },
    { path: '/seeker/interviews', label: 'Interviews', icon: <HiOutlineCalendar /> },
    { path: '/seeker/messages', label: 'Messages', icon: <HiOutlineChatAlt2 /> },
    { section: 'AI Tools' },
    { path: '/seeker/ai-skill-analysis', label: 'Skill Analysis', icon: <HiOutlineLightningBolt /> },
    { path: '/seeker/auto-apply', label: 'Auto Apply', icon: <HiOutlineAdjustments /> },
    { section: 'Profile' },
    { path: '/seeker/profile/personal', label: 'My Profile', icon: <HiOutlineUser /> },
    { path: '/seeker/settings', label: 'Settings', icon: <HiOutlineCog /> },
];

const SeekerDashboard = () => {
    const [recentApps, setRecentApps] = useState([]);
    const [recommendedJobs, setRecommendedJobs] = useState([]);
    const [stats, setStats] = useState({ applications: 0, interviews: 0, alerts: 0 });
    const [loading, setLoading] = useState(true);
    const userRole = 'Job Seeker';

    // Get user from local storage
    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Guest' };

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                // Fetch applications
                const appsRes = await getMyApplications();
                const apps = appsRes.data;
                setRecentApps(apps.slice(0, 4));

                const interviewsCount = apps.filter(a => a.status === 'Interview' || a.status === 'Shortlisted').length;

                // Fetch job alerts
                let alertsCount = 0;
                try {
                    const alertRes = await getJobAlerts();
                    alertsCount = alertRes.data.length;
                } catch (e) { }

                setStats({
                    applications: apps.length,
                    interviews: interviewsCount,
                    alerts: alertsCount
                });

                // Fetch jobs (as recommended)
                const jobsRes = await getJobs();
                const jobs = jobsRes.data;
                // Randomly pick a few jobs for recommended list
                setRecommendedJobs(jobs.sort(() => 0.5 - Math.random()).slice(0, 3));
            } catch (err) {
                console.error("Dashboard data error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <DashboardLayout sidebarLinks={sidebarLinks} sectionTitle="Job Seeker" userName={user.name} userRole={userRole}>
            <div className="page-wrapper">
                {/* Welcome */}
                <div className="glass-card" style={{ marginBottom: '24px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '100%', background: 'radial-gradient(circle at right, rgba(255,255,255,0.03), transparent)', pointerEvents: 'none' }} />
                    <h1 style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800, marginBottom: '8px' }}>Welcome back, {user.name.split(' ')[0]} 👋</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Here's what's happening with your job search today.</p>
                </div>

                {/* Stats */}
                <div className="grid-3" style={{ marginBottom: '24px' }}>
                    {[
                        { icon: <HiOutlineDocumentText />, label: 'Applications', value: stats.applications, change: 'Total applied' },
                        { icon: <HiOutlineCalendar />, label: 'Interviews/Shortlisted', value: stats.interviews, change: 'Active momentum' },
                        { icon: <HiOutlineBell />, label: 'Active Alerts', value: stats.alerts, change: 'Job Alert Subscriptions' },
                    ].map((s, i) => (
                        <div className="stat-card" key={i}>
                            <div className="stat-icon">{s.icon}</div>
                            <div className="stat-value">{s.value}</div>
                            <div className="stat-label">{s.label}</div>
                            <div className="stat-change">{s.change}</div>
                        </div>
                    ))}
                </div>

                <div className="grid-2" style={{ marginBottom: '24px' }}>
                    {/* Recent Applications */}
                    <div className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h3 style={{ fontWeight: 700 }}>Recent Applications</h3>
                            <Link to="/seeker/my-applications" className="btn btn-ghost btn-sm">View All <HiOutlineChevronRight /></Link>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {loading ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
                            ) : recentApps.length === 0 ? (
                                <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>No recent applications found.</div>
                            ) : (
                                recentApps.map((a, i) => (
                                    <div key={a._id || i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{a.jobId?.title || 'Unknown Job'}</div>
                                            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{a.jobId?.company || 'Company'} · {new Date(a.createdAt || Date.now()).toLocaleDateString()}</div>
                                        </div>
                                        <span className={`badge ${a.status === 'Shortlisted' ? 'badge-primary' : a.status === 'Rejected' ? 'badge-danger' : 'badge-outline'}`}>{a.status}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Profile Completion & Quick Actions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div className="glass-card">
                            <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Profile Completion</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
                                <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '3px solid var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--fs-lg)', fontWeight: 800 }}>72%</div>
                                <div><div style={{ fontSize: 'var(--fs-sm)' }}>Almost there!</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Complete your profile to get better matches</div></div>
                            </div>
                            <div className="progress-bar"><div className="progress-fill" style={{ width: '72%' }}></div></div>
                            <Link to="/seeker/profile/personal" className="btn btn-primary btn-sm" style={{ marginTop: '16px', width: '100%' }}>Complete Profile</Link>
                        </div>
                        <div className="glass-card">
                            <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Quick Actions</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <Link to="/seeker/browse-jobs" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}><HiOutlineBriefcase /> Browse Jobs</Link>
                                <Link to="/seeker/messages" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}><HiOutlineChatAlt2 /> View Messages</Link>
                                <Link to="/seeker/ai-skill-analysis" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}><HiOutlineLightningBolt /> AI Skill Analysis</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recommended Jobs */}
                <div className="glass-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                        <h3 style={{ fontWeight: 700 }}>Recommended for You</h3>
                        <Link to="/seeker/recommended-jobs" className="btn btn-ghost btn-sm">View All <HiOutlineChevronRight /></Link>
                    </div>
                    <div className="grid-3">
                        {loading ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', gridColumn: 'span 3' }}>Loading recommendations...</div>
                        ) : recommendedJobs.length === 0 ? (
                            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', gridColumn: 'span 3' }}>No jobs available.</div>
                        ) : (
                            recommendedJobs.map((j, i) => (
                                <div key={j._id || i} style={{ padding: '20px', background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', transition: 'all var(--ease)', cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                        <span className="badge badge-light">Recommended</span>
                                        <span style={{ fontWeight: 700, fontSize: 'var(--fs-sm)' }}>{j.salary || 'Negotiable'}</span>
                                    </div>
                                    <div style={{ fontWeight: 700, marginBottom: '4px' }}>{j.title}</div>
                                    <div style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-sm)', marginBottom: '12px' }}>{j.company?.name || j.recruiterId?.company || 'Company'}</div>
                                    <Link to="/seeker/browse-jobs" className="btn btn-primary btn-sm" style={{ width: '100%' }}>View Job</Link>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default SeekerDashboard;

