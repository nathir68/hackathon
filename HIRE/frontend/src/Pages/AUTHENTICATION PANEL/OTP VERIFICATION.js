import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShieldCheck } from 'react-icons/hi';
import '../public panel/PublicStyles.css';

const OtpVerification = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(60);
    const refs = useRef([]);

    useEffect(() => { if (timer > 0) { const t = setTimeout(() => setTimer(timer - 1), 1000); return () => clearTimeout(t); } }, [timer]);

    const handleChange = (i, val) => {
        if (val.length > 1) return;
        const n = [...otp]; n[i] = val; setOtp(n);
        if (val && i < 5) refs.current[i + 1]?.focus();
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: '20px' }}>
            <div className="glass-card" style={{ maxWidth: '480px', width: '100%', textAlign: 'center', padding: '48px 40px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem', color: 'var(--grey-300)' }}><HiOutlineShieldCheck /></div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>OTP Verification</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '32px' }}>Enter the 6-digit code sent to your email</p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '32px' }}>
                    {otp.map((d, i) => (
                        <input key={i} ref={el => refs.current[i] = el} type="text" maxLength="1" value={d}
                            onChange={e => handleChange(i, e.target.value)}
                            onKeyDown={e => { if (e.key === 'Backspace' && !otp[i] && i > 0) refs.current[i - 1]?.focus(); }}
                            style={{ width: '52px', height: '60px', textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, background: 'var(--bg-input)', border: `2px solid ${d ? 'var(--white)' : 'var(--border-color)'}`, borderRadius: '12px', color: 'var(--text-primary)', outline: 'none', transition: 'all 0.3s' }}
                        />
                    ))}
                </div>
                <button className="btn btn-primary btn-lg" style={{ width: '100%', marginBottom: '16px' }}>Verify Code</button>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Didn't receive? {timer > 0 ? <span>Resend in {timer}s</span> : <button onClick={() => setTimer(60)} style={{ background: 'none', color: 'var(--white)', fontWeight: 600, cursor: 'pointer' }}>Resend OTP</button>}
                </p>
                <Link to="/auth/login" style={{ display: 'block', marginTop: '16px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>← Back to Login</Link>
            </div>
        </div>
    );
};

export default OtpVerification;
