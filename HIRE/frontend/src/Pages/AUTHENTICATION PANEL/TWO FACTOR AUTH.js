import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineShieldCheck, HiOutlineDeviceMobile, HiOutlineKey } from 'react-icons/hi';
import '../public panel/PublicStyles.css';

const TwoFactorAuth = () => {
    const [step, setStep] = useState(1);
    const [code, setCode] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    const handleInput = (i, val) => {
        if (val.length > 1) return;
        const newCode = [...code];
        newCode[i] = val;
        setCode(newCode);
        if (val && i < 5) inputRefs.current[i + 1]?.focus();
    };

    const handleKeyDown = (i, e) => {
        if (e.key === 'Backspace' && !code[i] && i > 0) inputRefs.current[i - 1]?.focus();
    };

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-left-content">
                    <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🛡️</div>
                    <h2>Two-Factor Authentication</h2>
                    <p>Add an extra layer of security to your account with authenticator app verification.</p>
                </div>
            </div>
            <div className="auth-right">
                <div className="auth-form-container">
                    <Link to="/" className="nav-logo" style={{ marginBottom: '32px', display: 'inline-flex' }}>
                        <div className="logo-icon"><HiOutlineSparkles /></div><span>HIRE</span>
                    </Link>
                    <h2>Setup 2FA</h2>
                    <p className="auth-subtitle">Secure your account with two-factor authentication</p>

                    {/* Step Indicator */}
                    <div style={{ display: 'flex', gap: '8px', margin: '24px 0', alignItems: 'center' }}>
                        {[1, 2, 3].map(s => (
                            <React.Fragment key={s}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, background: step >= s ? '#fff' : 'rgba(255,255,255,0.06)', color: step >= s ? '#000' : '#555', transition: 'all 0.3s' }}>{s}</div>
                                {s < 3 && <div style={{ flex: 1, height: '2px', background: step > s ? '#fff' : 'rgba(255,255,255,0.08)' }} />}
                            </React.Fragment>
                        ))}
                    </div>

                    {step === 1 && (
                        <div style={{ marginTop: '16px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: '#D3D3D3' }}><HiOutlineDeviceMobile /></div>
                                    <div><div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Install Authenticator App</div><div style={{ fontSize: '0.8rem', color: '#808080' }}>Download Google Authenticator or Authy on your phone</div></div>
                                </div>
                                <div style={{ padding: '20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', color: '#D3D3D3' }}><HiOutlineShieldCheck /></div>
                                    <div><div style={{ fontWeight: 600, fontSize: '0.95rem' }}>Enhanced Security</div><div style={{ fontSize: '0.8rem', color: '#808080' }}>Even if your password is compromised, your account stays safe</div></div>
                                </div>
                            </div>
                            <button className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '24px' }} onClick={() => setStep(2)}>Continue Setup</button>
                        </div>
                    )}

                    {step === 2 && (
                        <div style={{ marginTop: '16px' }}>
                            <div style={{ padding: '32px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', textAlign: 'center', marginBottom: '20px' }}>
                                <div style={{ width: '180px', height: '180px', background: 'white', borderRadius: '12px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ width: '150px', height: '150px', background: 'repeating-conic-gradient(#000 0% 25%, #fff 25% 50%)', backgroundSize: '15px 15px', borderRadius: '4px' }} />
                                </div>
                                <p style={{ fontSize: '0.85rem', color: '#A0A0A0' }}>Scan this QR code with your authenticator app</p>
                            </div>
                            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.04)', borderRadius: '8px', textAlign: 'center', fontSize: '0.8rem', color: '#808080', marginBottom: '20px' }}>
                                <div style={{ fontWeight: 600, color: '#A0A0A0', marginBottom: '4px' }}>Manual Entry Key</div>
                                <code style={{ fontFamily: 'monospace', fontSize: '0.9rem', letterSpacing: '2px', color: '#fff' }}>JBSW-Y3DP-EHPK-3PXP</code>
                            </div>
                            <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={() => setStep(3)}>I've Scanned the Code</button>
                        </div>
                    )}

                    {step === 3 && (
                        <div style={{ marginTop: '16px' }}>
                            <p style={{ fontSize: '0.9rem', color: '#A0A0A0', marginBottom: '24px', textAlign: 'center' }}>Enter the 6-digit code from your authenticator app</p>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '24px' }}>
                                {code.map((d, i) => (
                                    <input
                                        key={i} ref={el => inputRefs.current[i] = el} type="text" maxLength={1} value={d}
                                        onChange={e => handleInput(i, e.target.value)} onKeyDown={e => handleKeyDown(i, e)}
                                        style={{ width: '50px', height: '60px', textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff', outline: 'none', transition: 'all 0.3s' }}
                                    />
                                ))}
                            </div>
                            <button className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                                <HiOutlineKey style={{ marginRight: '8px' }} /> Verify & Enable 2FA
                            </button>
                            <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#808080' }}>
                                <HiOutlineShieldCheck /> Recovery codes will be generated after verification
                            </div>
                        </div>
                    )}

                    <div className="auth-footer" style={{ marginTop: '24px' }}>
                        <Link to="/auth/login">← Back to Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TwoFactorAuth;
