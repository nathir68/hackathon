import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineEye, HiOutlineEyeOff, HiOutlineCheck } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedinIn } from 'react-icons/fa';
import '../public panel/PublicStyles.css';
import { signup } from '../../api';

const steps = ['Role', 'Basic Info', 'Details', 'Review'];

const Signup = () => {
    const [step, setStep] = useState(0);
    const [role, setRole] = useState('seeker');
    const [showPass, setShowPass] = useState(false);

    const [formData, setFormData] = useState({
        name: '', email: '', password: '', confirmPassword: '',
        phone: '', skills: '', experience: 'Entry Level',
        companyName: '', companySize: '1-10', industry: 'Technology'
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSignup = async (e) => {
        e.preventDefault();
        if (step < 3) return setStep(step + 1);

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        setError('');
        setLoading(true);
        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                role: role
            };
            const res = await signup(payload);
            const { token, ...user } = res.data;
            localStorage.setItem('hire_token', token);
            localStorage.setItem('hire_user', JSON.stringify(user));

            if (role === 'admin') navigate('/admin/dashboard');
            else if (role === 'recruiter') navigate('/recruiter/dashboard');
            else navigate('/seeker/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-left-content">
                    <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🎯</div>
                    <h2>Join HIRE</h2>
                    <p>Create your account in a few simple steps and start your journey.</p>
                </div>
            </div>
            <div className="auth-right">
                <div className="auth-form-container">
                    <Link to="/" className="nav-logo" style={{ marginBottom: '24px', display: 'inline-flex' }}>
                        <div className="logo-icon"><HiOutlineSparkles /></div><span>HIRE</span>
                    </Link>
                    <h2>Create Account</h2>
                    <p className="auth-subtitle">Step {step + 1} of {steps.length}</p>

                    {/* Progress Stepper */}
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                        {steps.map((s, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: i <= step ? 'var(--primary)' : 'var(--bg-glass)',
                                    border: `2px solid ${i <= step ? 'var(--primary)' : 'var(--border-color)'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.75rem', fontWeight: '700', color: i <= step ? 'white' : 'var(--text-muted)',
                                    transition: 'all 0.3s'
                                }}>
                                    {i < step ? <HiOutlineCheck /> : i + 1}
                                </div>
                                <span style={{ fontSize: '0.7rem', color: i <= step ? 'var(--text-primary)' : 'var(--text-muted)' }}>{s}</span>
                            </div>
                        ))}
                    </div>

                    <form className="auth-form" onSubmit={handleSignup}>
                        {error && <div style={{ color: 'var(--danger, red)', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
                        {step === 0 && (
                            <div className="role-tabs" style={{ marginBottom: 0 }}>
                                <button className={`role-tab ${role === 'seeker' ? 'active' : ''}`} onClick={() => setRole('seeker')}>Job Seeker</button>
                                <button className={`role-tab ${role === 'recruiter' ? 'active' : ''}`} onClick={() => setRole('recruiter')}>Recruiter</button>
                            </div>
                        )}
                        {step === 1 && (
                            <>
                                <div className="input-group"><label>Full Name</label><input className="input-field" placeholder="John Doe" name="name" value={formData.name} onChange={handleChange} required /></div>
                                <div className="input-group"><label>Email</label><input className="input-field" type="email" placeholder="john@example.com" name="email" value={formData.email} onChange={handleChange} required /></div>
                                <div className="input-group">
                                    <label>Password</label>
                                    <div className="password-field">
                                        <input className="input-field" type={showPass ? 'text' : 'password'} placeholder="Create a strong password" name="password" value={formData.password} onChange={handleChange} required />
                                        <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>{showPass ? <HiOutlineEyeOff /> : <HiOutlineEye />}</button>
                                    </div>
                                </div>
                                <div className="input-group"><label>Confirm Password</label><input className="input-field" type="password" placeholder="Confirm password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required /></div>
                                {/* Password strength */}
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    {[1, 2, 3, 4].map(i => <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', background: i <= 2 ? 'var(--warning)' : 'var(--bg-glass)' }}></div>)}
                                </div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--warning)' }}>Medium strength</span>
                            </>
                        )}
                        {step === 2 && (
                            role === 'seeker' ? (
                                <>
                                    <div className="input-group"><label>Phone</label><input className="input-field" placeholder="+1 (555) 000-0000" /></div>
                                    <div className="input-group"><label>Top Skills</label><input className="input-field" placeholder="React, Python, Design..." /></div>
                                    <div className="input-group"><label>Experience Level</label>
                                        <select className="select-field"><option>Entry Level</option><option>Mid Level</option><option>Senior</option><option>Lead</option></select>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="input-group"><label>Company Name</label><input className="input-field" placeholder="Acme Corp" /></div>
                                    <div className="input-group"><label>Company Size</label>
                                        <select className="select-field"><option>1-10</option><option>11-50</option><option>51-200</option><option>201-500</option><option>500+</option></select>
                                    </div>
                                    <div className="input-group"><label>Industry</label>
                                        <select className="select-field"><option>Technology</option><option>Finance</option><option>Healthcare</option><option>Education</option><option>Other</option></select>
                                    </div>
                                </>
                            )
                        )}
                        {step === 3 && (
                            <div className="glass-card" style={{ padding: '20px' }}>
                                <h4 style={{ marginBottom: '12px' }}>Review Your Details</h4>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div><strong>Role:</strong> {role === 'seeker' ? 'Job Seeker' : 'Recruiter'}</div>
                                    <div><strong>Name:</strong> John Doe</div>
                                    <div><strong>Email:</strong> john@example.com</div>
                                </div>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '16px' }}>
                                    <input type="checkbox" /> I agree to the Terms & Conditions
                                </label>
                            </div>
                        )}
                        <div style={{ display: 'flex', gap: '12px' }}>
                            {step > 0 && <button className="btn btn-secondary btn-lg" style={{ flex: 1 }} onClick={() => setStep(step - 1)}>Back</button>}
                            {step < 3 ? (
                                <button type="button" className="btn btn-primary btn-lg" style={{ flex: 1 }} onClick={() => setStep(step + 1)}>Next</button>
                            ) : (
                                <button type="submit" className="btn btn-primary btn-lg" style={{ flex: 1 }} disabled={loading}>
                                    {loading ? 'Creating...' : 'Create Account'}
                                </button>
                            )}
                        </div>
                    </form>

                    <div className="auth-divider">or sign up with</div>
                    <div className="social-buttons">
                        <button className="social-btn"><FcGoogle /> Google</button>
                        <button className="social-btn"><FaLinkedinIn color="#0A66C2" /> LinkedIn</button>
                    </div>
                    <div className="auth-footer">Already have an account? <Link to="/auth/login">Sign In</Link></div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
