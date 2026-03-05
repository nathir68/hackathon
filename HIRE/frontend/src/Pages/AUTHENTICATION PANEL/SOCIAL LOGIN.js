import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineCheck, HiOutlineExternalLink } from 'react-icons/hi';
import { FcGoogle } from 'react-icons/fc';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import '../public panel/PublicStyles.css';

const providers = [
    { id: 'google', name: 'Google', icon: <FcGoogle size={24} />, desc: 'Sign in with your Google account', connected: true },
    { id: 'linkedin', name: 'LinkedIn', icon: <FaLinkedinIn size={20} color="#0A66C2" />, desc: 'Connect your professional network', connected: false },
    { id: 'github', name: 'GitHub', icon: <FaGithub size={22} />, desc: 'Link your developer profile', connected: false },
];

const SocialLogin = () => {
    const [connected, setConnected] = useState({ google: true, linkedin: false, github: false });

    const toggle = (id) => setConnected(prev => ({ ...prev, [id]: !prev[id] }));

    return (
        <div className="auth-page">
            <div className="auth-left">
                <div className="auth-left-content">
                    <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🔗</div>
                    <h2>Social Login</h2>
                    <p>Connect your social accounts for one-click login. Fast, secure, and seamless.</p>
                </div>
            </div>
            <div className="auth-right">
                <div className="auth-form-container">
                    <Link to="/" className="nav-logo" style={{ marginBottom: '32px', display: 'inline-flex' }}>
                        <div className="logo-icon"><HiOutlineSparkles /></div><span>HIRE</span>
                    </Link>
                    <h2>Connect Accounts</h2>
                    <p className="auth-subtitle">Link your social profiles for quick access</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}>
                        {providers.map(p => (
                            <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', transition: 'all 0.3s' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {p.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{p.name}</div>
                                        <div style={{ fontSize: '0.8rem', color: '#808080' }}>{p.desc}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggle(p.id)}
                                    style={{
                                        padding: '8px 20px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s', display: 'flex', alignItems: 'center', gap: '6px',
                                        background: connected[p.id] ? '#fff' : 'transparent',
                                        color: connected[p.id] ? '#000' : '#A0A0A0',
                                        border: connected[p.id] ? 'none' : '1px solid rgba(255,255,255,0.15)',
                                    }}
                                >
                                    {connected[p.id] ? <><HiOutlineCheck /> Connected</> : <><HiOutlineExternalLink /> Connect</>}
                                </button>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize: '0.8rem', color: '#808080', lineHeight: '1.6' }}>
                            🔒 Your social account data is used only for authentication. We never post on your behalf or access your contacts.
                        </div>
                    </div>

                    <div className="auth-footer" style={{ marginTop: '24px' }}>
                        Back to <Link to="/auth/login">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialLogin;
