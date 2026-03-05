import React from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';

const CompanyProfile = () => (
    <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Recruiter">
        <div className="page-wrapper">
            <div className="page-header"><h1>Company Profile</h1><p>Manage your company's public profile</p></div>
            <div className="glass-card" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                    <div style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-lg)', background: 'var(--grey-800)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--fs-3xl)', fontWeight: 800, color: 'var(--grey-300)', flexShrink: 0 }}>TC</div>
                    <div>
                        <button className="btn btn-secondary btn-sm" style={{ marginBottom: '8px' }}>Upload Logo</button>
                        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>PNG, JPG. Min 200x200px. Max 2MB.</p>
                    </div>
                </div>
                <div className="grid-2" style={{ gap: '16px' }}>
                    <div className="input-group"><label>Company Name</label><input className="input-field" defaultValue="TechCorp" /></div>
                    <div className="input-group"><label>Industry</label><select className="select-field"><option>Technology</option><option>Finance</option><option>Healthcare</option></select></div>
                    <div className="input-group"><label>Company Size</label><select className="select-field"><option>51-200</option><option>201-500</option><option>500+</option></select></div>
                    <div className="input-group"><label>Founded</label><input className="input-field" defaultValue="2015" /></div>
                    <div className="input-group"><label>Website</label><input className="input-field" defaultValue="https://techcorp.com" /></div>
                    <div className="input-group"><label>Location</label><input className="input-field" defaultValue="San Francisco, CA" /></div>
                </div>
                <div className="input-group" style={{ marginTop: '16px' }}><label>Description</label><textarea className="textarea-field" rows={5} defaultValue="TechCorp is a leading technology company focused on building innovative solutions. We are passionate about creating products that make a difference and maintaining a culture of excellence." /></div>
                <div className="input-group" style={{ marginTop: '16px' }}><label>Company Culture & Benefits</label><textarea className="textarea-field" rows={4} defaultValue="• Competitive salary and equity\n• Unlimited PTO\n• Remote-first culture\n• Health, dental, and vision insurance\n• 401(k) matching\n• Annual learning budget" /></div>
                <div className="input-group" style={{ marginTop: '16px' }}><label>Social Links</label>
                    <div className="grid-2" style={{ gap: '12px' }}>
                        <input className="input-field" placeholder="LinkedIn URL" defaultValue="https://linkedin.com/company/techcorp" />
                        <input className="input-field" placeholder="Twitter URL" />
                    </div>
                </div>
                <button className="btn btn-primary" style={{ marginTop: '24px' }}>Save Changes</button>
            </div>
        </div>
    </DashboardLayout>
);

export default CompanyProfile;

