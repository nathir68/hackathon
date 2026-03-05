import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { seekerLinks } from '../../Components/SidebarLinks';
import { HiOutlineClock, HiOutlineChevronRight, HiOutlineChevronLeft, HiOutlineCheck } from 'react-icons/hi';

const availableTests = [
    { name: 'Logical Reasoning', questions: 25, time: '30 min', difficulty: 'Medium', category: 'Aptitude', required: true },
    { name: 'Verbal Ability', questions: 20, time: '25 min', difficulty: 'Easy', category: 'Aptitude', required: true },
    { name: 'Quantitative Aptitude', questions: 30, time: '40 min', difficulty: 'Hard', category: 'Aptitude', required: false },
    { name: 'Technical – React.js', questions: 20, time: '35 min', difficulty: 'Hard', category: 'Technical', required: true },
    { name: 'Technical – Node.js', questions: 15, time: '25 min', difficulty: 'Medium', category: 'Technical', required: false },
    { name: 'Personality Assessment', questions: 40, time: '20 min', difficulty: 'Easy', category: 'Personality', required: false },
];

const pastResults = [
    { test: 'Logical Reasoning', date: 'Feb 28, 2026', score: 88, total: 100, percentile: 92, status: 'Passed' },
    { test: 'Verbal Ability', date: 'Feb 25, 2026', score: 72, total: 100, percentile: 78, status: 'Passed' },
    { test: 'Technical – React.js', date: 'Feb 20, 2026', score: 95, total: 100, percentile: 97, status: 'Passed' },
    { test: 'Personality Assessment', date: 'Feb 18, 2026', score: 82, total: 100, percentile: 85, status: 'Completed' },
];

const sampleQuestions = [
    {
        q: 'If all Bloops are Razzles and all Razzles are Lazzles, then which of the following is definitely true?',
        opts: ['All Bloops are Lazzles', 'All Lazzles are Bloops', 'Some Razzles are not Bloops', 'No Lazzles are Bloops'],
        correct: 0
    },
    {
        q: 'What comes next in the series: 2, 6, 12, 20, 30, ?',
        opts: ['40', '42', '38', '44'],
        correct: 1
    },
    {
        q: 'A train travels at 60 km/h. How far will it travel in 2 hours and 30 minutes?',
        opts: ['120 km', '130 km', '150 km', '140 km'],
        correct: 2
    },
    {
        q: 'Choose the word most similar to "Ephemeral":',
        opts: ['Permanent', 'Transient', 'Eternal', 'Robust'],
        correct: 1
    },
    {
        q: 'If a project was completed 20% faster than the estimated time of 50 days, how many days did it actually take?',
        opts: ['45 days', '42 days', '40 days', '38 days'],
        correct: 2
    },
];

const AptitudeTest = () => {
    const [tab, setTab] = useState(0);
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});
    const [testStarted, setTestStarted] = useState(false);
    const [timeLeft] = useState('28:42');

    const tabs = ['Available Tests', 'My Results', 'Take Test'];

    const handleAnswer = (qIdx, optIdx) => {
        setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
    };

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header">
                    <h1>Aptitude Tests</h1>
                    <p>Take aptitude tests to showcase your skills and improve your profile score</p>
                </div>

                {/* Stats */}
                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[
                        { l: 'Tests Available', v: '6' },
                        { l: 'Completed', v: '4' },
                        { l: 'Avg Score', v: '84%' },
                        { l: 'Top Percentile', v: '97th' },
                    ].map((s, i) => (
                        <div className="stat-card" key={i}>
                            <div className="stat-value">{s.v}</div>
                            <div className="stat-label">{s.l}</div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="tabs" style={{ marginBottom: '24px' }}>
                    {tabs.map((t, i) => (
                        <button key={i} className={`tab ${tab === i ? 'active' : ''}`} onClick={() => { setTab(i); if (i !== 2) setTestStarted(false); }}>
                            {t}
                        </button>
                    ))}
                </div>

                {/* Tab 0: Available Tests */}
                {tab === 0 && (
                    <div className="grid-2">
                        {availableTests.map((t, i) => (
                            <div className="glass-card" key={i} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 'var(--fs-lg)', marginBottom: '4px' }}>{t.name}</div>
                                        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{t.category}</div>
                                    </div>
                                    {t.required && <span className="badge badge-light">Required</span>}
                                </div>
                                <div style={{ display: 'flex', gap: '16px', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>
                                    <span>{t.questions} questions</span>
                                    <span>·</span>
                                    <span><HiOutlineClock style={{ verticalAlign: 'middle', marginRight: '4px' }} />{t.time}</span>
                                    <span>·</span>
                                    <span>{t.difficulty}</span>
                                </div>
                                <div className="progress-bar"><div className="progress-fill" style={{ width: '0%' }}></div></div>
                                <button className="btn btn-primary btn-sm" onClick={() => { setTab(2); setTestStarted(true); setCurrentQ(0); setAnswers({}); }}>Start Test</button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Tab 1: My Results */}
                {tab === 1 && (
                    <div>
                        <div className="grid-2" style={{ marginBottom: '24px' }}>
                            <div className="glass-card">
                                <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Score Breakdown</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {pastResults.map((r, i) => (
                                        <div key={i}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 600 }}>{r.test}</span>
                                                <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 700 }}>{r.score}%</span>
                                            </div>
                                            <div className="progress-bar"><div className="progress-fill" style={{ width: `${r.score}%` }}></div></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="glass-card">
                                <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Performance Summary</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {[
                                        { label: 'Strongest Area', value: 'Technical – React.js', extra: '95%' },
                                        { label: 'Needs Improvement', value: 'Verbal Ability', extra: '72%' },
                                        { label: 'Overall Percentile', value: '92nd Percentile', extra: '' },
                                        { label: 'Tests Completed', value: '4 of 6', extra: '67%' },
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 3 ? '1px solid var(--border-color)' : 'none' }}>
                                            <div>
                                                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{item.label}</div>
                                                <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{item.value}</div>
                                            </div>
                                            {item.extra && <span style={{ fontWeight: 700 }}>{item.extra}</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                            <table className="data-table">
                                <thead><tr><th>Test</th><th>Date</th><th>Score</th><th>Percentile</th><th>Status</th></tr></thead>
                                <tbody>
                                    {pastResults.map((r, i) => (
                                        <tr key={i}>
                                            <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{r.test}</td>
                                            <td>{r.date}</td>
                                            <td style={{ fontWeight: 700 }}>{r.score}/{r.total}</td>
                                            <td>{r.percentile}th</td>
                                            <td><span className="badge badge-light">{r.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Tab 2: Take Test */}
                {tab === 2 && (
                    <div>
                        {!testStarted ? (
                            <div className="glass-card" style={{ textAlign: 'center', padding: '60px' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📝</div>
                                <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Ready to begin?</h3>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', fontSize: 'var(--fs-sm)' }}>Select a test from the "Available Tests" tab to start.</p>
                                <button className="btn btn-primary" onClick={() => setTab(0)}>Browse Tests</button>
                            </div>
                        ) : (
                            <div className="grid-2">
                                {/* Question Area */}
                                <div className="glass-card" style={{ position: 'relative' }}>
                                    {/* Timer */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
                                        <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>Question {currentQ + 1} of {sampleQuestions.length}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: 'var(--fs-lg)' }}>
                                            <HiOutlineClock /> {timeLeft}
                                        </div>
                                    </div>

                                    {/* Question */}
                                    <div style={{ marginBottom: '24px' }}>
                                        <h3 style={{ fontWeight: 700, fontSize: 'var(--fs-lg)', lineHeight: 1.5 }}>
                                            {sampleQuestions[currentQ].q}
                                        </h3>
                                    </div>

                                    {/* Options */}
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                                        {sampleQuestions[currentQ].opts.map((opt, oi) => (
                                            <div
                                                key={oi}
                                                onClick={() => handleAnswer(currentQ, oi)}
                                                style={{
                                                    padding: '14px 16px',
                                                    border: `1px solid ${answers[currentQ] === oi ? 'var(--white)' : 'var(--border-color)'}`,
                                                    borderRadius: 'var(--radius-md)',
                                                    cursor: 'pointer',
                                                    background: answers[currentQ] === oi ? 'rgba(255,255,255,0.08)' : 'var(--bg-glass)',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    transition: 'all 0.2s ease',
                                                    fontSize: 'var(--fs-sm)'
                                                }}
                                            >
                                                <div style={{
                                                    width: '28px', height: '28px', borderRadius: '50%',
                                                    border: `2px solid ${answers[currentQ] === oi ? 'var(--white)' : 'var(--border-hover)'}`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    background: answers[currentQ] === oi ? 'var(--white)' : 'transparent',
                                                    color: answers[currentQ] === oi ? 'var(--black)' : 'var(--text-muted)',
                                                    fontWeight: 700, fontSize: 'var(--fs-xs)', flexShrink: 0
                                                }}>
                                                    {String.fromCharCode(65 + oi)}
                                                </div>
                                                <span style={{ color: answers[currentQ] === oi ? 'var(--white)' : 'var(--text-secondary)' }}>{opt}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Navigation */}
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <button className="btn btn-secondary btn-sm" disabled={currentQ === 0} onClick={() => setCurrentQ(p => p - 1)}>
                                            <HiOutlineChevronLeft /> Previous
                                        </button>
                                        {currentQ < sampleQuestions.length - 1 ? (
                                            <button className="btn btn-primary btn-sm" onClick={() => setCurrentQ(p => p + 1)}>
                                                Next <HiOutlineChevronRight />
                                            </button>
                                        ) : (
                                            <button className="btn btn-primary btn-sm">
                                                <HiOutlineCheck /> Submit Test
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Question Navigator */}
                                <div className="glass-card">
                                    <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Question Navigator</h3>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginBottom: '24px' }}>
                                        {sampleQuestions.map((_, qi) => (
                                            <div
                                                key={qi}
                                                onClick={() => setCurrentQ(qi)}
                                                style={{
                                                    width: '100%', aspectRatio: '1', borderRadius: 'var(--radius-sm)',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    cursor: 'pointer', fontWeight: 700, fontSize: 'var(--fs-sm)',
                                                    border: `1px solid ${currentQ === qi ? 'var(--white)' : 'var(--border-color)'}`,
                                                    background: answers[qi] !== undefined ? 'var(--white)' : currentQ === qi ? 'var(--bg-glass-hover)' : 'var(--bg-glass)',
                                                    color: answers[qi] !== undefined ? 'var(--black)' : 'var(--text-secondary)',
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                {qi + 1}
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'var(--white)' }}></div> Answered
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'var(--bg-glass-hover)', border: '1px solid var(--white)' }}></div> Current
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: 'var(--bg-glass)', border: '1px solid var(--border-color)' }}></div> Not Answered
                                        </div>
                                    </div>
                                    <div style={{ marginTop: '24px', padding: '16px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                        <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 600, marginBottom: '8px' }}>Progress</div>
                                        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginBottom: '8px' }}>
                                            {Object.keys(answers).length}/{sampleQuestions.length} answered
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: `${(Object.keys(answers).length / sampleQuestions.length) * 100}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AptitudeTest;

