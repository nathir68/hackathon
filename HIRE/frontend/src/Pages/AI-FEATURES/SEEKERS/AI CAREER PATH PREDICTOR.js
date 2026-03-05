import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { seekerLinks } from '../../Components/SidebarLinks';
import { HiOutlineTrendingUp, HiOutlineAcademicCap, HiOutlineLightningBolt, HiOutlineChevronRight, HiOutlineBriefcase } from 'react-icons/hi';

const currentProfile = {
    role: 'Frontend Developer',
    experience: '4 years',
    topSkills: ['React.js', 'TypeScript', 'Node.js', 'CSS', 'GraphQL'],
};

const predictedPaths = [
    { role: 'Senior Frontend Developer', confidence: 92, timeline: '1–2 years', salary: '$120K–$155K', required: ['System Design', 'Performance Optimization', 'Mentoring'] },
    { role: 'Frontend Architect', confidence: 74, timeline: '3–4 years', salary: '$155K–$195K', required: ['Micro-frontends', 'CI/CD Pipelines', 'Technical Strategy'] },
    { role: 'Engineering Manager', confidence: 65, timeline: '3–5 years', salary: '$145K–$185K', required: ['Team Leadership', 'Project Management', 'Hiring'] },
    { role: 'Full Stack Lead', confidence: 58, timeline: '2–3 years', salary: '$135K–$175K', required: ['Backend APIs', 'Database Design', 'DevOps'] },
];

const certifications = [
    { name: 'AWS Cloud Practitioner', provider: 'Amazon', relevance: 'High', duration: '3 months' },
    { name: 'Meta Frontend Professional', provider: 'Meta / Coursera', relevance: 'High', duration: '4 months' },
    { name: 'Google UX Design', provider: 'Google', relevance: 'Medium', duration: '6 months' },
    { name: 'Certified Scrum Master', provider: 'Scrum Alliance', relevance: 'Medium', duration: '2 months' },
];

const AICareerPathPredictor = () => {
    const [selected, setSelected] = useState(0);

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header"><h1>AI Career Path Predictor</h1><p>Your predicted career trajectory based on skills and experience</p></div>

                <div className="glass-card" style={{ marginBottom: '24px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '100%', background: 'radial-gradient(circle at right, rgba(255,255,255,0.03), transparent)', pointerEvents: 'none' }} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <div className="avatar avatar-xl"><HiOutlineBriefcase /></div>
                        <div>
                            <div style={{ fontSize: 'var(--fs-2xl)', fontWeight: 800 }}>{currentProfile.role}</div>
                            <div style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>{currentProfile.experience} of experience</div>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {currentProfile.topSkills.map((s, i) => <span className="chip" key={i}>{s}</span>)}
                            </div>
                        </div>
                    </div>
                </div>

                <h3 style={{ fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><HiOutlineTrendingUp /> Predicted Career Paths</h3>

                {/* Timeline visualization */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                    {predictedPaths.map((p, i) => (
                        <div key={i} className="glass-card" onClick={() => setSelected(i)}
                            style={{ cursor: 'pointer', borderColor: selected === i ? 'var(--border-active)' : 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', border: '3px solid var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 'var(--fs-sm)' }}>{p.confidence}%</div>
                                <div>
                                    <div style={{ fontWeight: 700 }}>{p.role}</div>
                                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{p.timeline} · {p.salary}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div className="progress-bar" style={{ width: '120px' }}><div className="progress-fill" style={{ width: `${p.confidence}%` }} /></div>
                                <HiOutlineChevronRight style={{ color: 'var(--text-muted)' }} />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid-2">
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Skills to Acquire for: {predictedPaths[selected].role}</h3>
                        {predictedPaths[selected].required.map((s, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', marginBottom: '8px' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 'var(--fs-xs)', fontWeight: 700 }}>{i + 1}</div>
                                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 500 }}>{s}</span>
                                <span className="badge badge-outline" style={{ marginLeft: 'auto' }}>Required</span>
                            </div>
                        ))}
                    </div>

                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><HiOutlineAcademicCap /> Recommended Certifications</h3>
                        <table className="data-table">
                            <thead><tr><th>Certification</th><th>Provider</th><th>Relevance</th><th>Duration</th></tr></thead>
                            <tbody>
                                {certifications.map((c, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</td>
                                        <td>{c.provider}</td>
                                        <td><span className={`badge ${c.relevance === 'High' ? 'badge-light' : 'badge-outline'}`}>{c.relevance}</span></td>
                                        <td>{c.duration}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AICareerPathPredictor;

