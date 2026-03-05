import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { seekerLinks } from '../../Components/SidebarLinks';
import { HiOutlinePlus, HiOutlineDownload, HiOutlineTrash } from 'react-icons/hi';

const ResumeBuilder = () => {
    const [sections] = useState(['Personal Info', 'Summary', 'Experience', 'Education', 'Skills', 'Projects', 'Certifications']);
    const [activeSection, setActiveSection] = useState(0);

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header-row">
                    <div><h1 style={{ fontSize: 'var(--fs-3xl)', fontWeight: 800 }}>AI Resume Builder</h1><p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Build a professional resume with AI assistance</p></div>
                    <div style={{ display: 'flex', gap: '8px' }}><button className="btn btn-secondary"><HiOutlineDownload /> Download PDF</button><button className="btn btn-primary">Save Resume</button></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr 300px', gap: '24px' }}>
                    {/* Sections sidebar */}
                    <div className="glass-card" style={{ padding: '12px' }}>
                        {sections.map((s, i) => (
                            <div key={i} onClick={() => setActiveSection(i)} style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: activeSection === i ? 'var(--white)' : 'transparent', color: activeSection === i ? 'var(--black)' : 'var(--text-secondary)', fontWeight: activeSection === i ? 600 : 400, fontSize: 'var(--fs-sm)', transition: 'all 0.2s', marginBottom: '2px' }}>{s}</div>
                        ))}
                        <button className="btn btn-ghost btn-sm" style={{ width: '100%', marginTop: '8px' }}><HiOutlinePlus /> Add Section</button>
                    </div>
                    {/* Editor */}
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>{sections[activeSection]}</h3>
                        {activeSection === 0 && <div className="auth-form"><div className="grid-2" style={{ gap: '12px' }}><div className="input-group"><label>Full Name</label><input className="input-field" defaultValue="John Doe" /></div><div className="input-group"><label>Email</label><input className="input-field" defaultValue="john@example.com" /></div><div className="input-group"><label>Phone</label><input className="input-field" defaultValue="+1 555-0123" /></div><div className="input-group"><label>Location</label><input className="input-field" defaultValue="San Francisco, CA" /></div><div className="input-group"><label>LinkedIn</label><input className="input-field" placeholder="linkedin.com/in/..." /></div><div className="input-group"><label>Website</label><input className="input-field" placeholder="portfolio URL" /></div></div></div>}
                        {activeSection === 1 && <div className="auth-form"><div className="input-group"><label>Professional Summary</label><textarea className="textarea-field" rows={5} defaultValue="Experienced frontend developer with 5+ years building scalable web applications..." /></div><button className="btn btn-secondary" style={{ marginTop: '8px' }}>✨ Generate with AI</button></div>}
                        {activeSection === 2 && <div className="auth-form"><div style={{ padding: '16px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '12px' }}><div style={{ display: 'flex', justifyContent: 'space-between' }}><div><div style={{ fontWeight: 700 }}>Senior Frontend Developer</div><div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>TechCorp · 2023 – Present</div></div><button className="btn-icon"><HiOutlineTrash /></button></div><textarea className="textarea-field" rows={3} style={{ marginTop: '12px' }} defaultValue="• Led frontend architecture for 3 major products&#10;• Mentored 4 junior developers&#10;• Improved page load time by 40%" /></div><button className="btn btn-secondary"><HiOutlinePlus /> Add Experience</button></div>}
                        {activeSection >= 3 && <div className="auth-form"><p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>Click to edit this section. AI can help you write compelling content.</p><textarea className="textarea-field" rows={6} placeholder={`Enter your ${sections[activeSection].toLowerCase()} here...`} /><button className="btn btn-secondary" style={{ marginTop: '8px' }}>✨ AI Enhance</button></div>}
                    </div>
                    {/* Preview */}
                    <div className="glass-card" style={{ padding: '24px', fontSize: 'var(--fs-xs)' }}>
                        <div style={{ textAlign: 'center', marginBottom: '16px', paddingBottom: '16px', borderBottom: '2px solid var(--white)' }}>
                            <div style={{ fontWeight: 800, fontSize: 'var(--fs-lg)' }}>JOHN DOE</div>
                            <div style={{ color: 'var(--text-muted)', marginTop: '4px' }}>john@example.com · +1 555-0123</div>
                            <div style={{ color: 'var(--text-muted)' }}>San Francisco, CA</div>
                        </div>
                        <div style={{ marginBottom: '12px' }}><div style={{ fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '4px', marginBottom: '8px' }}>SUMMARY</div><div style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>Experienced frontend developer with 5+ years...</div></div>
                        <div style={{ marginBottom: '12px' }}><div style={{ fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '4px', marginBottom: '8px' }}>EXPERIENCE</div><div style={{ color: 'var(--text-secondary)' }}>Senior Frontend Dev · TechCorp</div></div>
                        <div><div style={{ fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '4px', marginBottom: '8px' }}>SKILLS</div><div style={{ color: 'var(--text-secondary)' }}>React, TypeScript, Node.js</div></div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ResumeBuilder;

