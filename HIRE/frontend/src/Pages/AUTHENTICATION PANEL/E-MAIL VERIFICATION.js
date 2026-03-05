import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMail, HiOutlineSparkles } from 'react-icons/hi';
import '../public panel/PublicStyles.css';

const EmailVerification = () => {
    const [timer, setTimer] = useState(30);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const t = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(t);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleResend = () => {
        setTimer(30);
        setCanResend(false);
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: '20px' }}>
            <div className="glass-card" style={{ maxWidth: '480px', width: '100%', textAlign: 'center', padding: '48px 40px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(108,92,231,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem', color: 'var(--primary-light)' }}>
                    <HiOutlineMail />
                </div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '8px' }}>Check Your Email</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '24px', lineHeight: '1.7' }}>
                    We've sent a verification link to<br />
                    <strong style={{ color: 'var(--primary-light)' }}>john@example.com</strong>
                </p>
                <div className="glass-card" style={{ padding: '16px', marginBottom: '24px', background: 'var(--bg-glass)' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        📧 Can't find the email? Check your spam or junk folder.
                    </p>
                </div>
                <button
                    className={`btn ${canResend ? 'btn-primary' : 'btn-secondary'} btn-lg`}
                    style={{ width: '100%', marginBottom: '16px' }}
                    disabled={!canResend}
                    onClick={handleResend}
                >
                    {canResend ? 'Resend Verification Email' : `Resend in ${timer}s`}
                </button>
                <Link to="/auth/login" style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    ← Change Email Address
                </Link>
            </div>
        </div>
    );
};

export default EmailVerification;
