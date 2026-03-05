import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { seekerLinks } from '../../Components/SidebarLinks';

const categories = ['General', 'Behavioral', 'Technical', 'System Design', 'Problem Solving'];
const questions = {
    General: [{ q: 'Tell me about yourself.', tip: 'Structure: Present → Past → Future. Keep it under 2 minutes.' }, { q: 'Why do you want to work here?', tip: 'Research the company. Connect your goals with their mission.' }, { q: 'Where do you see yourself in 5 years?', tip: 'Show ambition aligned with the role and company growth.' }],
    Behavioral: [{ q: 'Describe a challenging project you led.', tip: 'Use STAR method: Situation, Task, Action, Result.' }, { q: 'How do you handle conflicts at work?', tip: 'Show emotional intelligence and problem-solving.' }, { q: 'Tell me about a time you failed.', tip: 'Be honest, show what you learned and how you grew.' }],
    Technical: [{ q: 'Explain the virtual DOM in React.', tip: 'Compare with real DOM, explain reconciliation process.' }, { q: 'What is the difference between REST and GraphQL?', tip: 'Discuss trade-offs, when to use each.' }, { q: 'How would you optimize a slow web application?', tip: 'Cover profiling, lazy loading, caching, code splitting.' }],
    'System Design': [{ q: 'Design a URL shortener.', tip: 'Discuss hashing, database, caching, scalability.' }, { q: 'Design a real-time chat system.', tip: 'Cover WebSockets, message queues, database design.' }],
    'Problem Solving': [{ q: 'How would you find duplicates in an array?', tip: 'Discuss multiple approaches: hash set, sorting, etc.' }, { q: 'Reverse a linked list.', tip: 'Explain iterative and recursive approaches.' }],
};

const InterviewQuestions = () => {
    const [cat, setCat] = useState('General');
    const [showTip, setShowTip] = useState(null);

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header"><h1>Interview Question Suggestions</h1><p>Practice with AI-curated questions for your target roles</p></div>
                <div className="tabs" style={{ marginBottom: '24px' }}>{categories.map(c => <button key={c} className={`tab ${cat === c ? 'active' : ''}`} onClick={() => { setCat(c); setShowTip(null) }}>{c}</button>)}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {questions[cat].map((q, i) => (
                        <div className="glass-card" key={i}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontWeight: 700, fontSize: 'var(--fs-md)' }}>{q.q}</div>
                                <button className="btn btn-secondary btn-sm" onClick={() => setShowTip(showTip === i ? null : i)}>{showTip === i ? 'Hide' : 'Show'} Tip</button>
                            </div>
                            {showTip === i && <div style={{ marginTop: '12px', padding: '12px 16px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>💡 <strong>Tip:</strong> {q.tip}</div>}
                        </div>
                    ))}
                </div>
                <div className="glass-card" style={{ marginTop: '24px', textAlign: 'center' }}>
                    <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Want personalized questions?</h3>
                    <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', marginBottom: '16px' }}>Upload the job description and our AI will generate relevant interview questions.</p>
                    <button className="btn btn-primary">Generate Custom Questions</button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default InterviewQuestions;

