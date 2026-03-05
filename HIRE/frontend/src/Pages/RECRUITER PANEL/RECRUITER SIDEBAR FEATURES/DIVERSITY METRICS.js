import React from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlineUserGroup, HiOutlineGlobe, HiOutlineHeart, HiOutlineTrendingUp } from 'react-icons/hi';

const genderData = [
    { label: 'Male', value: 45, count: 146 },
    { label: 'Female', value: 38, count: 123 },
    { label: 'Non-Binary', value: 8, count: 26 },
    { label: 'Prefer Not to Say', value: 9, count: 29 },
];

const ethnicityData = [
    { label: 'White', value: 35, count: 113 },
    { label: 'Asian', value: 28, count: 91 },
    { label: 'Hispanic/Latino', value: 18, count: 58 },
    { label: 'Black', value: 12, count: 39 },
    { label: 'Other', value: 7, count: 23 },
];

const ageData = [
    { label: '18–24', value: 22, count: 71 },
    { label: '25–34', value: 42, count: 136 },
    { label: '35–44', value: 24, count: 78 },
    { label: '45–54', value: 8, count: 26 },
    { label: '55+', value: 4, count: 13 },
];

const pipelineStages = [
    { stage: 'Applied', total: 324, diverse: 215, pct: 66 },
    { stage: 'Screened', total: 180, diverse: 112, pct: 62 },
    { stage: 'Interviewed', total: 45, diverse: 26, pct: 58 },
    { stage: 'Offered', total: 18, diverse: 10, pct: 56 },
    { stage: 'Hired', total: 12, diverse: 7, pct: 58 },
];

const BarChart = ({ data, maxVal }) => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', height: '180px', paddingTop: '20px' }}>
        {data.map((d, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 600 }}>{d.value}%</div>
                <div style={{ width: '100%', background: '#fff', borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0', height: `${(d.value / (maxVal || 50)) * 100}%`, minHeight: '4px', transition: 'height 0.5s ease' }} />
                <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textAlign: 'center' }}>{d.label}</span>
            </div>
        ))}
    </div>
);

const DiversityMetrics = () => (
    <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Recruiter">
        <div className="page-wrapper">
            <div className="page-header"><h1>Diversity & Inclusion Metrics</h1><p>Voluntary demographic insights across your applicant pool</p></div>

            <div className="grid-4" style={{ marginBottom: '24px' }}>
                {[
                    { icon: <HiOutlineUserGroup />, label: 'Total Applicants', value: '324', change: 'Voluntarily reported' },
                    { icon: <HiOutlineGlobe />, label: 'Diversity Score', value: '72%', change: '+8% vs last quarter' },
                    { icon: <HiOutlineHeart />, label: 'Inclusion Rating', value: '4.2/5', change: 'From exit surveys' },
                    { icon: <HiOutlineTrendingUp />, label: 'Retention Rate', value: '89%', change: 'Diverse hires (12mo)' },
                ].map((s, i) => (
                    <div className="stat-card" key={i}><div className="stat-icon">{s.icon}</div><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div><div className="stat-change">{s.change}</div></div>
                ))}
            </div>

            <div className="grid-3" style={{ marginBottom: '24px' }}>
                <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Gender Distribution</h3>
                    <BarChart data={genderData} maxVal={50} />
                </div>
                <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Ethnicity Breakdown</h3>
                    <BarChart data={ethnicityData} maxVal={40} />
                </div>
                <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Age Distribution</h3>
                    <BarChart data={ageData} maxVal={50} />
                </div>
            </div>

            <div className="glass-card">
                <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Pipeline Diversity Analysis</h3>
                <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginBottom: '16px' }}>Tracking diversity representation through each hiring stage</p>
                <table className="data-table">
                    <thead><tr><th>Stage</th><th>Total</th><th>Diverse Candidates</th><th>Diversity %</th><th>Trend</th></tr></thead>
                    <tbody>
                        {pipelineStages.map((p, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.stage}</td>
                                <td>{p.total}</td>
                                <td>{p.diverse}</td>
                                <td>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div className="progress-bar" style={{ width: '80px' }}><div className="progress-fill" style={{ width: `${p.pct}%` }} /></div>
                                        <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 600 }}>{p.pct}%</span>
                                    </div>
                                </td>
                                <td><span className="badge badge-outline">{p.pct >= 60 ? '↑ Good' : '↓ Needs Focus'}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                📋 All demographic data is collected voluntarily and anonymized. This data is used solely for internal diversity tracking and improving inclusive hiring practices.
            </div>
        </div>
    </DashboardLayout>
);

export default DiversityMetrics;

