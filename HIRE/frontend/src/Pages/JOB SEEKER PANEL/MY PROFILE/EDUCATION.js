import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { seekerLinks } from '../../Components/SidebarLinks';
import { HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const eduData = [
    { degree: 'B.S. Computer Science', school: 'Stanford University', year: '2018 – 2022', gpa: '3.8', desc: 'Focus on Software Engineering and AI' },
    { degree: 'High School Diploma', school: 'Lincoln High School', year: '2014 – 2018', gpa: '3.9', desc: '' },
];

const Education = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header-row">
                    <div><h1 style={{ fontSize: 'var(--fs-3xl)', fontWeight: 800 }}>Education</h1><p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Add your educational background</p></div>
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}><HiOutlinePlus /> Add Education</button>
                </div>

                {showForm && (
                    <div className="glass-card" style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Add Education</h3>
                        <div className="grid-2" style={{ gap: '16px' }}>
                            <div className="input-group"><label>Degree</label><input className="input-field" placeholder="e.g. B.S. Computer Science" /></div>
                            <div className="input-group"><label>Field of Study</label><input className="input-field" placeholder="e.g. Software Engineering" /></div>
                            <div className="input-group"><label>Institution</label><input className="input-field" placeholder="e.g. Stanford University" /></div>
                            <div className="input-group"><label>GPA</label><input className="input-field" placeholder="e.g. 3.8" /></div>
                            <div className="input-group"><label>Start Date</label><input className="input-field" type="month" /></div>
                            <div className="input-group"><label>End Date</label><input className="input-field" type="month" /></div>
                        </div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', margin: '12px 0' }}><input type="checkbox" /> Currently studying here</label>
                        <div className="input-group"><label>Description</label><textarea className="textarea-field" rows={3} placeholder="Additional details..." /></div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}><button className="btn btn-primary" onClick={() => setShowForm(false)}>Save</button><button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button></div>
                    </div>
                )}

                {eduData.map((e, i) => (
                    <div className="glass-card" key={i} style={{ marginBottom: '16px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', background: 'var(--grey-800)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 'var(--fs-sm)', flexShrink: 0 }}>🎓</div>
                            <div>
                                <div style={{ fontWeight: 700 }}>{e.degree}</div>
                                <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{e.school}</div>
                                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>{e.year} {e.gpa && `· GPA: ${e.gpa}`}</div>
                                {e.desc && <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', marginTop: '8px' }}>{e.desc}</div>}
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px' }}><button className="btn-icon"><HiOutlinePencil /></button><button className="btn-icon"><HiOutlineTrash /></button></div>
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
};

export default Education;

