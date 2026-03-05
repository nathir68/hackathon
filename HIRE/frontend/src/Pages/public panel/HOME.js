import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getJobs } from '../../api';
import { HiOutlineSparkles, HiOutlineSearch, HiOutlineBriefcase, HiOutlineUserGroup, HiOutlineLightningBolt, HiOutlineChevronRight, HiOutlineStar, HiOutlineLocationMarker, HiOutlineCurrencyDollar, HiOutlineMail } from 'react-icons/hi';
import './PublicStyles.css';

const testimonials = [];

// Testimonials removed since they were dummy data

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [featuredJobs, setFeaturedJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await getJobs();
                setFeaturedJobs(res.data.slice(0, 6)); // Show max 6 real jobs
            } catch (err) {
                console.error("Failed to fetch featured jobs:", err);
            }
        };
        fetchJobs();
    }, []);

    return (
        <div className="public-page">
            <nav className="public-nav">
                <div className="nav-container">
                    <Link to="/" className="nav-logo"><div className="logo-icon"><HiOutlineSparkles /></div><span>HIRE</span></Link>
                    <div className="nav-links">
                        <Link to="/" className="nav-link active">Home</Link>
                        <Link to="/about" className="nav-link">About</Link>
                        <Link to="/browse-jobs" className="nav-link">Browse Jobs</Link>
                        <Link to="/contact" className="nav-link">Contact</Link>
                    </div>
                    <div className="nav-actions">
                        <Link to="/login" className="btn btn-ghost">Login</Link>
                        <Link to="/register" className="btn btn-primary">Get Started</Link>
                    </div>
                </div>
            </nav>

            <section className="hero-section">
                <div className="hero-bg-effects"><div className="hero-glow hero-glow-1"></div><div className="hero-glow hero-glow-2"></div></div>
                <div className="hero-content">
                    <div className="hero-badge"><HiOutlineLightningBolt /> AI-Powered Hiring Platform</div>
                    <h1 className="hero-title">Find Your Dream Job<br />or Hire Top Talent</h1>
                    <p className="hero-subtitle">Connect with 50,000+ job seekers and 5,000+ companies. Let our AI match you with the perfect opportunity.</p>
                    <div className="hero-search">
                        <div className="hero-search-box">
                            <HiOutlineSearch className="search-icon" />
                            <input type="text" placeholder="Job title, keywords, or company..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                            <select className="search-select"><option>All Locations</option><option>Remote</option><option>San Francisco</option><option>New York</option></select>
                            <button className="btn btn-primary">Search</button>
                        </div>
                        <div className="hero-popular">Popular: <span className="hero-tag">React</span><span className="hero-tag">Python</span><span className="hero-tag">Remote</span><span className="hero-tag">Design</span></div>
                    </div>
                    <div className="hero-ctas">
                        <Link to="/browse-jobs" className="btn btn-primary btn-lg"><HiOutlineBriefcase /> Find Jobs</Link>
                        <Link to="/register" className="btn btn-secondary btn-lg">Post a Job <HiOutlineChevronRight /></Link>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-container">
                    <h2 className="section-title center">How It Works</h2>
                    <p className="section-subtitle center">Get started in 3 simple steps</p>
                    <div className="steps-grid">
                        {[
                            { icon: <HiOutlineUserGroup />, num: '01', title: 'Create Your Profile', desc: 'Sign up and build your professional profile. Our AI analyzes your skills.' },
                            { icon: <HiOutlineSearch />, num: '02', title: 'Search & Apply', desc: 'Browse AI-recommended jobs tailored to your profile. Apply with one click.' },
                            { icon: <HiOutlineBriefcase />, num: '03', title: 'Get Hired', desc: 'Prepare with AI interview tools and land your dream job faster.' }
                        ].map((s, i) => (
                            <div className="step-card" key={i}><div className="step-number">{s.num}</div><div className="step-icon-wrap">{s.icon}</div><h3>{s.title}</h3><p>{s.desc}</p></div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section stats-section">
                <div className="section-container">
                    <div className="stats-grid">
                        {[['10,000+', 'Jobs Posted'], ['5,000+', 'Companies'], ['50,000+', 'Job Seekers'], ['95%', 'Success Rate']].map(([n, t], i) => (
                            <div className="stat-item" key={i}><div className="stat-number">{n}</div><div className="stat-text">{t}</div></div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-container">
                    <div className="section-header"><div><h2 className="section-title">Featured Jobs</h2><p className="section-subtitle">Handpicked opportunities from top companies</p></div><Link to="/browse-jobs" className="btn btn-secondary">View All <HiOutlineChevronRight /></Link></div>
                    <div className="jobs-grid">
                        {featuredJobs.map((job, i) => (
                            <div className="job-card glass-card" key={i}>
                                <div className="job-card-header"><div className="job-logo">{job.title[0]}</div><span className="badge badge-outline">{job.type || 'Full-time'}</span></div>
                                <h3 className="job-title">{job.title}</h3>
                                <p className="job-company">{job.company || 'Company'}</p>
                                <div className="job-meta"><span><HiOutlineLocationMarker /> {job.location || 'Remote'}</span><span><HiOutlineCurrencyDollar /> {job.salary || 'Negotiable'}</span></div>
                                <button className="btn btn-primary" style={{ width: '100%', marginTop: '12px' }}>Apply Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-container">
                    <h2 className="section-title center">What People Say</h2>
                    <p className="section-subtitle center">Trusted by thousands of professionals</p>
                    <div className="testimonial-grid">
                        {testimonials.map((t, i) => (
                            <div className="testimonial-card glass-card" key={i}>
                                <div className="testimonial-stars">{[...Array(5)].map((_, j) => <HiOutlineStar key={j} />)}</div>
                                <p className="testimonial-text">"{t.text}"</p>
                                <div className="testimonial-author"><div className="avatar">{t.avatar}</div><div><div className="author-name">{t.name}</div><div className="author-role">{t.role}</div></div></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section"><div className="section-container"><div className="cta-card"><h2>Ready to Take the Next Step?</h2><p>Join thousands of professionals who found their dream careers through HIRE.</p><div className="cta-actions"><Link to="/register" className="btn btn-primary btn-lg">Create Free Account</Link><Link to="/browse-jobs" className="btn btn-secondary btn-lg">Browse Jobs</Link></div></div></div></section>

            <footer className="public-footer">
                <div className="footer-container">
                    <div className="footer-grid">
                        <div className="footer-col"><div className="footer-logo"><div className="logo-icon"><HiOutlineSparkles /></div><span>HIRE</span></div><p className="footer-desc">AI-powered job platform connecting talent with opportunity.</p><div className="footer-newsletter"><input type="email" placeholder="Enter your email" className="input-field" /><button className="btn btn-primary"><HiOutlineMail /></button></div></div>
                        <div className="footer-col"><h4>For Job Seekers</h4><Link to="/browse-jobs">Browse Jobs</Link><Link to="/register">Create Profile</Link><Link to="#">AI Resume Builder</Link><Link to="#">Career Guide</Link></div>
                        <div className="footer-col"><h4>For Employers</h4><Link to="/register">Post a Job</Link><Link to="#">AI Screening</Link><Link to="#">Pricing</Link><Link to="#">Enterprise</Link></div>
                        <div className="footer-col"><h4>Company</h4><Link to="/about">About Us</Link><Link to="/contact">Contact</Link><Link to="#">Privacy Policy</Link><Link to="#">Terms</Link></div>
                    </div>
                    <div className="footer-bottom"><p>&copy; 2026 HIRE. All rights reserved.</p></div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
