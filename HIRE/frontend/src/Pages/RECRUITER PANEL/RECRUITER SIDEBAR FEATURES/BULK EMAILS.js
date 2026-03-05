import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlineMail, HiOutlinePaperAirplane } from 'react-icons/hi';

const templates = [
    { name: 'Interview Invitation', subject: 'Interview Invitation – {job_title} at {company}' },
    { name: 'Application Received', subject: 'Your Application for {job_title}' },
    { name: 'Rejection Notice', subject: 'Update on Your Application' },
    { name: 'Offer Letter', subject: 'Exciting Offer from {company}' },
];

const sent = [
    { to: '15 candidates', subject: 'Interview Invitation – React Developer', date: 'Mar 3', status: 'Delivered' },
    { to: '28 candidates', subject: 'Application Received', date: 'Mar 1', status: 'Delivered' },
    { to: '5 candidates', subject: 'Rejection Notice', date: 'Feb 28', status: 'Delivered' },
];

const BulkEmails = () => {
    const [selectedTemplate, setSelectedTemplate] = useState(0);

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header"><h1>Bulk Emails</h1><p>Send emails to multiple candidates at once</p></div>

                <div className="grid-2" style={{ marginBottom: '24px' }}>
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Compose Email</h3>
                        <div className="auth-form">
                            <div className="input-group"><label>Template</label>
                                <select className="select-field" value={selectedTemplate} onChange={e => setSelectedTemplate(+e.target.value)}>
                                    {templates.map((t, i) => <option key={i} value={i}>{t.name}</option>)}
                                </select>
                            </div>
                            <div className="input-group"><label>Recipients</label><select className="select-field"><option>All Applicants (324)</option><option>Shortlisted (45)</option><option>New (120)</option><option>Custom Selection</option></select></div>
                            <div className="input-group"><label>Subject</label><input className="input-field" defaultValue={templates[selectedTemplate].subject} /></div>
                            <div className="input-group"><label>Message Body</label><textarea className="textarea-field" rows={8} defaultValue={`Dear {candidate_name},\n\nThank you for your interest in the {job_title} position at {company}.\n\nWe would like to invite you for an interview at your earliest convenience.\n\nBest regards,\nSarah Chen\nHR Team`} /></div>
                            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Variables: {'{candidate_name}'}, {'{job_title}'}, {'{company}'}</p>
                            <div style={{ display: 'flex', gap: '12px' }}><button className="btn btn-primary"><HiOutlinePaperAirplane /> Send</button><button className="btn btn-secondary">Preview</button></div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div className="glass-card">
                            <h3 style={{ fontWeight: 700, marginBottom: '20px' }}><HiOutlineMail style={{ marginRight: '8px' }} />Email Templates</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {templates.map((t, i) => (
                                    <div key={i} style={{ padding: '12px', background: selectedTemplate === i ? 'var(--bg-glass-hover)' : 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer' }} onClick={() => setSelectedTemplate(i)}>
                                        <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{t.name}</div>
                                        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{t.subject}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card">
                            <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Recent Sends</h3>
                            {sent.map((s, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < sent.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                                    <div><div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>{s.subject}</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{s.to} · {s.date}</div></div>
                                    <span className="badge badge-outline">{s.status}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default BulkEmails;

