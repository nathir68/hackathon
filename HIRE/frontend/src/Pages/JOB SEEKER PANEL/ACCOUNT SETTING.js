import React, { useState } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { seekerLinks } from '../Components/SidebarLinks';
import { HiOutlineBell, HiOutlineShieldCheck, HiOutlineEye, HiOutlineTrash } from 'react-icons/hi';

const AccountSetting = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const tabs = ['profile', 'security', 'notifications', 'privacy'];

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header"><h1>Account Settings</h1><p>Manage your account preferences</p></div>
                <div className="tabs" style={{ marginBottom: '24px' }}>
                    {tabs.map(t => <button key={t} className={`tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)} style={{ textTransform: 'capitalize' }}>{t}</button>)}
                </div>

                {activeTab === 'profile' && (
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Profile Information</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                            <div className="avatar-xl">JD</div>
                            <div><button className="btn btn-secondary btn-sm">Upload Photo</button><p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>JPG, PNG. Max 2MB</p></div>
                        </div>
                        <div className="grid-2" style={{ gap: '16px' }}>
                            <div className="input-group"><label>First Name</label><input className="input-field" defaultValue="John" /></div>
                            <div className="input-group"><label>Last Name</label><input className="input-field" defaultValue="Doe" /></div>
                            <div className="input-group"><label>Email</label><input className="input-field" defaultValue="john@example.com" readOnly style={{ opacity: 0.6 }} /></div>
                            <div className="input-group"><label>Phone</label><input className="input-field" defaultValue="+1 555-0123" /></div>
                        </div>
                        <button className="btn btn-primary" style={{ marginTop: '20px' }}>Save Changes</button>
                    </div>
                )}

                {activeTab === 'security' && (
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}><HiOutlineShieldCheck style={{ marginRight: '8px' }} />Security</h3>
                        <div className="auth-form">
                            <div className="input-group"><label>Current Password</label><input className="input-field" type="password" placeholder="Enter current password" /></div>
                            <div className="input-group"><label>New Password</label><input className="input-field" type="password" placeholder="Enter new password" /></div>
                            <div className="input-group"><label>Confirm Password</label><input className="input-field" type="password" placeholder="Confirm new password" /></div>
                            <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>{[1, 2, 3, 4].map(i => <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', background: i <= 3 ? 'var(--white)' : 'var(--grey-800)' }}></div>)}</div>
                            <button className="btn btn-primary">Update Password</button>
                        </div>
                        <div style={{ marginTop: '24px', padding: '16px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div><div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>Two-Factor Authentication</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Add an extra layer of security</div></div>
                            <div className="toggle"></div>
                        </div>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}><HiOutlineBell style={{ marginRight: '8px' }} />Notification Preferences</h3>
                        {[['Job Alerts', 'Get notified about new matching jobs'], ['Application Updates', 'Receive updates on your applications'], ['Interview Reminders', 'Get reminded about upcoming interviews'], ['Messages', 'Notifications for new messages'], ['Newsletter', 'Weekly career tips and insights']].map(([title, desc], i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: i < 4 ? '1px solid var(--border-color)' : 'none' }}>
                                <div><div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{title}</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{desc}</div></div>
                                <div className={`toggle ${i < 3 ? 'active' : ''}`}></div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'privacy' && (
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}><HiOutlineEye style={{ marginRight: '8px' }} />Privacy Settings</h3>
                        {[['Profile Visibility', 'Make your profile visible to recruiters'], ['Resume Visibility', 'Allow companies to view your resume'], ['Show Activity Status', 'Show when you are online']].map(([title, desc], i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--border-color)' }}>
                                <div><div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{title}</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{desc}</div></div>
                                <div className={`toggle ${i < 2 ? 'active' : ''}`}></div>
                            </div>
                        ))}
                        <div style={{ marginTop: '32px', padding: '20px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.02)' }}>
                            <h4 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}><HiOutlineTrash /> Delete Account</h4>
                            <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', marginBottom: '12px' }}>This action is permanent and cannot be undone.</p>
                            <button className="btn btn-danger btn-sm">Delete My Account</button>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AccountSetting;

