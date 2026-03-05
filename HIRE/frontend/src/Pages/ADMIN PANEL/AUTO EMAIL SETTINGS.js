import React, { useState } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';
import { HiOutlineMail, HiOutlineCheck, HiOutlineExclamation } from 'react-icons/hi';

const systemRules = [];

const deliveryLog = [];

const AutoEmailSettings = () => {
    const [toggles, setToggles] = useState(systemRules.map(r => r.active));

    const handleToggle = (idx) => {
        setToggles(prev => prev.map((v, i) => i === idx ? !v : v));
    };

    return (
        <DashboardLayout sidebarLinks={adminLinks} userName={(JSON.parse(localStorage.getItem("hire_user") || '{"name":"Admin"}').name)} userRole="Administrator">
            <div className="page-wrapper">
                <div className="page-header"><h1>Auto Email Settings</h1><p>Platform-wide automated email configuration and monitoring</p></div>

                {/* Stats */}
                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[
                        { l: 'Emails Today', v: '1,247' },
                        { l: 'Delivery Rate', v: '99.1%' },
                        { l: 'Bounce Rate', v: '0.8%' },
                        { l: 'Active Rules', v: '6' },
                    ].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-value">{s.v}</div><div className="stat-label">{s.l}</div></div>
                    ))}
                </div>

                <div className="grid-2" style={{ marginBottom: '24px' }}>
                    {/* SMTP Config */}
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>
                            <HiOutlineMail style={{ marginRight: '8px', verticalAlign: 'middle' }} />SMTP / API Configuration
                        </h3>
                        <div className="auth-form">
                            <div className="input-group"><label>Email Provider</label>
                                <select className="select-field"><option>SMTP (Custom)</option><option>SendGrid</option><option>Mailgun</option><option>Amazon SES</option><option>Postmark</option></select>
                            </div>
                            <div className="input-group"><label>SMTP Host</label><input className="input-field" defaultValue="smtp.hire-platform.com" /></div>
                            <div className="grid-2" style={{ gap: '12px' }}>
                                <div className="input-group"><label>SMTP Port</label><input className="input-field" type="number" defaultValue="587" /></div>
                                <div className="input-group"><label>Encryption</label>
                                    <select className="select-field"><option>TLS</option><option>SSL</option><option>None</option></select>
                                </div>
                            </div>
                            <div className="input-group"><label>Username</label><input className="input-field" defaultValue="noreply@hire-platform.com" /></div>
                            <div className="input-group"><label>Password / API Key</label><input className="input-field" type="password" defaultValue="••••••••••••••••" /></div>
                            <button className="btn btn-secondary btn-sm" style={{ marginTop: '8px' }}><HiOutlineCheck /> Test Connection</button>
                        </div>
                    </div>

                    {/* Sender & Limits */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div className="glass-card">
                            <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Sender Identity</h3>
                            <div className="auth-form">
                                <div className="input-group"><label>From Name</label><input className="input-field" defaultValue="HIRE Platform" /></div>
                                <div className="input-group"><label>From Email</label><input className="input-field" defaultValue="noreply@hire-platform.com" /></div>
                                <div className="input-group"><label>Reply-To Email</label><input className="input-field" defaultValue="support@hire-platform.com" /></div>
                            </div>
                        </div>

                        <div className="glass-card">
                            <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Rate Limiting & Retries</h3>
                            <div className="auth-form">
                                <div className="grid-2" style={{ gap: '12px' }}>
                                    <div className="input-group"><label>Max Emails / Hour</label><input className="input-field" type="number" defaultValue="500" /></div>
                                    <div className="input-group"><label>Max Emails / Day</label><input className="input-field" type="number" defaultValue="10000" /></div>
                                    <div className="input-group"><label>Max Retries</label><input className="input-field" type="number" defaultValue="3" /></div>
                                    <div className="input-group"><label>Retry Delay (min)</label><input className="input-field" type="number" defaultValue="15" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Automation Rules */}
                <div className="glass-card" style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>System Automation Rules</h3>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {systemRules.map((rule, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 0', borderBottom: i < systemRules.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{rule.name}</div>
                                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                                        Trigger: {rule.trigger} · Delay: {rule.delay} · Template: {rule.template}
                                    </div>
                                </div>
                                <div className={`toggle ${toggles[i] ? 'active' : ''}`} onClick={() => handleToggle(i)} style={{ cursor: 'pointer' }}></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Delivery Health */}
                <div className="glass-card" style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Email Delivery Health</h3>
                    <div className="grid-3" style={{ gap: '16px' }}>
                        {[
                            { label: 'Last 24 Hours', delivered: 1235, bounced: 10, failed: 2, icon: <HiOutlineCheck /> },
                            { label: 'Last 7 Days', delivered: 8420, bounced: 68, failed: 12, icon: <HiOutlineCheck /> },
                            { label: 'Last 30 Days', delivered: 34500, bounced: 280, failed: 45, icon: <HiOutlineExclamation /> },
                        ].map((period, i) => (
                            <div key={i} style={{ padding: '16px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                <div style={{ fontWeight: 700, fontSize: 'var(--fs-sm)', marginBottom: '12px' }}>{period.label}</div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--fs-xs)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Delivered</span><span style={{ fontWeight: 700 }}>{period.delivered.toLocaleString()}</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Bounced</span><span style={{ fontWeight: 600 }}>{period.bounced}</span></div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: 'var(--text-muted)' }}>Failed</span><span style={{ fontWeight: 600 }}>{period.failed}</span></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Delivery Log */}
                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
                        <h3 style={{ fontWeight: 700 }}>Recent Delivery Log</h3>
                    </div>
                    <table className="data-table">
                        <thead><tr><th>Recipient</th><th>Subject</th><th>Type</th><th>Time</th><th>Status</th></tr></thead>
                        <tbody>
                            {deliveryLog.map((e, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{e.to}</td>
                                    <td>{e.subject}</td>
                                    <td><span className="badge badge-outline">{e.type}</span></td>
                                    <td>{e.time}</td>
                                    <td><span className={`badge ${e.status === 'Delivered' ? 'badge-outline' : 'badge-warning'}`}>{e.status}</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Save Button */}
                <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
                    <button className="btn btn-primary">Save All Settings</button>
                    <button className="btn btn-secondary">Reset to Defaults</button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AutoEmailSettings;

