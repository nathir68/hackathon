import React from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { seekerLinks } from '../../Components/SidebarLinks';

const ATSChecker = () => (
    <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
        <div className="page-wrapper">
            <div className="page-header"><h1>ATS Compatibility Checker</h1><p>Check if your resume passes Applicant Tracking Systems</p></div>
            <div className="glass-card" style={{ marginBottom: '24px' }}>
                <div className="grid-2" style={{ gap: '16px' }}>
                    <div className="input-group"><label>Upload Resume</label><input className="input-field" type="file" accept=".pdf,.docx" /></div>
                    <div className="input-group"><label>Paste Job Description (optional)</label><textarea className="textarea-field" rows={3} placeholder="Paste the target job description here for better matching..." /></div>
                </div>
                <button className="btn btn-primary" style={{ marginTop: '16px' }}>Analyze Resume</button>
            </div>
            <div className="grid-3" style={{ marginBottom: '24px' }}>
                {[{ l: 'ATS Score', v: '78%' }, { l: 'Keywords Found', v: '12/18' }, { l: 'Formatting', v: 'Pass' }].map((s, i) => (
                    <div className="stat-card" key={i} style={{ textAlign: 'center' }}><div className="stat-value">{s.v}</div><div className="stat-label">{s.l}</div></div>
                ))}
            </div>
            <div className="grid-2" style={{ marginBottom: '24px' }}>
                <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>✅ Passed Checks</h3>
                    {['Standard font used', 'Proper section headings', 'Contact info present', 'No images/graphics', 'Consistent date format', 'No tables or columns'].map((c, i) => (
                        <div key={i} style={{ padding: '8px 0', borderBottom: i < 5 ? '1px solid var(--border-color)' : 'none', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>✓ {c}</div>
                    ))}
                </div>
                <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>⚠ Issues Found</h3>
                    {['Missing keywords: Docker, AWS, CI/CD', 'Skills section could be more prominent', 'Dates not in reverse chronological order', 'Summary too generic'].map((c, i) => (
                        <div key={i} style={{ padding: '8px 0', borderBottom: i < 3 ? '1px solid var(--border-color)' : 'none', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>⚠ {c}</div>
                    ))}
                </div>
            </div>
            <div className="glass-card">
                <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Missing Keywords</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>{['Docker', 'AWS', 'CI/CD', 'GraphQL', 'Kubernetes', 'Terraform'].map((k, i) => <span className="chip" key={i}>{k}</span>)}</div>
            </div>
        </div>
    </DashboardLayout>
);

export default ATSChecker;

