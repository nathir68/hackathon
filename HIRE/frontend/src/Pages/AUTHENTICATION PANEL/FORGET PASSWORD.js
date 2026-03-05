import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineKey, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import '../public panel/PublicStyles.css';

const ForgetPassword = () => {
    const [step, setStep] = useState(0);
    const [showPass, setShowPass] = useState(false);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: '20px' }}>
            <div className="glass-card" style={{ maxWidth: '480px', width: '100%', textAlign: 'center', padding: '48px 40px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem', color: 'var(--grey-300)' }}><HiOutlineKey /></div>
                {step === 0 && <><h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Forgot Password?</h2><p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '24px' }}>Enter your email and we'll send a reset link.</p><form className="auth-form" onSubmit={e => { e.preventDefault(); setStep(1) }}><div className="input-group"><label style={{ textAlign: 'left' }}>Email Address</label><input className="input-field" type="email" placeholder="name@company.com" /></div><button className="btn btn-primary btn-lg" style={{ width: '100%' }}>Send Reset Link</button></form></>}
                {step === 1 && <><h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Check Your Email</h2><p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '24px' }}>We've sent a password reset link to your email.</p><button className="btn btn-secondary btn-lg" style={{ width: '100%', marginBottom: '12px' }}>Resend Email</button><button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => setStep(2)}>Set New Password</button></>}
                {step === 2 && <><h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>Set New Password</h2><p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '24px' }}>Create a strong new password.</p><form className="auth-form" onSubmit={e => e.preventDefault()}><div className="input-group"><label style={{ textAlign: 'left' }}>New Password</label><div className="password-field"><input className="input-field" type={showPass ? 'text' : 'password'} placeholder="Enter new password" /><button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)}>{showPass ? <HiOutlineEyeOff /> : <HiOutlineEye />}</button></div></div><div className="input-group"><label style={{ textAlign: 'left' }}>Confirm Password</label><input className="input-field" type="password" placeholder="Confirm password" /></div><div style={{ display: 'flex', gap: '4px' }}>{[1, 2, 3, 4].map(i => <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', background: i <= 3 ? 'var(--white)' : 'var(--grey-800)' }}></div>)}</div><button className="btn btn-primary btn-lg" style={{ width: '100%' }}>Reset Password</button></form></>}
                <Link to="/auth/login" style={{ display: 'block', marginTop: '20px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>← Back to Login</Link>
            </div>
        </div>
    );
};

export default ForgetPassword;
