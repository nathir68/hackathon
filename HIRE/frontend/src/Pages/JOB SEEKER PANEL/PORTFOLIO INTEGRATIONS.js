import React, { useState } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { seekerLinks } from '../Components/SidebarLinks';
import { HiOutlineExternalLink, HiOutlineCheck, HiOutlineCode, HiOutlinePhotograph, HiOutlineColorSwatch } from 'react-icons/hi';

const platforms = [
    { id: 'github', name: 'GitHub', icon: <HiOutlineCode />, desc: 'Import repositories, contributions, and coding activity', connected: false, stats: { repos: 42, contributions: 1284, stars: 156 } },
    { id: 'dribbble', name: 'Dribbble', icon: <HiOutlinePhotograph />, desc: 'Showcase your design shots and creative projects', connected: false, stats: { shots: 28, likes: 892, followers: 340 } },
    { id: 'behance', name: 'Behance', icon: <HiOutlineColorSwatch />, desc: 'Display your creative portfolio and case studies', connected: false, stats: { projects: 15, views: 12400, appreciations: 567 } },
];

const importedProjects = [
    { name: 'hire-platform', platform: 'GitHub', type: 'Web App', date: 'Mar 2026', stars: 34 },
    { name: 'design-system-v2', platform: 'Dribbble', type: 'UI Design', date: 'Feb 2026', stars: 89 },
    { name: 'portfolio-redesign', platform: 'Behance', type: 'Case Study', date: 'Jan 2026', stars: 45 },
];

const PortfolioIntegrations = () => {
    const [connected, setConnected] = useState({ github: true, dribbble: false, behance: false });

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header"><h1>Portfolio Integrations</h1><p>Connect your creative & developer platforms to auto-import projects</p></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                    {platforms.map(p => (
                        <div className="glass-card" key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                <div className="stat-icon" style={{ fontSize: '1.4rem' }}>{p.icon}</div>
                                <div>
                                    <div style={{ fontWeight: 700, marginBottom: '4px' }}>{p.name}</div>
                                    <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{p.desc}</div>
                                    {connected[p.id] && (
                                        <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                                            {Object.entries(p.stats).map(([k, v]) => (
                                                <span key={k} className="chip"><strong>{v}</strong>&nbsp;{k}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className={connected[p.id] ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'} onClick={() => setConnected(prev => ({ ...prev, [p.id]: !prev[p.id] }))}>
                                {connected[p.id] ? <><HiOutlineCheck /> Connected</> : <><HiOutlineExternalLink /> Connect</>}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Imported Projects</h3>
                    <table className="data-table">
                        <thead><tr><th>Project</th><th>Platform</th><th>Type</th><th>Date</th><th>Stars / Likes</th></tr></thead>
                        <tbody>
                            {importedProjects.map((p, i) => (
                                <tr key={i}>
                                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.name}</td>
                                    <td><span className="badge badge-outline">{p.platform}</span></td>
                                    <td>{p.type}</td>
                                    <td>{p.date}</td>
                                    <td>⭐ {p.stars}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PortfolioIntegrations;

