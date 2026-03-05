import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlineMail, HiOutlineCheck, HiOutlineClock, HiOutlineExclamation, HiOutlineChevronRight, HiOutlinePaperAirplane } from 'react-icons/hi';

const referenceRequests = [
    {
        candidate: 'Alice Johnson', role: 'Sr. Frontend Dev', status: 'completed', sentDate: 'Feb 28',
        references: [
            { name: 'Mark Thompson', relation: 'Former Manager', company: 'TechCorp', sentiment: 'Positive', score: 92, summary: 'Highly skilled, self-motivated, excellent team player. Led multiple frontend initiatives successfully.' },
            { name: 'Lisa Wang', relation: 'Team Lead', company: 'DataFlow', sentiment: 'Positive', score: 88, summary: 'Strong technical abilities, great communicator. Occasionally needs more focus on deadlines.' },
        ],
        overallScore: 90, overallSentiment: 'Highly Positive'
    },
    {
        candidate: 'Bob Williams', role: 'Full Stack Engineer', status: 'pending', sentDate: 'Mar 2',
        references: [
            { name: 'James Clark', relation: 'CTO', company: 'StartupXYZ', sentiment: 'Pending', score: null, summary: null },
        ],
        overallScore: null, overallSentiment: 'Awaiting Responses'
    },
    {
        candidate: 'Carol Martinez', role: 'Frontend Developer', status: 'completed', sentDate: 'Feb 25',
        references: [
            { name: 'Pedro Gomez', relation: 'Project Manager', company: 'DesignHub', sentiment: 'Mixed', score: 68, summary: 'Good technical skills but sometimes struggles with collaboration. Improved significantly over time.' },
            { name: 'Nina Patel', relation: 'Senior Dev', company: 'DesignHub', sentiment: 'Positive', score: 82, summary: 'Creative problem solver, always willing to learn. Great at frontend architecture.' },
        ],
        overallScore: 75, overallSentiment: 'Moderately Positive'
    },
];

const AIReferenceChecker = () => {
    const [selected, setSelected] = useState(0);

    const statusIcon = (s) => s === 'completed' ? <HiOutlineCheck /> : <HiOutlineClock />;
    const statusBadge = (s) => s === 'completed' ? 'badge-light' : 'badge-outline';

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header-row">
                    <div><h1 style={{ fontSize: 'var(--fs-3xl)', fontWeight: 800, marginBottom: '4px' }}>AI Reference Checker</h1><p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Automated reference checks with NLP sentiment analysis</p></div>
                    <button className="btn btn-primary"><HiOutlinePaperAirplane /> New Request</button>
                </div>

                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[
                        { label: 'Total Requests', value: '23', change: 'All time' },
                        { label: 'Completed', value: '18', change: '78% completion rate' },
                        { label: 'Avg. Score', value: '82', change: 'Out of 100' },
                        { label: 'Avg. Response', value: '2.4d', change: 'Time to complete' },
                    ].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div><div className="stat-change">{s.change}</div></div>
                    ))}
                </div>

                <div className="grid-2">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '4px' }}>Reference Requests</h3>
                        {referenceRequests.map((r, i) => (
                            <div key={i} className="glass-card" onClick={() => setSelected(i)}
                                style={{ cursor: 'pointer', borderColor: selected === i ? 'var(--border-active)' : 'var(--border-color)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div className="avatar">{r.candidate[0]}</div>
                                        <div>
                                            <div style={{ fontWeight: 700 }}>{r.candidate}</div>
                                            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{r.role} · Sent {r.sentDate}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span className={`badge ${statusBadge(r.status)}`}>{statusIcon(r.status)} {r.status}</span>
                                        <HiOutlineChevronRight style={{ color: 'var(--text-muted)' }} />
                                    </div>
                                </div>
                                {r.overallScore && (
                                    <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Trust Score:</span>
                                        <div className="progress-bar" style={{ width: '120px' }}><div className="progress-fill" style={{ width: `${r.overallScore}%` }} /></div>
                                        <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 700 }}>{r.overallScore}%</span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="glass-card">
                        <div style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontWeight: 700 }}>{referenceRequests[selected].candidate}</h3>
                            <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{referenceRequests[selected].role}</div>
                        </div>

                        {referenceRequests[selected].overallScore && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-lg)', marginBottom: '20px' }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ width: '80px', height: '80px', borderRadius: '50%', border: '3px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', flexDirection: 'column' }}>
                                        <div style={{ fontWeight: 900, fontSize: 'var(--fs-2xl)' }}>{referenceRequests[selected].overallScore}</div>
                                    </div>
                                    <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>Overall Trust Score</div>
                                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{referenceRequests[selected].overallSentiment}</div>
                                </div>
                            </div>
                        )}

                        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}><HiOutlineMail style={{ verticalAlign: 'middle' }} /> Reference Responses</div>
                        {referenceRequests[selected].references.map((ref, ri) => (
                            <div key={ri} style={{ padding: '16px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '12px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{ref.name}</div>
                                        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{ref.relation} at {ref.company}</div>
                                    </div>
                                    <span className={`badge ${ref.sentiment === 'Positive' ? 'badge-light' : ref.sentiment === 'Mixed' ? 'badge-warning' : 'badge-outline'}`}>
                                        {ref.sentiment === 'Positive' ? '😊' : ref.sentiment === 'Mixed' ? '😐' : '⏳'} {ref.sentiment}
                                    </span>
                                </div>
                                {ref.score && (
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                            <div className="progress-bar" style={{ flex: 1 }}><div className="progress-fill" style={{ width: `${ref.score}%` }} /></div>
                                            <span style={{ fontWeight: 700, fontSize: 'var(--fs-sm)' }}>{ref.score}/100</span>
                                        </div>
                                        <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: '1.6', padding: '8px', background: 'rgba(255,255,255,0.02)', borderRadius: '6px', borderLeft: '3px solid var(--grey-600)' }}>{ref.summary}</div>
                                    </>
                                )}
                                {!ref.score && <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', fontStyle: 'italic' }}>Awaiting response from this reference...</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AIReferenceChecker;

