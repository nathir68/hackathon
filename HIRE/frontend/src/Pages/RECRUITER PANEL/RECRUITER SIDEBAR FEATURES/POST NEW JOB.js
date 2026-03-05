import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { postJob } from '../../../api';

const PostNewJob = () => {
    const [step, setStep] = useState(0);
    const steps = ['Basic Info', 'Requirements', 'Details', 'Preview'];
    const navigate = useNavigate();

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        minSalary: '',
        maxSalary: '',
        skills: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePublish = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Map form data to backend schema (title, description, skills: array, location, salary)
            const payload = {
                title: formData.title || 'Untitled Job',
                description: formData.description || 'No description provided.',
                skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : ['General'],
                location: formData.location || 'Remote',
                salary: `$${formData.minSalary || '0'} - $${formData.maxSalary || '0'}`
            };

            await postJob(payload);
            setSuccess('Job posted successfully! Redirecting...');
            setTimeout(() => {
                navigate('/recruiter/manage-jobs');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to post job');
        } finally {
            setLoading(false);
        }
    };

    // Get user from local storage
    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Guest' };

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={user.name} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header"><h1>Post New Job</h1><p>Create a new job listing</p></div>

                {error && <div className="badge badge-danger" style={{ display: 'block', padding: '16px', marginBottom: '16px', fontSize: '16px' }}>{error}</div>}
                {success && <div className="badge badge-primary" style={{ display: 'block', padding: '16px', marginBottom: '16px', fontSize: '16px', background: 'var(--success-color)' }}>{success}</div>}

                <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
                    {steps.map((s, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: i <= step ? 'var(--white)' : 'var(--bg-glass)', color: i <= step ? 'var(--black)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 'var(--fs-sm)', border: '1px solid var(--border-color)', transition: 'all 0.3s' }}>{i + 1}</div>
                            <span style={{ fontSize: 'var(--fs-xs)', color: i <= step ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s}</span>
                        </div>
                    ))}
                </div>

                <div className="glass-card">
                    {step === 0 && (
                        <div className="auth-form">
                            <div className="input-group"><label>Job Title</label><input name="title" value={formData.title} onChange={handleChange} className="input-field" placeholder="e.g. Senior React Developer" /></div>
                            <div className="grid-2" style={{ gap: '16px' }}>
                                <div className="input-group"><label>Department</label><select className="select-field"><option>Engineering</option><option>Design</option><option>Marketing</option><option>Sales</option></select></div>
                                <div className="input-group"><label>Employment Type</label><select className="select-field"><option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option></select></div>
                                <div className="input-group"><label>Location</label><input name="location" value={formData.location} onChange={handleChange} className="input-field" placeholder="e.g. San Francisco, CA" /></div>
                                <div className="input-group"><label>Work Model</label><select className="select-field"><option>On-site</option><option>Remote</option><option>Hybrid</option></select></div>
                            </div>
                            <div className="grid-2" style={{ gap: '16px' }}>
                                <div className="input-group"><label>Min Salary ($)</label><input name="minSalary" value={formData.minSalary} onChange={handleChange} className="input-field" type="number" placeholder="80000" /></div>
                                <div className="input-group"><label>Max Salary ($)</label><input name="maxSalary" value={formData.maxSalary} onChange={handleChange} className="input-field" type="number" placeholder="130000" /></div>
                            </div>
                        </div>
                    )}
                    {step === 1 && (
                        <div className="auth-form">
                            <div className="input-group"><label>Required Skills</label><input name="skills" value={formData.skills} onChange={handleChange} className="input-field" placeholder="e.g. React, TypeScript, Node.js" /><p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: '4px' }}>Comma separated</p></div>
                            <div className="grid-2" style={{ gap: '16px' }}>
                                <div className="input-group"><label>Experience Level</label><select className="select-field"><option>Entry Level (0-2 yrs)</option><option>Mid Level (2-5 yrs)</option><option>Senior (5-8 yrs)</option><option>Lead (8+ yrs)</option></select></div>
                                <div className="input-group"><label>Education</label><select className="select-field"><option>No Requirement</option><option>High School</option><option>Bachelor's</option><option>Master's</option><option>PhD</option></select></div>
                            </div>
                            <div className="input-group"><label>Nice to Have</label><input className="input-field" placeholder="e.g. Docker, AWS, GraphQL" /></div>
                        </div>
                    )}
                    {step === 2 && (
                        <div className="auth-form">
                            <div className="input-group"><label>Job Description</label><textarea name="description" value={formData.description} onChange={handleChange} className="textarea-field" rows={6} placeholder="Describe the role, responsibilities, and what a typical day looks like..." /></div>
                            <div className="input-group"><label>Benefits & Perks</label><textarea className="textarea-field" rows={3} placeholder="e.g. Health insurance, 401k, Unlimited PTO, Remote work..." /></div>
                            <div className="grid-2" style={{ gap: '16px' }}>
                                <div className="input-group"><label>Application Deadline</label><input className="input-field" type="date" /></div>
                                <div className="input-group"><label>Start Date</label><input className="input-field" type="date" /></div>
                            </div>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}><input type="checkbox" /> Enable AI screening for applications</label>
                        </div>
                    )}
                    {step === 3 && (
                        <div>
                            <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Job Preview</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {[['Job Title', formData.title || 'Not specified'], ['Location', formData.location || 'Remote'], ['Salary', `$${formData.minSalary || '0'} - $${formData.maxSalary || '0'}`], ['Skills', formData.skills || 'None specified'], ['Description', formData.description || 'None specified']].map(([k, v], i) => (
                                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid var(--border-color)' }}>
                                        <span style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-sm)' }}>{k}</span>
                                        <span style={{ fontWeight: 600, fontSize: 'var(--fs-sm)', maxWidth: '60%', textAlign: 'right' }}>{v}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
                        {step > 0 && <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>Back</button>}
                        {step < 3 ? <button className="btn btn-primary" onClick={() => setStep(step + 1)}>Next</button> : <button className="btn btn-primary" onClick={handlePublish} disabled={loading}>{loading ? 'Publishing...' : 'Publish Job'}</button>}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default PostNewJob;

