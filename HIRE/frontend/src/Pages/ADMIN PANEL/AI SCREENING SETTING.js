import React from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';

const AdminAIScreening = () => (
    <DashboardLayout sidebarLinks={adminLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Admin"}').name)} userRole="Administrator">
        <div className="page-wrapper">
            <div className="page-header"><h1>AI Screening Settings</h1><p>Configure AI-powered screening parameters</p></div>

            <div className="grid-2" style={{ marginBottom: '24px' }}>
                <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Screening Parameters</h3>
                    <div className="auth-form">
                        <div className="input-group"><label>Minimum ATS Score (%)</label><input className="input-field" type="number" defaultValue="60" /></div>
                        <div className="input-group"><label>Minimum Skill Match (%)</label><input className="input-field" type="number" defaultValue="50" /></div>
                        <div className="input-group"><label>Auto-Reject Threshold (%)</label><input className="input-field" type="number" defaultValue="30" /></div>
                        <div className="input-group"><label>Auto-Shortlist Threshold (%)</label><input className="input-field" type="number" defaultValue="85" /></div>
                    </div>
                </div>
                <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Feature Toggles</h3>
                    {[['Resume Parsing', 'Extract skills and experience from resumes', true], ['Duplicate Detection', 'Detect duplicate or plagiarized resumes', true], ['Bias Detection', 'Flag potentially biased job descriptions', true], ['Auto-Ranking', 'Automatically rank candidates by match score', false], ['Skill Verification', 'Verify claimed skills through tests', false]].map(([t, d, on], i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < 4 ? '1px solid var(--border-color)' : 'none' }}>
                            <div><div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{t}</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{d}</div></div>
                            <div className={`toggle ${on ? 'active' : ''}`}></div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="glass-card">
                <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>AI Model Settings</h3>
                <div className="grid-2" style={{ gap: '16px' }}>
                    <div className="input-group"><label>AI Model</label><select className="select-field"><option>GPT-4</option><option>GPT-3.5</option><option>Custom Model</option></select></div>
                    <div className="input-group"><label>API Provider</label><select className="select-field"><option>OpenAI</option><option>Anthropic</option><option>Custom</option></select></div>
                    <div className="input-group"><label>API Key</label><input className="input-field" type="password" defaultValue="sk-••••••••••••••••" /></div>
                    <div className="input-group"><label>Rate Limit (req/min)</label><input className="input-field" type="number" defaultValue="60" /></div>
                </div>
                <button className="btn btn-primary" style={{ marginTop: '20px' }}>Save Settings</button>
            </div>
        </div>
    </DashboardLayout>
);

export default AdminAIScreening;

