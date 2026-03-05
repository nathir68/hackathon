import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlinePencil, HiOutlineEye, HiOutlineTrash, HiOutlinePlus, HiOutlineCheck } from 'react-icons/hi';

const tests = [
    { name: 'Logical Reasoning – General', job: 'Senior React Developer', questions: 25, time: '30 min', difficulty: 'Medium', completions: 45, avgScore: 78, status: 'Active' },
    { name: 'JavaScript Proficiency', job: 'Senior React Developer', questions: 30, time: '40 min', difficulty: 'Hard', completions: 38, avgScore: 72, status: 'Active' },
    { name: 'React.js Advanced', job: 'Senior React Developer', questions: 20, time: '35 min', difficulty: 'Hard', completions: 32, avgScore: 81, status: 'Active' },
    { name: 'Communication Skills', job: 'Marketing Manager', questions: 15, time: '20 min', difficulty: 'Easy', completions: 22, avgScore: 85, status: 'Active' },
    { name: 'Data Analysis Basics', job: 'Data Analyst', questions: 25, time: '30 min', difficulty: 'Medium', completions: 0, avgScore: 0, status: 'Draft' },
    { name: 'Python – Intermediate', job: 'Backend Engineer', questions: 20, time: '30 min', difficulty: 'Medium', completions: 15, avgScore: 69, status: 'Paused' },
];

const candidateResults = [
    { name: 'Alice Johnson', test: 'JavaScript Proficiency', score: 92, time: '32 min', date: 'Mar 3', status: 'Passed' },
    { name: 'Bob Williams', test: 'Logical Reasoning – General', score: 85, time: '28 min', date: 'Mar 3', status: 'Passed' },
    { name: 'Carol Smith', test: 'React.js Advanced', score: 78, time: '34 min', date: 'Mar 2', status: 'Passed' },
    { name: 'David Brown', test: 'JavaScript Proficiency', score: 55, time: '40 min', date: 'Mar 2', status: 'Failed' },
    { name: 'Emma Davis', test: 'Communication Skills', score: 90, time: '15 min', date: 'Mar 1', status: 'Passed' },
];

const AptitudeTestManagement = () => {
    const [tab, setTab] = useState(0);
    const [showCreate, setShowCreate] = useState(false);

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div><h1>Aptitude Test Management</h1><p>Create and manage aptitude tests for your job postings</p></div>
                    <button className="btn btn-primary" onClick={() => setShowCreate(!showCreate)}><HiOutlinePlus /> Create Test</button>
                </div>

                {/* Stats */}
                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[
                        { l: 'Total Tests', v: '6' },
                        { l: 'Active Tests', v: '4' },
                        { l: 'Total Completions', v: '152' },
                        { l: 'Avg Pass Rate', v: '76%' },
                    ].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-value">{s.v}</div><div className="stat-label">{s.l}</div></div>
                    ))}
                </div>

                {/* Create Test Form */}
                {showCreate && (
                    <div className="glass-card" style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Create New Aptitude Test</h3>
                        <div className="auth-form">
                            <div className="grid-2" style={{ gap: '16px' }}>
                                <div className="input-group"><label>Test Name</label><input className="input-field" placeholder="e.g. JavaScript Advanced" /></div>
                                <div className="input-group"><label>Assign to Job</label>
                                    <select className="select-field"><option>Senior React Developer</option><option>Backend Engineer</option><option>Data Analyst</option><option>Marketing Manager</option></select>
                                </div>
                                <div className="input-group"><label>Category</label>
                                    <select className="select-field"><option>Logical Reasoning</option><option>Verbal Ability</option><option>Quantitative</option><option>Technical</option><option>Personality</option><option>Communication</option></select>
                                </div>
                                <div className="input-group"><label>Difficulty</label>
                                    <select className="select-field"><option>Easy</option><option>Medium</option><option>Hard</option></select>
                                </div>
                                <div className="input-group"><label>Number of Questions</label><input className="input-field" type="number" defaultValue="20" /></div>
                                <div className="input-group"><label>Time Limit (minutes)</label><input className="input-field" type="number" defaultValue="30" /></div>
                                <div className="input-group"><label>Pass Score (%)</label><input className="input-field" type="number" defaultValue="60" /></div>
                                <div className="input-group"><label>Max Attempts</label><input className="input-field" type="number" defaultValue="1" /></div>
                            </div>
                            <div className="input-group" style={{ marginTop: '16px' }}><label>Instructions for Candidates</label>
                                <textarea className="textarea-field" rows={4} defaultValue="Answer all questions within the given time. Each question carries equal marks. There is no negative marking. Do not switch tabs during the test." />
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                                <button className="btn btn-primary"><HiOutlineCheck /> Create Test</button>
                                <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabs */}
                <div className="tabs" style={{ marginBottom: '24px' }}>
                    {['All Tests', 'Candidate Results'].map((t, i) => (
                        <button key={i} className={`tab ${tab === i ? 'active' : ''}`} onClick={() => setTab(i)}>{t}</button>
                    ))}
                </div>

                {/* Tab: All Tests */}
                {tab === 0 && (
                    <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table className="data-table">
                            <thead>
                                <tr><th>Test Name</th><th>Job Posting</th><th>Questions</th><th>Time</th><th>Difficulty</th><th>Completions</th><th>Avg Score</th><th>Status</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {tests.map((t, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.name}</td>
                                        <td>{t.job}</td>
                                        <td>{t.questions}</td>
                                        <td>{t.time}</td>
                                        <td><span className="badge badge-outline">{t.difficulty}</span></td>
                                        <td>{t.completions}</td>
                                        <td style={{ fontWeight: 700 }}>{t.avgScore > 0 ? `${t.avgScore}%` : '—'}</td>
                                        <td>
                                            <span className={`badge ${t.status === 'Active' ? 'badge-light' : t.status === 'Draft' ? 'badge-outline' : 'badge-warning'}`}>
                                                {t.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                                <button className="btn-icon"><HiOutlineEye /></button>
                                                <button className="btn-icon"><HiOutlinePencil /></button>
                                                <button className="btn-icon"><HiOutlineTrash /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Tab: Candidate Results */}
                {tab === 1 && (
                    <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table className="data-table">
                            <thead>
                                <tr><th>Candidate</th><th>Test</th><th>Score</th><th>Time Taken</th><th>Date</th><th>Status</th><th>Actions</th></tr>
                            </thead>
                            <tbody>
                                {candidateResults.map((r, i) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.name}</td>
                                        <td>{r.test}</td>
                                        <td style={{ fontWeight: 700 }}>{r.score}%</td>
                                        <td>{r.time}</td>
                                        <td>{r.date}</td>
                                        <td>
                                            <span className={`badge ${r.status === 'Passed' ? 'badge-light' : 'badge-warning'}`}>
                                                {r.status}
                                            </span>
                                        </td>
                                        <td><button className="btn-icon"><HiOutlineEye /></button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AptitudeTestManagement;

