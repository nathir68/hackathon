import React from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { seekerLinks } from '../Components/SidebarLinks';

const skills = [
    { name: 'React.js', level: 90, category: 'Technical' },
    { name: 'JavaScript', level: 85, category: 'Technical' },
    { name: 'TypeScript', level: 75, category: 'Technical' },
    { name: 'Node.js', level: 70, category: 'Technical' },
    { name: 'Python', level: 60, category: 'Technical' },
    { name: 'Communication', level: 88, category: 'Soft Skills' },
    { name: 'Problem Solving', level: 92, category: 'Soft Skills' },
    { name: 'Team Leadership', level: 72, category: 'Soft Skills' },
];

const gaps = [
    { skill: 'Docker', demand: 'High', suggestion: 'Take a containerization course on Udemy' },
    { skill: 'AWS', demand: 'High', suggestion: 'AWS Certified Cloud Practitioner recommended' },
    { skill: 'GraphQL', demand: 'Medium', suggestion: 'Complete the Apollo GraphQL tutorial' },
    { skill: 'System Design', demand: 'High', suggestion: 'Practice on system design interview resources' },
];

const trending = ['AI/ML', 'Cloud Computing', 'Cybersecurity', 'DevOps', 'Data Engineering', 'Blockchain'];

const AISkillAnalysis = () => (
    <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
        <div className="page-wrapper">
            <div className="page-header"><h1>AI Skill Analysis</h1><p>Understand your strengths and areas for improvement</p></div>

            <div className="grid-2" style={{ marginBottom: '24px' }}>
                <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Your Skills</h3>
                    {skills.map((s, i) => (
                        <div key={i} style={{ marginBottom: '16px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 500 }}>{s.name}</span>
                                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{s.level}%</span>
                            </div>
                            <div className="progress-bar"><div className="progress-fill" style={{ width: `${s.level}%` }}></div></div>
                        </div>
                    ))}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Overall Score</h3>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                            <div style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                <div style={{ fontSize: 'var(--fs-3xl)', fontWeight: 900 }}>78</div>
                                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>out of 100</div>
                            </div>
                        </div>
                        <p style={{ textAlign: 'center', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>Your profile is competitive for mid-senior level positions</p>
                    </div>

                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Trending Skills</h3>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {trending.map((t, i) => <span className="chip" key={i}>{t}</span>)}
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-card">
                <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Skill Gap Analysis</h3>
                <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginBottom: '16px' }}>Skills you should consider learning for your target roles</p>
                <div className="glass-card" style={{ padding: 0, overflow: 'hidden', background: 'transparent', border: 'none' }}>
                    <table className="data-table">
                        <thead><tr><th>Skill</th><th>Market Demand</th><th>Suggestion</th></tr></thead>
                        <tbody>
                            {gaps.map((g, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{g.skill}</td>
                                    <td><span className="badge badge-outline">{g.demand}</span></td>
                                    <td>{g.suggestion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </DashboardLayout>
);

export default AISkillAnalysis;

