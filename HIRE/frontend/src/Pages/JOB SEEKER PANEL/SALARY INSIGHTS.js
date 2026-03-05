import React, { useState } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { seekerLinks } from '../Components/SidebarLinks';
import { HiOutlineTrendingUp, HiOutlineLocationMarker, HiOutlineBriefcase, HiOutlineAcademicCap } from 'react-icons/hi';

const salaryData = [
    { role: 'Frontend Developer', min: '$65K', median: '$95K', max: '$140K', pct: 72 },
    { role: 'Full Stack Engineer', min: '$80K', median: '$120K', max: '$175K', pct: 85 },
    { role: 'React Developer', min: '$70K', median: '$105K', max: '$155K', pct: 78 },
    { role: 'Software Engineer', min: '$85K', median: '$130K', max: '$190K', pct: 88 },
];

const factors = [
    { label: 'Your Skills Match', value: '87%', icon: <HiOutlineTrendingUp />, desc: 'Based on React, TypeScript, Node.js' },
    { label: 'Location Factor', value: '+18%', icon: <HiOutlineLocationMarker />, desc: 'San Francisco Bay Area premium' },
    { label: 'Experience Level', value: 'Mid-Senior', icon: <HiOutlineBriefcase />, desc: '4+ years relevant experience' },
    { label: 'Education Bonus', value: '+5%', icon: <HiOutlineAcademicCap />, desc: "Bachelor's in Computer Science" },
];

const companyComparisons = [
    { company: 'TechCorp', role: 'Sr. Frontend Dev', salary: '$135K', rating: '4.2/5' },
    { company: 'DataFlow Inc.', role: 'React Engineer', salary: '$125K', rating: '4.0/5' },
    { company: 'DesignHub', role: 'Full Stack Dev', salary: '$118K', rating: '4.5/5' },
    { company: 'CloudScale', role: 'Frontend Lead', salary: '$155K', rating: '3.8/5' },
];

const SalaryInsights = () => {
    const [selectedRole, setSelectedRole] = useState(0);

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header"><h1>Salary Insights & Estimator</h1><p>AI-driven salary analysis based on your skills and location</p></div>

                <div className="glass-card" style={{ marginBottom: '24px', padding: '32px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '100%', background: 'radial-gradient(circle at right, rgba(255,255,255,0.03), transparent)', pointerEvents: 'none' }} />
                    <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginBottom: '8px' }}>Your Estimated Salary Range</div>
                    <div style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '8px' }}>$105K — $145K</div>
                    <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>Based on your profile, skills, and market data</div>
                </div>

                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {factors.map((f, i) => (
                        <div className="stat-card" key={i}>
                            <div className="stat-icon">{f.icon}</div>
                            <div className="stat-value" style={{ fontSize: 'var(--fs-2xl)' }}>{f.value}</div>
                            <div className="stat-label">{f.label}</div>
                            <div className="stat-change">{f.desc}</div>
                        </div>
                    ))}
                </div>

                <div className="grid-2" style={{ marginBottom: '24px' }}>
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Role-Based Salary Ranges</h3>
                        {salaryData.map((s, i) => (
                            <div key={i} style={{ marginBottom: '20px', cursor: 'pointer', opacity: selectedRole === i ? 1 : 0.6, transition: 'all 0.3s' }} onClick={() => setSelectedRole(i)}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontSize: 'var(--fs-sm)', fontWeight: selectedRole === i ? 700 : 500 }}>{s.role}</span>
                                    <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{s.median}</span>
                                </div>
                                <div className="progress-bar"><div className="progress-fill" style={{ width: `${s.pct}%` }}></div></div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                                    <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{s.min}</span>
                                    <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{s.max}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Company Comparisons</h3>
                        <table className="data-table">
                            <thead><tr><th>Company</th><th>Role</th><th>Salary</th><th>Rating</th></tr></thead>
                            <tbody>
                                {companyComparisons.map((c, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.company}</td>
                                        <td>{c.role}</td>
                                        <td style={{ fontWeight: 600 }}>{c.salary}</td>
                                        <td><span className="badge badge-outline">⭐ {c.rating}</span></td>
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

export default SalaryInsights;

