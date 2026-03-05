import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';

const AIJobDescriptionGenerator = () => {
    const [generated, setGenerated] = useState(false);

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header"><h1>AI Job Description Generator</h1><p>Generate professional job descriptions with AI</p></div>
                <div className="grid-2">
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Job Details</h3>
                        <div className="auth-form">
                            <div className="input-group"><label>Job Title</label><input className="input-field" placeholder="e.g. Senior React Developer" /></div>
                            <div className="grid-2" style={{ gap: '12px' }}>
                                <div className="input-group"><label>Department</label><select className="select-field"><option>Engineering</option><option>Design</option><option>Marketing</option></select></div>
                                <div className="input-group"><label>Seniority</label><select className="select-field"><option>Senior</option><option>Mid</option><option>Junior</option></select></div>
                            </div>
                            <div className="input-group"><label>Key Responsibilities</label><input className="input-field" placeholder="e.g. Build UI, mentor juniors, code review" /></div>
                            <div className="input-group"><label>Required Skills</label><input className="input-field" placeholder="e.g. React, TypeScript, Node.js" /></div>
                            <div className="input-group"><label>Company Culture Notes</label><textarea className="textarea-field" rows={3} placeholder="e.g. Remote-first, collaborative, fast-paced..." /></div>
                            <div className="input-group"><label>Tone</label><select className="select-field"><option>Professional</option><option>Casual</option><option>Formal</option></select></div>
                            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setGenerated(true)}>✨ Generate Job Description</button>
                        </div>
                    </div>
                    <div className="glass-card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontWeight: 700 }}>Generated Description</h3>
                            {generated && <div style={{ display: 'flex', gap: '8px' }}><button className="btn btn-secondary btn-sm">Copy</button><button className="btn btn-primary btn-sm">Use This</button></div>}
                        </div>
                        {generated ? (
                            <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                                <h4 style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Senior React Developer</h4>
                                <p style={{ marginBottom: '16px' }}>We're looking for a passionate Senior React Developer to join our Engineering team. You'll lead frontend architecture decisions and mentor a growing team of developers.</p>
                                <h5 style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '16px 0 8px' }}>Responsibilities</h5>
                                <ul style={{ paddingLeft: '16px' }}><li>Architect and build scalable React applications</li><li>Mentor junior developers and conduct code reviews</li><li>Collaborate with design and backend teams</li><li>Drive technical decisions and best practices</li></ul>
                                <h5 style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '16px 0 8px' }}>Requirements</h5>
                                <ul style={{ paddingLeft: '16px' }}><li>5+ years with React and TypeScript</li><li>Experience with Node.js and RESTful APIs</li><li>Strong understanding of web performance</li><li>Excellent communication skills</li></ul>
                                <h5 style={{ fontWeight: 700, color: 'var(--text-primary)', margin: '16px 0 8px' }}>Benefits</h5>
                                <ul style={{ paddingLeft: '16px' }}><li>Competitive salary + equity</li><li>Remote-first culture</li><li>Unlimited PTO</li><li>Learning & development budget</li></ul>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>✨</div>
                                <p>Fill in the details and click generate to create a professional job description.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AIJobDescriptionGenerator;

