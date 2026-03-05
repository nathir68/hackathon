import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineSparkles, HiOutlineSearch, HiOutlineLocationMarker, HiOutlineCurrencyDollar, HiOutlineClock, HiOutlineBookmark, HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineX } from 'react-icons/hi';
import './PublicStyles.css';
import { getJobs, applyJob } from '../../api';

const allJobs = [
    { title: 'Senior React Developer', company: 'TechCorp', location: 'San Francisco, CA', salary: '$120k - $160k', type: 'Full-time', posted: '2 days ago', logo: 'TC', skills: ['React', 'TypeScript', 'Node.js'] },
    { title: 'Product Designer', company: 'DesignHub', location: 'Remote', salary: '$90k - $130k', type: 'Remote', posted: '1 day ago', logo: 'DH', skills: ['Figma', 'UI/UX', 'Prototyping'] },
    { title: 'Data Scientist', company: 'DataFlow', location: 'New York, NY', salary: '$110k - $150k', type: 'Full-time', posted: '3 days ago', logo: 'DF', skills: ['Python', 'ML', 'SQL'] },
    { title: 'DevOps Engineer', company: 'CloudBase', location: 'Austin, TX', salary: '$100k - $140k', type: 'Full-time', posted: '5 days ago', logo: 'CB', skills: ['AWS', 'Docker', 'Kubernetes'] },
    { title: 'Marketing Manager', company: 'GrowthCo', location: 'Remote', salary: '$80k - $110k', type: 'Remote', posted: '1 day ago', logo: 'GC', skills: ['SEO', 'Analytics', 'Content'] },
    { title: 'Full Stack Developer', company: 'WebScale', location: 'Seattle, WA', salary: '$105k - $145k', type: 'Full-time', posted: '4 days ago', logo: 'WS', skills: ['React', 'Node.js', 'MongoDB'] },
    { title: 'iOS Developer', company: 'AppNova', location: 'Remote', salary: '$95k - $135k', type: 'Remote', posted: '2 days ago', logo: 'AN', skills: ['Swift', 'SwiftUI', 'iOS'] },
    { title: 'Project Manager', company: 'BuildRight', location: 'Chicago, IL', salary: '$85k - $120k', type: 'Full-time', posted: '6 days ago', logo: 'BR', skills: ['Agile', 'Scrum', 'JIRA'] },
];

const BrowseJobs = () => {
    const [search, setSearch] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    // Apply Modal State
    const [selectedJob, setSelectedJob] = useState(null);
    const [resumeFile, setResumeFile] = useState(null);
    const [applying, setApplying] = useState(false);
    const [applyError, setApplyError] = useState('');
    const [applySuccess, setApplySuccess] = useState('');
    const navigate = useNavigate();

    // Check if user is logged in
    const isLoggedIn = !!localStorage.getItem('hire_token');
    const user = JSON.parse(localStorage.getItem('hire_user') || '{}');

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await getJobs();
                setJobs(res.data);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const openApplyModal = (job) => {
        if (!isLoggedIn) {
            navigate('/auth/login');
            return;
        }
        if (user.role !== 'seeker') {
            alert('Only Job Seekers can apply for jobs.');
            return;
        }
        setSelectedJob(job);
        setApplyError('');
        setApplySuccess('');
        setResumeFile(null);
    };

    const handleApply = async (e) => {
        e.preventDefault();
        if (!resumeFile) {
            setApplyError('Please select a resume PDF to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('jobId', selectedJob._id);
        formData.append('resume', resumeFile);

        try {
            setApplying(true);
            setApplyError('');
            await applyJob(formData);
            setApplySuccess('Application submitted successfully!');
            setTimeout(() => {
                setSelectedJob(null);
            }, 2000);
        } catch (error) {
            setApplyError(error.response?.data?.message || 'Failed to submit application.');
        } finally {
            setApplying(false);
        }
    };

    return (
        <div className="public-page">
            <nav className="public-nav">
                <div className="nav-container">
                    <Link to="/" className="nav-logo"><div className="logo-icon"><HiOutlineSparkles /></div><span>HIRE</span></Link>
                    <div className="nav-links">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/about" className="nav-link">About</Link>
                        <Link to="/browse-jobs" className="nav-link active">Browse Jobs</Link>
                        <Link to="/contact" className="nav-link">Contact</Link>
                    </div>
                    <div className="nav-actions">
                        <Link to="/login" className="btn btn-ghost">Login</Link>
                        <Link to="/register" className="btn btn-primary">Get Started</Link>
                    </div>
                </div>
            </nav>

            <section style={{ paddingTop: 'calc(var(--header-height) + 40px)', padding: 'calc(var(--header-height) + 40px) var(--space-xl) var(--space-xl)' }}>
                <div className="section-container">
                    <h1 className="section-title">Browse Jobs</h1>
                    <p className="section-subtitle" style={{ marginBottom: '24px' }}>Find your next career opportunity</p>
                    <div className="browse-layout">
                        <div className="filter-sidebar">
                            <div className="search-bar"><HiOutlineSearch className="search-icon" /><input placeholder="Search jobs..." value={search} onChange={e => setSearch(e.target.value)} /></div>
                            <div className="filter-group glass-card">
                                <h4>Job Type</h4>
                                {['Full-time', 'Part-time', 'Remote', 'Contract', 'Internship'].map(t => (
                                    <label className="filter-option" key={t}><input type="checkbox" /> {t}</label>
                                ))}
                            </div>
                            <div className="filter-group glass-card">
                                <h4>Experience Level</h4>
                                {['Entry Level', 'Mid Level', 'Senior', 'Lead', 'Executive'].map(t => (
                                    <label className="filter-option" key={t}><input type="checkbox" /> {t}</label>
                                ))}
                            </div>
                            <div className="filter-group glass-card">
                                <h4>Salary Range</h4>
                                {['$0 - $50k', '$50k - $100k', '$100k - $150k', '$150k+'].map(t => (
                                    <label className="filter-option" key={t}><input type="checkbox" /> {t}</label>
                                ))}
                            </div>
                        </div>
                        <div className="job-results">
                            <div className="job-results-header">
                                <span className="job-results-count">Showing {jobs.length} jobs</span>
                                <select className="select-field" style={{ width: 'auto' }}>
                                    <option>Sort by: Latest</option>
                                    <option>Sort by: Salary</option>
                                    <option>Sort by: Relevance</option>
                                </select>
                            </div>
                            <div className="job-list">
                                {loading ? (
                                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading jobs...</div>
                                ) : jobs.length === 0 ? (
                                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No jobs found.</div>
                                ) : (
                                    jobs.map((job, i) => (
                                        <div className="job-list-card" key={job._id || i}>
                                            <div className="job-logo">{job.company?.name?.[0] || job.recruiterId?.company?.[0] || 'C'}</div>
                                            <div className="job-info">
                                                <h3>{job.title}</h3>
                                                <div className="company-name">{job.company?.name || job.recruiterId?.company || 'Company'}</div>
                                                <div className="job-tags">
                                                    <span className="chip"><HiOutlineLocationMarker /> {job.location || 'Remote'}</span>
                                                    <span className={`badge ${job.type === 'Remote' ? 'badge-accent' : 'badge-primary'}`}>{job.type || 'Full-time'}</span>
                                                    {(job.skills || []).slice(0, 3).map((s, j) => <span className="chip" key={j}>{s}</span>)}
                                                </div>
                                            </div>
                                            <div className="job-actions">
                                                <span className="salary">{job.salary || 'Negotiable'}</span>
                                                <span className="posted-date"><HiOutlineClock /> {new Date(job.createdAt || Date.now()).toLocaleDateString()}</span>
                                                <div style={{ display: 'flex', gap: '8px' }}>
                                                    <button className="btn btn-icon"><HiOutlineBookmark /></button>
                                                    <button className="btn btn-primary btn-sm" onClick={() => openApplyModal(job)}>Apply</button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="pagination">
                                <button className="page-btn"><HiOutlineChevronLeft /></button>
                                <button className="page-btn active">1</button>
                                <button className="page-btn">2</button>
                                <button className="page-btn">3</button>
                                <button className="page-btn"><HiOutlineChevronRight /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="public-footer">
                <div className="footer-container"><div className="footer-bottom"><p>&copy; 2026 HIRE. All rights reserved.</p></div></div>
            </footer>

            {/* Apply Modal */}
            {selectedJob && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
                    <div className="glass-card" style={{ width: '100%', maxWidth: '500px', background: 'var(--bg-card)', position: 'relative' }}>
                        <button onClick={() => setSelectedJob(null)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '20px' }}><HiOutlineX /></button>
                        <h2 style={{ marginBottom: '8px', fontSize: '24px' }}>Apply for {selectedJob.title}</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>{selectedJob.company?.name || selectedJob.recruiterId?.company} · {selectedJob.location || 'Remote'}</p>

                        {applySuccess ? (
                            <div className="badge badge-primary" style={{ display: 'block', padding: '16px', textAlign: 'center', fontSize: '16px', background: 'var(--success-color)' }}>{applySuccess}</div>
                        ) : (
                            <form onSubmit={handleApply}>
                                <div className="form-group">
                                    <label className="form-label">Upload Resume (PDF)</label>
                                    <input type="file" accept=".pdf" onChange={(e) => setResumeFile(e.target.files[0])} className="input-field" required />
                                </div>
                                {applyError && <div style={{ color: 'var(--danger-color)', marginBottom: '16px', fontSize: '14px' }}>{applyError}</div>}
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                                    <button type="button" className="btn btn-ghost" onClick={() => setSelectedJob(null)}>Cancel</button>
                                    <button type="submit" className="btn btn-primary" disabled={applying}>{applying ? 'Submitting...' : 'Submit Application'}</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrowseJobs;
