import React from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { seekerLinks } from '../../Components/SidebarLinks';

const results = [
    { file1: 'Resume_A.pdf', file2: 'Resume_B.pdf', similarity: 92, status: 'Flagged', details: 'Near identical work experience and skills sections' },
    { file1: 'Resume_C.pdf', file2: 'Resume_D.pdf', similarity: 45, status: 'OK', details: 'Low similarity, different candidates' },
    { file1: 'Resume_E.pdf', file2: 'Resume_F.pdf', similarity: 78, status: 'Warning', details: 'Similar project descriptions detected' },
];

const DuplicateResumeDetector = () => (
    <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
        <div className="page-wrapper">
            <div className="page-header"><h1>Duplicate Resume Detector</h1><p>Check your resume for originality</p></div>
            <div className="glass-card" style={{ textAlign: 'center', padding: '48px', marginBottom: '24px', border: '2px dashed var(--border-color)' }}>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>📋</div>
                <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Upload Resume to Check</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-sm)', marginBottom: '16px' }}>We'll compare against our database to ensure originality</p>
                <button className="btn btn-primary">Upload & Scan</button>
            </div>
            <div className="grid-3" style={{ marginBottom: '24px' }}>
                {[{ l: 'Scanned', v: '156' }, { l: 'Flagged', v: '8' }, { l: 'Accuracy', v: '98%' }].map((s, i) => (
                    <div className="stat-card" key={i}><div className="stat-value">{s.v}</div><div className="stat-label">{s.l}</div></div>
                ))}
            </div>
            <div className="glass-card">
                <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Recent Scans</h3>
                <table className="data-table">
                    <thead><tr><th>File 1</th><th>File 2</th><th>Similarity</th><th>Status</th><th>Details</th></tr></thead>
                    <tbody>
                        {results.map((r, i) => (
                            <tr key={i}><td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.file1}</td><td>{r.file2}</td><td style={{ fontWeight: 700 }}>{r.similarity}%</td><td><span className="badge badge-outline">{r.status}</span></td><td>{r.details}</td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </DashboardLayout>
);

export default DuplicateResumeDetector;

