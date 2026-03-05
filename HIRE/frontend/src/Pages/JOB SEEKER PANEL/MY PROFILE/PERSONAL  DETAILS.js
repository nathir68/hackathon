import React from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { seekerLinks } from '../../Components/SidebarLinks';

const PersonalDetails = () => (
    <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
        <div className="page-wrapper">
            <div className="page-header"><h1>Personal Details</h1><p>Update your personal information</p></div>
            <div className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px' }}>
                    <div className="avatar-xl">JD</div>
                    <div>
                        <button className="btn btn-secondary btn-sm" style={{ marginBottom: '8px' }}>Upload Photo</button>
                        <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>JPG, PNG. Max 2MB. Will be cropped to square.</p>
                    </div>
                </div>
                <div className="grid-2" style={{ gap: '16px' }}>
                    <div className="input-group"><label>First Name</label><input className="input-field" defaultValue="John" /></div>
                    <div className="input-group"><label>Last Name</label><input className="input-field" defaultValue="Doe" /></div>
                    <div className="input-group"><label>Email</label><input className="input-field" defaultValue="john@example.com" readOnly style={{ opacity: 0.6 }} /></div>
                    <div className="input-group"><label>Phone</label><input className="input-field" defaultValue="+1 (555) 123-4567" /></div>
                    <div className="input-group"><label>Date of Birth</label><input className="input-field" type="date" /></div>
                    <div className="input-group"><label>Gender</label><select className="select-field"><option>Male</option><option>Female</option><option>Non-binary</option><option>Prefer not to say</option></select></div>
                    <div className="input-group"><label>City</label><input className="input-field" defaultValue="San Francisco" /></div>
                    <div className="input-group"><label>Country</label><input className="input-field" defaultValue="United States" /></div>
                    <div className="input-group"><label>LinkedIn URL</label><input className="input-field" placeholder="https://linkedin.com/in/johndoe" /></div>
                    <div className="input-group"><label>Portfolio Website</label><input className="input-field" placeholder="https://johndoe.dev" /></div>
                </div>
                <div className="input-group" style={{ marginTop: '16px' }}><label>Bio / Professional Summary</label><textarea className="textarea-field" rows={4} defaultValue="Experienced frontend developer with 5+ years of expertise in React, TypeScript, and modern web technologies. Passionate about building beautiful, performant user interfaces." /></div>
                <button className="btn btn-primary" style={{ marginTop: '20px' }}>Save Changes</button>
            </div>
        </div>
    </DashboardLayout>
);

export default PersonalDetails;

