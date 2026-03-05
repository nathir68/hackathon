import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlineClock, HiOutlineChevronDown } from 'react-icons/hi';
import './PublicStyles.css';

const faqs = [
    { q: 'How do I create an account on HIRE?', a: 'Click "Get Started" on the homepage, choose your role (Job Seeker or Recruiter), fill in your details, and verify your email. It takes less than 2 minutes!' },
    { q: 'Is HIRE free to use for job seekers?', a: 'Yes! Job seekers can create profiles, browse jobs, apply to positions, and use basic AI features completely free.' },
    { q: 'How does the AI matching work?', a: 'Our AI analyzes your skills, experience, preferences, and resume to match you with the most relevant job openings. The more complete your profile, the better the matches.' },
    { q: 'Can I post jobs as a recruiter?', a: 'Absolutely! Create a recruiter account, set up your company profile, and start posting jobs. We offer free and premium plans with AI screening features.' },
    { q: 'How do I contact support?', a: 'You can reach us via the contact form on this page, email us at support@hire.com, or call us during business hours. We typically respond within 24 hours.' },
];

const ContactUs = () => {
    const [openFaq, setOpenFaq] = useState(null);

    return (
        <div className="public-page">
            <nav className="public-nav">
                <div className="nav-container">
                    <Link to="/" className="nav-logo"><div className="logo-icon"><HiOutlineSparkles /></div><span>HIRE</span></Link>
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/about" className="nav-link">About</Link>
                        <Link to="/browse-jobs" className="nav-link">Browse Jobs</Link>
                        <Link to="/contact" className="nav-link active">Contact</Link>
                    </div>
                    <div className="nav-actions">
                        <Link to="/login" className="btn btn-ghost">Login</Link>
                        <Link to="/register" className="btn btn-primary">Get Started</Link>
                    </div>
                </div>
            </nav>

            <section className="about-hero">
                <div className="hero-bg-effects"><div className="hero-glow hero-glow-1"></div></div>
                <h1>Get in <span className="gradient-text">Touch</span></h1>
                <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            </section>

            <section className="section">
                <div className="section-container">
                    <div className="contact-grid">
                        <div className="contact-form-wrap">
                            <h3 style={{ marginBottom: '20px' }}>Send us a Message</h3>
                            <form className="auth-form" onSubmit={e => e.preventDefault()}>
                                <div className="input-group"><label>Full Name</label><input className="input-field" placeholder="John Doe" /></div>
                                <div className="input-group"><label>Email</label><input className="input-field" type="email" placeholder="john@example.com" /></div>
                                <div className="input-group"><label>Subject</label>
                                    <select className="select-field">
                                        <option>General Inquiry</option>
                                        <option>Technical Support</option>
                                        <option>Billing</option>
                                        <option>Partnership</option>
                                        <option>Report a Bug</option>
                                    </select>
                                </div>
                                <div className="input-group"><label>Message</label><textarea className="textarea-field" placeholder="Write your message here..." rows={5}></textarea></div>
                                <button className="btn btn-primary btn-lg" style={{ width: '100%' }}>Send Message</button>
                            </form>
                        </div>
                        <div className="contact-info-wrap">
                            <div className="contact-info-card">
                                <div className="info-icon"><HiOutlineMail /></div>
                                <div><h4>Email Us</h4><p>support@hire.com</p><p>careers@hire.com</p></div>
                            </div>
                            <div className="contact-info-card">
                                <div className="info-icon"><HiOutlinePhone /></div>
                                <div><h4>Call Us</h4><p>+1 (555) 123-4567</p><p>Mon - Fri, 9am - 6pm EST</p></div>
                            </div>
                            <div className="contact-info-card">
                                <div className="info-icon"><HiOutlineLocationMarker /></div>
                                <div><h4>Visit Us</h4><p>123 Innovation Drive</p><p>San Francisco, CA 94107</p></div>
                            </div>
                            <div className="contact-info-card">
                                <div className="info-icon"><HiOutlineClock /></div>
                                <div><h4>Business Hours</h4><p>Monday - Friday: 9AM - 6PM</p><p>Saturday: 10AM - 2PM</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="section-container">
                    <h2 className="section-title center">Frequently Asked Questions</h2>
                    <div className="faq-list">
                        {faqs.map((faq, i) => (
                            <div className="faq-item" key={i}>
                                <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                    {faq.q} <HiOutlineChevronDown style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: '0.3s' }} />
                                </button>
                                {openFaq === i && <div className="faq-answer">{faq.a}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="public-footer">
                <div className="footer-container"><div className="footer-bottom"><p>&copy; 2026 HIRE. All rights reserved.</p></div></div>
            </footer>
        </div>
    );
};

export default ContactUs;
