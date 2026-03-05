import React, { useState } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { seekerLinks } from '../Components/SidebarLinks';

const history = [
    { job: 'React Developer at TechCorp', date: 'Mar 2, 2026', status: 'Applied' },
    { job: 'Frontend Engineer at AppNova', date: 'Mar 2, 2026', status: 'Applied' },
    { job: 'UI Developer at DesignHub', date: 'Mar 1, 2026', status: 'Applied' },
];

const AutoApplySettings = () => {
    const [enabled, setEnabled] = useState(true);

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header"><h1>Auto-Apply Settings</h1><p>Configure automatic job applications</p></div>

                <div className="glass-card" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div><div style={{ fontWeight: 700, fontSize: 'var(--fs-lg)' }}>Auto-Apply</div><div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>Automatically apply to matching jobs</div></div>
                    <div className={`toggle ${enabled ? 'active' : ''}`} onClick={() => setEnabled(!enabled)}></div>
                </div>

                <div className="grid-2" style={{ marginBottom: '24px' }}>
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Job Criteria</h3>
                        <div className="auth-form">
                            <div className="input-group"><label>Job Titles</label><input className="input-field" defaultValue="React Developer, Frontend Engineer, UI Developer" /></div>
                            <div className="input-group"><label>Locations</label><input className="input-field" defaultValue="Remote, San Francisco, New York" /></div>
                            <div className="input-group"><label>Job Type</label><select className="select-field"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Remote</option></select></div>
                            <div className="input-group"><label>Experience Level</label><select className="select-field"><option>Mid Level</option><option>Senior</option><option>Entry Level</option></select></div>
                            <div className="input-group">
                                <label>Salary Range</label>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <input className="input-field" placeholder="Min ($)" defaultValue="80000" />
                                    <input className="input-field" placeholder="Max ($)" defaultValue="160000" />
                                </div>
                            </div>
                            <div className="input-group"><label>Daily Apply Limit</label><input className="input-field" type="number" defaultValue="10" /></div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div className="glass-card">
                            <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Resume & Cover Letter</h3>
                            <div className="input-group" style={{ marginBottom: '16px' }}>
                                <label>Select Resume</label>
                                <select className="select-field"><option>Main_Resume_2026.pdf</option><option>Technical_Resume.pdf</option></select>
                            </div>
                            <div className="input-group">
                                <label>Default Cover Letter</label>
                                <textarea className="textarea-field" rows={6} defaultValue={`Dear Hiring Manager,\n\nI am writing to express my interest in the {job_title} position at {company_name}. With my experience in frontend development...\n\nBest regards,\nJohn Doe`}></textarea>
                            </div>
                            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: '8px' }}>Variables: {'{job_title}'}, {'{company_name}'}</p>
                        </div>

                        <div className="glass-card">
                            <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Excluded Companies</h3>
                            <input className="input-field" placeholder="Add company to exclude..." style={{ marginBottom: '12px' }} />
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {['CompanyA', 'CompanyB'].map((c, i) => <span className="chip" key={i}>{c} ✕</span>)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Auto-Apply History</h3>
                    <table className="data-table">
                        <thead><tr><th>Job</th><th>Date</th><th>Status</th></tr></thead>
                        <tbody>
                            {history.map((h, i) => <tr key={i}><td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{h.job}</td><td>{h.date}</td><td><span className="badge badge-outline">{h.status}</span></td></tr>)}
                        </tbody>
                    </table>
                </div>

                <button className="btn btn-primary btn-lg" style={{ marginTop: '24px' }}>Save Settings</button>
            </div>
        </DashboardLayout>
    );
};

export default AutoApplySettings;

