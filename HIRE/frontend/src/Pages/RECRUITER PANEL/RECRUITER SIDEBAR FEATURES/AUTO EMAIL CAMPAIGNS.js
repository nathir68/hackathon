import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlineMail, HiOutlinePencil, HiOutlinePause, HiOutlinePlay, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';

const campaigns = [
    { name: 'Application Received', trigger: 'On Application Submit', delay: 'Instant', template: 'Application Confirmation', sent: 324, openRate: 89, status: 'Active' },
    { name: 'Shortlist Notification', trigger: 'On Shortlisted', delay: 'Instant', template: 'Shortlist Email', sent: 45, openRate: 95, status: 'Active' },
    { name: 'Interview Scheduled', trigger: 'On Interview Created', delay: 'Instant', template: 'Interview Invite', sent: 38, openRate: 97, status: 'Active' },
    { name: 'Interview Reminder', trigger: 'Before Interview', delay: '24 hours before', template: 'Interview Reminder', sent: 36, openRate: 92, status: 'Active' },
    { name: 'Rejection Notice', trigger: 'On Rejection', delay: '2 hours after', template: 'Rejection Email', sent: 156, openRate: 72, status: 'Active' },
    { name: 'Offer Letter', trigger: 'On Offer Made', delay: 'Instant', template: 'Offer Letter', sent: 12, openRate: 100, status: 'Active' },
    { name: 'Follow-up Reminder', trigger: 'No Response', delay: '3 days after', template: 'Follow-up', sent: 28, openRate: 65, status: 'Paused' },
    { name: 'Onboarding Welcome', trigger: 'On Offer Accepted', delay: '1 hour after', template: 'Welcome Aboard', sent: 8, openRate: 100, status: 'Active' },
];

const recentEmails = [
    { to: 'alice.johnson@email.com', subject: 'Interview Scheduled – React Developer', trigger: 'Interview Created', time: '2 min ago', status: 'Delivered' },
    { to: 'bob.williams@email.com', subject: 'Application Received – Backend Engineer', trigger: 'Application Submit', time: '15 min ago', status: 'Delivered' },
    { to: 'carol.smith@email.com', subject: 'You\'ve been Shortlisted!', trigger: 'Shortlisted', time: '1 hr ago', status: 'Delivered' },
    { to: 'david.brown@email.com', subject: 'Interview Reminder – Tomorrow 10 AM', trigger: 'Before Interview', time: '2 hrs ago', status: 'Delivered' },
    { to: 'emma.davis@email.com', subject: 'Update on Your Application', trigger: 'Rejection', time: '3 hrs ago', status: 'Opened' },
];

const AutoEmailCampaigns = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [tab, setTab] = useState(0);

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div><h1>Auto Email Campaigns</h1><p>Zero-touch automated email workflows triggered by candidate actions</p></div>
                    <button className="btn btn-primary" onClick={() => setShowCreate(!showCreate)}><HiOutlinePlus /> New Campaign</button>
                </div>

                {/* Stats */}
                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[
                        { l: 'Emails Sent Today', v: '47' },
                        { l: 'Open Rate', v: '89%' },
                        { l: 'Delivery Rate', v: '99.2%' },
                        { l: 'Active Campaigns', v: '7' },
                    ].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-value">{s.v}</div><div className="stat-label">{s.l}</div></div>
                    ))}
                </div>

                {/* Create Campaign */}
                {showCreate && (
                    <div className="glass-card" style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Create Automation Campaign</h3>
                        <div className="auth-form">
                            <div className="grid-2" style={{ gap: '16px' }}>
                                <div className="input-group"><label>Campaign Name</label><input className="input-field" placeholder="e.g. Post-Interview Follow-up" /></div>
                                <div className="input-group"><label>Trigger Event</label>
                                    <select className="select-field">
                                        <option>On Application Submit</option>
                                        <option>On Shortlisted</option>
                                        <option>On Interview Created</option>
                                        <option>Before Interview (24h)</option>
                                        <option>After Interview (1h)</option>
                                        <option>On Rejection</option>
                                        <option>On Offer Made</option>
                                        <option>On Offer Accepted</option>
                                        <option>No Response (3 days)</option>
                                        <option>No Response (7 days)</option>
                                    </select>
                                </div>
                                <div className="input-group"><label>Delay</label>
                                    <select className="select-field">
                                        <option>Instant</option>
                                        <option>30 minutes after</option>
                                        <option>1 hour after</option>
                                        <option>2 hours after</option>
                                        <option>6 hours after</option>
                                        <option>12 hours after</option>
                                        <option>24 hours after</option>
                                        <option>3 days after</option>
                                        <option>7 days after</option>
                                    </select>
                                </div>
                                <div className="input-group"><label>Email Template</label>
                                    <select className="select-field">
                                        <option>Application Confirmation</option>
                                        <option>Shortlist Email</option>
                                        <option>Interview Invite</option>
                                        <option>Interview Reminder</option>
                                        <option>Rejection Email</option>
                                        <option>Offer Letter</option>
                                        <option>Follow-up</option>
                                        <option>Welcome Aboard</option>
                                        <option>Custom Template</option>
                                    </select>
                                </div>
                            </div>
                            <div className="input-group" style={{ marginTop: '16px' }}><label>Subject Line</label>
                                <input className="input-field" placeholder="e.g. Thank you for applying to {job_title}" />
                            </div>
                            <div className="input-group" style={{ marginTop: '16px' }}><label>Email Body</label>
                                <textarea className="textarea-field" rows={6} defaultValue={`Dear {candidate_name},\n\nThank you for your interest in the {job_title} position at {company}.\n\nWe have received your application and our team is currently reviewing it. You will hear back from us within 3-5 business days.\n\nBest regards,\n{recruiter_name}\n{company}`} />
                            </div>
                            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: '8px' }}>Variables: {'{candidate_name}'}, {'{job_title}'}, {'{company}'}, {'{recruiter_name}'}, {'{interview_date}'}, {'{interview_time}'}</p>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                                <button className="btn btn-primary" onClick={() => setShowCreate(false)}><HiOutlineMail /> Create Campaign</button>
                                <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="tabs" style={{ marginBottom: '24px' }}>
                    {['Automation Rules', 'Recent Emails'].map((t, i) => (
                        <button key={i} className={`tab ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>{t}</button>
                    ))}
                </div>

                {/* Tab: Automation Rules */}
                {tab === 0 && (
                    <div>
                        {/* Visual Pipeline */}
                        <div className="glass-card" style={{ marginBottom: '24px' }}>
                            <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Automation Pipeline</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                                {['Apply', 'Review', 'Shortlist', 'Interview', 'Evaluate', 'Offer', 'Onboard'].map((stage, i) => (
                                    <React.Fragment key={i}>
                                        <div style={{
                                            padding: '12px 20px', background: 'var(--bg-glass)', border: '1px solid var(--border-color)',
                                            borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: 'var(--fs-sm)', whiteSpace: 'nowrap',
                                            textAlign: 'center', minWidth: '100px'
                                        }}>
                                            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginBottom: '4px' }}>Stage {i + 1}</div>
                                            {stage}
                                            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>
                                                <HiOutlineMail style={{ verticalAlign: 'middle' }} /> Auto
                                            </div>
                                        </div>
                                        {i < 6 && <span style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-lg)' }}>→</span>}
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                            <table className="data-table">
                                <thead><tr><th>Campaign</th><th>Trigger</th><th>Delay</th><th>Template</th><th>Sent</th><th>Open Rate</th><th>Status</th><th>Actions</th></tr></thead>
                                <tbody>
                                    {campaigns.map((c, i) => (
                                        <tr key={i}>
                                            <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</td>
                                            <td><span className="badge badge-outline">{c.trigger}</span></td>
                                            <td>{c.delay}</td>
                                            <td>{c.template}</td>
                                            <td style={{ fontWeight: 600 }}>{c.sent}</td>
                                            <td style={{ fontWeight: 700 }}>{c.openRate}%</td>
                                            <td>
                                                <span className={`badge ${c.status === 'Active' ? 'badge-light' : 'badge-warning'}`}>
                                                    {c.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '4px' }}>
                                                    <button className="btn-icon">{c.status === 'Active' ? <HiOutlinePause /> : <HiOutlinePlay />}</button>
                                                    <button className="btn-icon"><HiOutlinePencil /></button>
                                                    <button className="btn-icon"><HiOutlineTrash /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Tab: Recent Emails */}
                {tab === 1 && (
                    <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table className="data-table">
                            <thead><tr><th>Recipient</th><th>Subject</th><th>Trigger</th><th>Time</th><th>Status</th></tr></thead>
                            <tbody>
                                {recentEmails.map((e, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{e.to}</td>
                                        <td>{e.subject}</td>
                                        <td><span className="badge badge-outline">{e.trigger}</span></td>
                                        <td>{e.time}</td>
                                        <td><span className={`badge ${e.status === 'Opened' ? 'badge-light' : 'badge-outline'}`}>{e.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AutoEmailCampaigns;

