import React from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';

const interviews = [
    { candidate: 'Alice Johnson', role: 'Sr. React Dev', confidence: 92, communication: 88, technical: 95, culture: 85, overall: 90, recommendation: 'Strong Hire' },
    { candidate: 'Bob Williams', role: 'Sr. React Dev', confidence: 78, communication: 82, technical: 88, culture: 90, overall: 85, recommendation: 'Hire' },
    { candidate: 'Carol Smith', role: 'Backend Eng.', confidence: 85, communication: 75, technical: 80, culture: 72, overall: 78, recommendation: 'Maybe' },
];

const AIInterviewAnalytics = () => (
    <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Recruiter">
        <div className="page-wrapper">
            <div className="page-header"><h1>AI Interview Analytics</h1><p>AI-powered interview performance analysis</p></div>
            <div className="grid-4" style={{ marginBottom: '24px' }}>
                {[{ l: 'Interviews Analyzed', v: '45' }, { l: 'Avg Score', v: '82%' }, { l: 'Strong Hires', v: '12' }, { l: 'AI Accuracy', v: '94%' }].map((s, i) => (
                    <div className="stat-card" key={i}><div className="stat-value">{s.v}</div><div className="stat-label">{s.l}</div></div>
                ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {interviews.map((iv, i) => (
                    <div className="glass-card" key={i}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}><div className="avatar-lg">{iv.candidate[0]}</div><div><div style={{ fontWeight: 700 }}>{iv.candidate}</div><div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{iv.role}</div></div></div>
                            <div style={{ textAlign: 'right' }}><div style={{ fontWeight: 800, fontSize: 'var(--fs-xl)' }}>{iv.overall}%</div><span className="badge badge-outline">{iv.recommendation}</span></div>
                        </div>
                        <div className="grid-4" style={{ gap: '12px' }}>
                            {[['Confidence', iv.confidence], ['Communication', iv.communication], ['Technical', iv.technical], ['Culture Fit', iv.culture]].map(([l, v], j) => (
                                <div key={j}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}><span style={{ fontSize: 'var(--fs-xs)' }}>{l}</span><span style={{ fontSize: 'var(--fs-xs)', fontWeight: 600 }}>{v}%</span></div><div className="progress-bar"><div className="progress-fill" style={{ width: `${v}%` }}></div></div></div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </DashboardLayout>
);

export default AIInterviewAnalytics;

