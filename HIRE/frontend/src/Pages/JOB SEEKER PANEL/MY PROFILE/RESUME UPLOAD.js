import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { seekerLinks } from '../../Components/SidebarLinks';
import { HiOutlineCloudUpload, HiOutlineDocumentText, HiOutlineTrash, HiOutlineLightningBolt } from 'react-icons/hi';

const resumes = [
    { name: 'Main_Resume_2026.pdf', size: '245 KB', date: 'Mar 1, 2026', active: true },
    { name: 'Technical_Resume.pdf', size: '198 KB', date: 'Feb 15, 2026', active: false },
];

const ResumeUpload = () => {
    const [dragging, setDragging] = useState(false);

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header"><h1>Resume Upload</h1><p>Manage your resumes</p></div>

                {/* Upload Zone */}
                <div className="glass-card" style={{ marginBottom: '24px', textAlign: 'center', padding: '48px', border: dragging ? '2px dashed var(--white)' : '2px dashed var(--border-color)', cursor: 'pointer' }}
                    onDragOver={e => { e.preventDefault(); setDragging(true) }} onDragLeave={() => setDragging(false)} onDrop={e => { e.preventDefault(); setDragging(false) }}>
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.5rem', color: 'var(--grey-300)' }}><HiOutlineCloudUpload /></div>
                    <div style={{ fontWeight: 700, marginBottom: '8px' }}>Drag & drop your resume here</div>
                    <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', marginBottom: '16px' }}>or click to browse. Supports PDF, DOCX (Max 5MB)</div>
                    <button className="btn btn-primary">Choose File</button>
                </div>

                {/* Uploaded Resumes */}
                <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Your Resumes</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {resumes.map((r, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-sm)', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--grey-300)' }}><HiOutlineDocumentText /></div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{r.name}</div>
                                        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{r.size} · Uploaded {r.date}</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    {r.active && <span className="badge badge-light">Active</span>}
                                    {!r.active && <button className="btn btn-ghost btn-sm">Set Active</button>}
                                    <button className="btn-icon"><HiOutlineTrash /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: '24px', padding: '16px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <HiOutlineLightningBolt style={{ fontSize: '1.25rem', color: 'var(--grey-300)' }} />
                        <div><div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>Parse Resume with AI</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Auto-fill your profile from your uploaded resume</div></div>
                        <button className="btn btn-primary btn-sm" style={{ marginLeft: 'auto' }}>Parse</button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ResumeUpload;

