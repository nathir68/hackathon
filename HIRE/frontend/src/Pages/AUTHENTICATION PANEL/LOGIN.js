import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedinIn } from 'react-icons/fa';
import '../public panel/PublicStyles.css';
import { login } from '../../api';

const AuthLogin = () => {
    const [showPass, setShowPass] = useState(false);
    const [role, setRole] = useState('seeker');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await login({ email, password, role });
            const { token, ...user } = res.data;
            localStorage.setItem('hire_token', token);
            localStorage.setItem('hire_user', JSON.stringify(user));

            if (res.data.role === 'admin') navigate('/admin/dashboard');
            else if (res.data.role === 'recruiter') navigate('/recruiter/dashboard');
            else navigate('/seeker/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider) => {
        const socialEmail = prompt(`[Prototype] Please enter an email to login with ${provider}:`, `user@${provider.toLowerCase()}.com`);
        if (!socialEmail) return;
        setLoading(true);
        try {
            let res;
            try {
                res = await login({ email: socialEmail, password: 'SocialAuthPassword123!', role });
            } catch (loginErr) {
                // To support social logins for user that doesnt exist yet, mock creating an account
                const { signup } = require('../../api');
                res = await signup({ name: socialEmail.split('@')[0], email: socialEmail, password: 'SocialAuthPassword123!', role });
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
                    <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🔐</div>
                    <h2>Secure Login</h2>
                    <p>Access your dashboard, manage applications, and connect with opportunities.</p>
                </div>
            </div>
            <div className="auth-right">
                <div className="auth-form-container">
                    <Link to="/" className="nav-logo" style={{ marginBottom: '32px', display: 'inline-flex' }}>
                        <div className="logo-icon"><HiOutlineSparkles /></div><span>HIRE</span>
                    </Link>
                    <h2>Welcome Back</h2>
                    <p className="auth-subtitle">Sign in to your account</p>
                    <div className="role-tabs">
                        <button className={`role-tab ${role === 'admin' ? 'active' : ''}`} onClick={() => setRole('admin')}>Admin</button>
                        <button className={`role-tab ${role === 'seeker' ? 'active' : ''}`} onClick={() => setRole('seeker')}>Seeker</button>
                        <button className={`role-tab ${role === 'recruiter' ? 'active' : ''}`} onClick={() => setRole('recruiter')}>Recruiter</button>
                    </div>
                    <form className="auth-form" onSubmit={handleLogin}>
                        {error && <div style={{ color: 'var(--danger, red)', marginBottom: '1rem', fontSize: '0.875rem' }}>{error}</div>}
                        <div className="input-group">
                            <label>Email</label>
                            <input
                                className="input-field"
                                type="email"
                                placeholder={
                                    role === 'admin' ? 'nathirvkp@gmail.com' :
                                        role === 'seeker' ? 'gokulspt40@gmail.com' :
                                            'nandhiniraja2408@gmail.com'
                                }
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label>Password</label>
                            <div className="password-field">
                                <input
                                    className="input-field"
                                    type={showPass ? 'text' : 'password'}
                                    placeholder={
                                        role === 'admin' ? 'natsah0608' :
                                            role === 'seeker' ? 'gokul111' :
                                                'nandhu123'
                                    }
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>{showPass ? <HiOutlineEyeOff /> : <HiOutlineEye />}</button>
                            </div>
                        </div>
                        <div className="auth-options">
                            <label><input type="checkbox" /> Remember me</label>
                            <Link to="/auth/forgot-password">Forgot Password?</Link>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                    <div className="auth-divider">or continue with</div>
                    <div className="social-buttons">
                        <button type="button" className="social-btn" onClick={() => handleSocialLogin('Google')} disabled={loading}><FcGoogle /> Google</button>
                        <button type="button" className="social-btn" onClick={() => handleSocialLogin('LinkedIn')} disabled={loading}><FaLinkedinIn color="#0A66C2" /> LinkedIn</button>
                    </div>
                    <div className="auth-footer">Don't have an account? <Link to="/auth/signup">Sign Up</Link></div>
                </div>
            </div>
        </div>
    );
};

export default AuthLogin;
