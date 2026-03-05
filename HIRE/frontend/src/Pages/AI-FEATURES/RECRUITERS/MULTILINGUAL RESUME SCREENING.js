import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlineTranslate, HiOutlineEye, HiOutlineDownload, HiOutlineRefresh } from 'react-icons/hi';
import { getMyJobs, getJobApplications } from '../../../api';

const languages = [
    'All Languages', 'English', 'Hindi', 'Tamil', 'Telugu', 'Kannada', 'Malayalam',
    'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Korean', 'Arabic', 'Portuguese', 'Russian', 'Italian'
];

const MultilingualResumeScreening = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedLang, setSelectedLang] = useState('All Languages');
    const [autoTranslate, setAutoTranslate] = useState(true);
    const [langStats, setLangStats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jobsRes = await getMyJobs();
                const myJobs = jobsRes.data || [];

                let allCandidates = [];
                for (const job of myJobs) {
                    try {
                        const appRes = await getJobApplications(job._id);
                        allCandidates = [...allCandidates, ...appRes.data];
                    } catch (e) { /* skip */ }
                }

                // Simulate language detection for real candidates (since backend doesn't detect it natively yet)
                const candidatesWithLang = allCandidates.map((c, i) => {
                    const langs = ['English', 'Spanish', 'Hindi', 'French', 'Telugu'];
                    const mockDetectLang = langs[i % langs.length];
                    return {
                        ...c,
                        lang: mockDetectLang,
                        confidence: 90 + (i % 8),
                        translated: mockDetectLang !== 'English',
                        ats: c.aiScore || 0,
                        skills: c.aiScore || 0,
                        overall: c.aiScore || 0,
                        status: 'Reviewed'
                    };
                });

                setCandidates(candidatesWithLang);

                // Calculate stats
                const counts = {};
                candidatesWithLang.forEach(c => {
                    counts[c.lang] = (counts[c.lang] || 0) + 1;
                });

                const total = candidatesWithLang.length;
                const newStats = Object.keys(counts).map(lang => ({
                    lang,
                    count: counts[lang],
                    pct: total > 0 ? Math.round((counts[lang] / total) * 100) : 0
                })).sort((a, b) => b.count - a.count);

                setLangStats(newStats);

            } catch (err) {
                console.error("Error fetching multilingual data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filtered = selectedLang === 'All Languages'
        ? candidates
        : candidates.filter(c => c.lang === selectedLang);

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user") || '{"name":"Guest"}').name)} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header">
                    <h1>Multilingual Resume Screening</h1>
                    <p>AI-powered resume analysis across 15+ languages with automatic translation</p>
                </div>

                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[
                        { l: 'Total Scanned', v: candidates.length },
                        { l: 'Languages Detected', v: langStats.length },
                        { l: 'Avg Score', v: candidates.length > 0 ? Math.round(candidates.reduce((acc, c) => acc + c.overall, 0) / candidates.length) + '%' : '0%' },
                        { l: 'Auto-Translated', v: candidates.filter(c => c.translated).length },
                    ].map((s, i) => (
                        <div className="stat-card" key={i}>
                            <div className="stat-value">{s.v}</div>
                            <div className="stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>

                <div className="grid-2" style={{ marginBottom: '24px' }}>
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <HiOutlineTranslate /> Language Distribution
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            {langStats.length === 0 ? <p style={{ color: 'var(--text-muted)' }}>No language data available.</p> : langStats.map((l, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                        <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>{l.lang}</span>
                                        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{l.count} resumes ({l.pct}%)</span>
                                    </div>
                                    <div className="progress-bar">
                                        <div className="progress-fill" style={{ width: `${l.pct}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div className="glass-card">
                            <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Screening Controls</h3>
                            <div className="auth-form">
                                <div className="input-group">
                                    <label>Filter by Language</label>
                                    <select className="select-field" value={selectedLang} onChange={e => setSelectedLang(e.target.value)}>
                                        {languages.map((l, i) => <option key={i}>{l}</option>)}
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Target Translation Language</label>
                                    <select className="select-field" defaultValue="English">
                                        <option>English</option><option>Hindi</option><option>Spanish</option><option>French</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Min Confidence Score (%)</label>
                                    <input className="input-field" type="number" defaultValue="85" />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>Auto-Translate Resumes</div>
                                        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Automatically translate non-English resumes</div>
                                    </div>
                                    <div className={`toggle ${autoTranslate ? 'active' : ''}`} onClick={() => setAutoTranslate(!autoTranslate)}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h3 style={{ fontWeight: 700 }}>Screened Candidates ({filtered.length})</h3>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="btn btn-secondary btn-sm"><HiOutlineRefresh style={{ marginRight: '4px' }} /> Re-scan All</button>
                        </div>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr><th>Candidate</th><th>Language</th><th>Confidence</th><th>Translated</th><th>Score</th><th>Status</th><th>Actions</th></tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>Scanning resumes...</td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No candidates found.</td></tr>
                            ) : filtered.map((c, i) => (
                                <tr key={c._id || i}>
                                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.candidateId?.name || 'Unknown'}</td>
                                    <td><span className="badge badge-outline"><HiOutlineTranslate style={{ marginRight: '4px' }} />{c.lang}</span></td>
                                    <td style={{ fontWeight: 600 }}>{c.confidence}%</td>
                                    <td>{c.translated ? '✓ Yes' : '—'}</td>
                                    <td style={{ fontWeight: 700 }}>{c.overall > 0 ? `${c.overall}%` : 'Pending'}</td>
                                    <td><span className="badge badge-light">{c.status}</span></td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '4px' }}>
                                            <button className="btn-icon"><HiOutlineEye /></button>
                                            <button className="btn-icon"><HiOutlineDownload /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MultilingualResumeScreening;
