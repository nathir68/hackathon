import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineEye, HiOutlineHeart, HiOutlineGlobeAlt, HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineChartBar } from 'react-icons/hi';
import './PublicStyles.css';

const team = [
    { name: 'Alex Rivera', role: 'CEO & Founder', avatar: 'AR' },
    { name: 'Sarah Johnson', role: 'CTO', avatar: 'SJ' },
    { name: 'Michael Chen', role: 'Head of AI', avatar: 'MC' },
    { name: 'Emily Davis', role: 'Head of Design', avatar: 'ED' },
];

const features = [
    { icon: <HiOutlineLightningBolt />, title: 'AI-Powered Matching', desc: 'Our proprietary AI matches candidates with jobs using deep skill analysis' },
    { icon: <HiOutlineShieldCheck />, title: 'Verified Employers', desc: 'Every company on HIRE is verified to ensure safe, legitimate opportunities' },
    { icon: <HiOutlineChartBar />, title: 'Smart Analytics', desc: 'Real-time insights on your applications, interviews, and hiring pipeline' },
    { icon: <HiOutlineGlobeAlt />, title: 'Global Reach', desc: 'Connect with talent and opportunities across 100+ countries worldwide' },
];

const About = () => {
    return (
        <div className="public-page">
            <nav className="public-nav">
                <div className="nav-container">
                    <Link to="/" className="nav-logo"><div className="logo-icon"><HiOutlineSparkles /></div><span>HIRE</span></Link>
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/about" className="nav-link active">About</Link>
                        <Link to="/browse-jobs" className="nav-link">Browse Jobs</Link>
                        <Link to="/contact" className="nav-link">Contact</Link>
                    </div>
                    <div className="nav-actions">
                        <Link to="/login" className="btn btn-ghost">Login</Link>
                        <Link to="/register" className="btn btn-primary">Get Started</Link>
                    </div>
                </div>
            </nav>

            <section className="about-hero">
                <div className="hero-bg-effects"><div className="hero-glow hero-glow-1"></div></div>
                <h1>Connecting <span className="gradient-text">Talent</span> with <span className="gradient-text-accent">Opportunity</span></h1>
                <p>We're on a mission to revolutionize the hiring industry using the power of artificial intelligence.</p>
            </section>

            <section className="section">
                <div className="section-container">
                    <div className="mission-grid">
                        <div className="mission-card">
                            <h3><HiOutlineEye /> Our Mission</h3>
                            <p>To eliminate bias and inefficiency from the hiring process, making it fair, fast, and transparent for everyone. We believe the right talent should find the right opportunity without barriers.</p>
                        </div>
                        <div className="mission-card">
                            <h3><HiOutlineHeart /> Our Vision</h3>
                            <p>A world where every professional can find fulfilling work and every company can build exceptional teams, powered by AI that understands human potential beyond just keywords.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-container">
                    <h2 className="section-title center">Why Choose HIRE?</h2>
                    <p className="section-subtitle center">Built different, designed better</p>
                    <div className="grid-4" style={{ marginTop: '32px' }}>
                        {features.map((f, i) => (
                            <div className="step-card" key={i}>
                                <div className="step-icon-wrap">{f.icon}</div>
                                <h3>{f.title}</h3>
                                <p>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-container">
                    <h2 className="section-title center">Meet the Team</h2>
                    <p className="section-subtitle center">The people building the future of hiring</p>
                    <div className="team-grid">
                        {team.map((t, i) => (
                            <div className="team-card" key={i}>
                                <div className="team-avatar">{t.avatar}</div>
                                <h4>{t.name}</h4>
                                <p>{t.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="public-footer">
                <div className="footer-container">
                    <div className="footer-bottom">
                        <p>&copy; 2026 HIRE. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default About;
