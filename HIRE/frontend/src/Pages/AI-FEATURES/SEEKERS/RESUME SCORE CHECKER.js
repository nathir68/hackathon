import React from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { seekerLinks } from '../../Components/SidebarLinks';

const ResumeScoreChecker = () => (
    <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
        <div className="page-wrapper">
            <div className="page-header"><h1>AI Resume Score Checker</h1><p>Get an AI-powered analysis of your resume</p></div>
            <div className="grid-2" style={{ marginBottom: '24px' }}>
                <div className="glass-card" style={{ textAlign: 'center', padding: '48px' }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.5rem' }}>📄</div>
                    <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Upload Your Resume</h3>
                    <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', marginBottom: '20px' }}>PDF or DOCX, max 5MB</p>
                    <button className="btn btn-primary">Choose File</button>
                </div>
                <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Overall Score</h3>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                        <div style={{ width: '140px', height: '140px', borderRadius: '50%', border: '5px solid var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <div style={{ fontSize: 'var(--fs-4xl)', fontWeight: 900 }}>82</div>
                            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>/ 100</div>
                        </div>
                    </div>
                    {[['Content Quality', 85], ['Keywords', 78], ['Formatting', 90], ['ATS Compatibility', 75], ['Impact Statements', 80]].map(([l, v], i) => (
                        <div key={i} style={{ marginBottom: '12px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ fontSize: 'var(--fs-sm)' }}>{l}</span><span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>{v}%</span></div>
                            <div className="progress-bar"><div className="progress-fill" style={{ width: `${v}%` }}></div></div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="glass-card">
                <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>AI Suggestions</h3>
                {[['Add more quantifiable achievements', 'Use numbers to demonstrate impact, e.g. "Increased sales by 40%"'], ['Include relevant keywords', 'Add industry-specific keywords: React, TypeScript, CI/CD'], ['Improve summary section', 'Make your professional summary more compelling and specific'], ['Add certifications', 'List relevant certifications to boost credibility']].map(([t, d], i) => (
                    <div key={i} style={{ padding: '16px', background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '8px' }}>
                        <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)', marginBottom: '4px' }}>💡 {t}</div>
                        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{d}</div>
                    </div>
                ))}
            </div>
        </div>
    </DashboardLayout>
);

export default ResumeScoreChecker;

