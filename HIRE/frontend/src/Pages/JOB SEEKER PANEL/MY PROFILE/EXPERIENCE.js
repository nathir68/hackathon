import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { seekerLinks } from '../../Components/SidebarLinks';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const expData = [
    { title: 'Senior Frontend Developer', company: 'TechCorp', location: 'San Francisco', period: 'Jan 2023 – Present', type: 'Full-time', desc: 'Led frontend architecture for 3 major products. Mentored junior developers. Improved performance by 40%.' },
    { title: 'Frontend Developer', company: 'WebScale', location: 'Remote', period: 'Jun 2021 – Dec 2022', type: 'Full-time', desc: 'Built responsive web applications using React and TypeScript. Collaborated with design and backend teams.' },
    { title: 'Junior Developer', company: 'StartupXYZ', location: 'Austin, TX', period: 'Aug 2020 – May 2021', type: 'Full-time', desc: 'Developed UI components and maintained internal tools.' },
];

const Experience = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header-row">
                    <div><h1 style={{ fontSize: 'var(--fs-3xl)', fontWeight: 800 }}>Experience</h1><p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Add your work experience</p></div>
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}><HiOutlinePlus /> Add Experience</button>
                </div>

                {showForm && (
                    <div className="glass-card" style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Add Experience</h3>
                        <div className="grid-2" style={{ gap: '16px' }}>
                            <div className="input-group"><label>Job Title</label><input className="input-field" placeholder="e.g. Frontend Developer" /></div>
                            <div className="input-group"><label>Company</label><input className="input-field" placeholder="e.g. TechCorp" /></div>
                            <div className="input-group"><label>Location</label><input className="input-field" placeholder="e.g. San Francisco" /></div>
                            <div className="input-group"><label>Employment Type</label><select className="select-field"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></div>
                            <div className="input-group"><label>Start Date</label><input className="input-field" type="month" /></div>
                            <div className="input-group"><label>End Date</label><input className="input-field" type="month" /></div>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', margin: '12px 0' }}><input type="checkbox" /> Currently working here</label>
                        <div className="input-group"><label>Description</label><textarea className="textarea-field" rows={4} placeholder="Describe your responsibilities and achievements..." /></div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}><button className="btn btn-primary" onClick={() => setShowForm(false)}>Save</button><button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button></div>
                    </div>
                )}

                <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px solid var(--border-color)' }}>
                    {expData.map((e, i) => (
                        <div key={i} style={{ position: 'relative', marginBottom: '24px' }}>
                            <div style={{ position: 'absolute', left: '-29px', top: '8px', width: '12px', height: '12px', borderRadius: '50%', background: 'var(--white)', border: '2px solid var(--bg-primary)' }}></div>
                            <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 'var(--fs-lg)' }}>{e.title}</div>
                                    <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginBottom: '4px' }}>{e.company} · {e.location}</div>
                                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginBottom: '8px' }}>{e.period} · {e.type}</div>
                                    <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{e.desc}</p>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}><button className="btn-icon"><HiOutlinePencil /></button><button className="btn-icon"><HiOutlineTrash /></button></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Experience;

