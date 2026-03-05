import React, { useState } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';

const SystemSettings = () => {
    const [tab, setTab] = useState('auth');

    return (
        <DashboardLayout sidebarLinks={adminLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Admin"}').name)} userRole="Administrator">
            <div className="page-wrapper">
                <div className="page-header"><h1>System Settings</h1><p>Configure platform-wide settings</p></div>
                <div className="tabs" style={{ marginBottom: '24px' }}>{['auth', 'email', 'roles', 'general'].map(t => <button key={t} className={`tab ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)} style={{ textTransform: 'capitalize' }}>{t}</button>)}</div>

                {tab === 'auth' && <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Authentication Settings</h3>
                    <div className="auth-form">
                        {[['Email Verification Required', true], ['OTP Verification', true], ['Allow Social Login', true], ['Allow Password Reset', true], ['Session Timeout (minutes)', null]].map(([l, v], i) => (
                            v !== null ? (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
                                    <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 500 }}>{l}</span>
                                    <div className={`toggle ${v ? 'active' : ''}`}></div>
                                </div>
                            ) : (
                                <div className="input-group" key={i}><label>{l}</label><input className="input-field" type="number" defaultValue="30" /></div>
                            )
                        ))}
                        <div className="input-group"><label>Max Login Attempts</label><input className="input-field" type="number" defaultValue="5" /></div>
                        <div className="input-group"><label>Password Min Length</label><input className="input-field" type="number" defaultValue="8" /></div>
                        <button className="btn btn-primary">Save</button>
                    </div>
                </div>}

                {tab === 'email' && <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Email Settings</h3>
                    <div className="auth-form">
                        <div className="grid-2" style={{ gap: '16px' }}>
                            <div className="input-group"><label>SMTP Host</label><input className="input-field" defaultValue="smtp.gmail.com" /></div>
                            <div className="input-group"><label>SMTP Port</label><input className="input-field" defaultValue="587" /></div>
                            <div className="input-group"><label>Username</label><input className="input-field" defaultValue="noreply@hire.com" /></div>
                            <div className="input-group"><label>Password</label><input className="input-field" type="password" defaultValue="••••••••" /></div>
                        </div>
                        <div className="input-group"><label>From Name</label><input className="input-field" defaultValue="HIRE Platform" /></div>
                        <button className="btn btn-primary">Save</button>
                    </div>
                </div>}

                {tab === 'roles' && <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Role Permissions</h3>
                    <table className="data-table">
                        <thead><tr><th>Permission</th><th>Admin</th><th>Recruiter</th><th>Seeker</th></tr></thead>
                        <tbody>
                            {[['Manage Users', '✓', '—', '—'], ['Post Jobs', '✓', '✓', '—'], ['Apply Jobs', '✓', '—', '✓'], ['View Analytics', '✓', '✓', '—'], ['AI Screening', '✓', '✓', '—'], ['System Settings', '✓', '—', '—']].map((r, i) => (
                                <tr key={i}><td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>}

                {tab === 'general' && <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>General Settings</h3>
                    <div className="auth-form">
                        <div className="input-group"><label>Platform Name</label><input className="input-field" defaultValue="HIRE" /></div>
                        <div className="input-group"><label>Platform URL</label><input className="input-field" defaultValue="https://hire.com" /></div>
                        <div className="input-group"><label>Support Email</label><input className="input-field" defaultValue="support@hire.com" /></div>
                        <div className="input-group"><label>Max File Upload (MB)</label><input className="input-field" type="number" defaultValue="10" /></div>
                        {[['Maintenance Mode', false], ['Enable Registration', true]].map(([l, v], i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
                                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 500 }}>{l}</span>
                                <div className={`toggle ${v ? 'active' : ''}`}></div>
                            </div>
                        ))}
                        <button className="btn btn-primary">Save</button>
                    </div>
                </div>}
            </div>
        </DashboardLayout>
    );
};

export default SystemSettings;

