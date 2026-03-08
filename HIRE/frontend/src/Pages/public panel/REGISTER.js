import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedinIn } from 'react-icons/fa';
import './PublicStyles.css';
import { signup, login } from '../../api';

const Register = () => {
    const [role, setRole] = useState('seeker');
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }
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

            if (res.data.role === 'admin') navigate('/admin/dashboard');
            else if (res.data.role === 'recruiter') navigate('/recruiter/dashboard');
            else navigate('/seeker/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        const email = prompt(`[Prototype] Please enter an email to login with ${provider}:`, `user@${provider.toLowerCase()}.com`);
        if (!email) return;
        setLoading(true);
        try {
            // Attempt to login first
            let res;
            try {
                res = await login({ email, password: 'SocialAuthPassword123!', role });
            } catch (loginErr) {
                // If login fails, try to register
                res = await signup({ name: email.split('@')[0], email, password: 'SocialAuthPassword123!', role });
            }

            const { token, ...user } = res.data;
            localStorage.setItem('hire_token', token);
            localStorage.setItem('hire_user', JSON.stringify(user));

            if (res.data.role === 'admin') navigate('/admin/dashboard');
            else if (res.data.role === 'recruiter') navigate('/recruiter/dashboard');
            else navigate('/seeker/dashboard');
        } catch (err) {
            setError(`${provider} login failed: ` + (err.response?.data?.message || err.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-left-content">
                    <div style={{ fontSize: '4rem', marginBottom: '24px' }}>✨</div>
                    <h2>Join HIRE Today</h2>
                    <p>Create your account to unlock AI-powered job matching, resume tools, and career opportunities.</p>
                </div>
            </div>
            <div className="auth-right">
                <div className="auth-form-container">
                    <Link to="/" className="nav-logo" style={{ marginBottom: '32px', display: 'inline-flex' }}><div className="logo-icon"><HiOutlineSparkles /></div><span>HIRE</span></Link>
                    <h2>Create Account</h2>
                    <p className="auth-subtitle">Choose your role and fill in your details</p>
                    <div className="role-tabs"><button className={`role-tab ${role === 'seeker' ? 'active' : ''}`} onClick={() => setRole('seeker')}>Job Seeker</button><button className={`role-tab ${role === 'recruiter' ? 'active' : ''}`} onClick={() => setRole('recruiter')}>Recruiter</button></div>
                    <form className="auth-form" onSubmit={handleRegister}>
                        {error && <div style={{ color: 'var(--danger-color, red)', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
                        <div className="input-group"><label>Full Name</label><input className="input-field" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required /></div>
                        {role === 'recruiter' && <div className="input-group"><label>Company Name</label><input className="input-field" placeholder="Acme Corp" /></div>}
                        <div className="input-group"><label>Email</label><input className="input-field" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" required /></div>
                        <div className="input-group"><label>Password</label><div className="password-field"><input className="input-field" name="password" type={showPass ? 'text' : 'password'} value={formData.password} onChange={handleChange} placeholder="Create a strong password" required /><button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>{showPass ? <HiOutlineEyeOff /> : <HiOutlineEye />}</button></div></div>
                        <div className="input-group"><label>Confirm Password</label><input className="input-field" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" required /></div>
                        {role === 'seeker' && <div className="input-group"><label>Phone Number</label><input className="input-field" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" /></div>}
                        {role === 'recruiter' && <><div className="input-group"><label>Company Size</label><select className="select-field"><option>1-10</option><option>11-50</option><option>51-200</option><option>201-500</option><option>500+</option></select></div><div className="input-group"><label>Industry</label><select className="select-field"><option>Technology</option><option>Finance</option><option>Healthcare</option><option>Education</option><option>Other</option></select></div></>}
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}><input type="checkbox" required /> I agree to the <Link to="#" style={{ color: 'var(--white)', fontWeight: '600' }}>Terms & Conditions</Link></label>
                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
                    </form>

                    <div className="auth-divider">or sign up with</div>
                    <div className="social-buttons"><button type="button" className="social-btn" onClick={() => handleSocialLogin('Google')} disabled={loading}><FcGoogle /> Google</button><button type="button" className="social-btn" onClick={() => handleSocialLogin('LinkedIn')} disabled={loading}><FaLinkedinIn color="#0A66C2" /> LinkedIn</button></div>
                    <div className="auth-footer">Already have an account? <Link to="/login">Sign In</Link></div>
                </div>
            </div>
        </div>
    );
};

export default Register;
