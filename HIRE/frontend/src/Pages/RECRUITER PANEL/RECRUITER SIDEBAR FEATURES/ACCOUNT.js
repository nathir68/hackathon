import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlineShieldCheck, HiOutlineBell, HiOutlineTrash } from 'react-icons/hi';

const RecruiterAccount = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header"><h1>Account Settings</h1><p>Manage your account</p></div>
                <div className="tabs" style={{ marginBottom: '24px' }}>
                    {['profile', 'security', 'notifications'].map(t => <button key={t} className={`tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)} style={{ textTransform: 'capitalize' }}>{t}</button>)}
                </div>
                {activeTab === 'profile' && (
                    <div className="glass-card">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}><div className="avatar-xl">SC</div><div><button className="btn btn-secondary btn-sm">Change Photo</button></div></div>
                        <div className="grid-2" style={{ gap: '16px' }}>
                            <div className="input-group"><label>First Name</label><input className="input-field" defaultValue="Sarah" /></div>
                            <div className="input-group"><label>Last Name</label><input className="input-field" defaultValue="Chen" /></div>
                            <div className="input-group"><label>Email</label><input className="input-field" defaultValue="sarah@techcorp.com" readOnly style={{ opacity: 0.6 }} /></div>
                            <div className="input-group"><label>Phone</label><input className="input-field" defaultValue="+1 555-0456" /></div>
                            <div className="input-group"><label>Job Title</label><input className="input-field" defaultValue="HR Director" /></div>
                            <div className="input-group"><label>Department</label><input className="input-field" defaultValue="Human Resources" /></div>
                        </div>
                        <button className="btn btn-primary" style={{ marginTop: '20px' }}>Save Changes</button>
                    </div>
                )}
                {activeTab === 'security' && (
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}><HiOutlineShieldCheck style={{ marginRight: '8px' }} />Security</h3>
                        <div className="auth-form">
                            <div className="input-group"><label>Current Password</label><input className="input-field" type="password" /></div>
                            <div className="input-group"><label>New Password</label><input className="input-field" type="password" /></div>
                            <div className="input-group"><label>Confirm</label><input className="input-field" type="password" /></div>
                            <button className="btn btn-primary">Update Password</button>
                        </div>
                        <div style={{ marginTop: '24px', padding: '16px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div><div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>Two-Factor Authentication</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Add an extra layer of security</div></div>
                            <div className="toggle active"></div>
                        </div>
                    </div>
                )}
                {activeTab === 'notifications' && (
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}><HiOutlineBell style={{ marginRight: '8px' }} />Notifications</h3>
                        {[['New Applications', 'Get notified for new applications'], ['Interview Reminders', 'Reminders for scheduled interviews'], ['Messages', 'Notifications for new messages'], ['Weekly Reports', 'Receive weekly hiring reports']].map(([t, d], i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: i < 3 ? '1px solid var(--border-color)' : 'none' }}>
                                <div><div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{t}</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{d}</div></div>
                                <div className={`toggle ${i < 3 ? 'active' : ''}`}></div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default RecruiterAccount;

