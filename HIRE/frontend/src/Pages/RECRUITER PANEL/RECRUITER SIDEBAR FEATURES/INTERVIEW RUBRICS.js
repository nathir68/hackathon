import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlineClipboardList, HiOutlinePlus, HiOutlineTrash, HiOutlinePencil, HiOutlineCheck } from 'react-icons/hi';

const existingRubrics = [
    {
        id: 1, title: 'Frontend Developer Interview', role: 'Frontend Dev', criteria: [
            { name: 'Technical Knowledge', weight: 30 },
            { name: 'Problem Solving', weight: 25 },
            { name: 'Communication', weight: 20 },
            { name: 'Cultural Fit', weight: 15 },
            { name: 'Initiative & Growth', weight: 10 },
        ], lastUsed: 'Mar 3, 2026', timesUsed: 12
    },
    {
        id: 2, title: 'Engineering Manager Screen', role: 'Manager', criteria: [
            { name: 'Leadership Experience', weight: 30 },
            { name: 'Technical Depth', weight: 20 },
            { name: 'Team Building', weight: 25 },
            { name: 'Strategic Thinking', weight: 25 },
        ], lastUsed: 'Feb 28, 2026', timesUsed: 5
    },
];

const ScoreCell = ({ value, onChange }) => (
    <div style={{ display: 'flex', gap: '4px' }}>
        {[1, 2, 3, 4, 5].map(s => (
            <div key={s} onClick={() => onChange(s)} style={{
                width: '28px', height: '28px', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 'var(--fs-xs)', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                background: s <= value ? '#fff' : 'rgba(255,255,255,0.06)', color: s <= value ? '#000' : 'var(--text-muted)',
            }}>{s}</div>
        ))}
    </div>
);

const InterviewRubrics = () => {
    const [showCreate, setShowCreate] = useState(false);
    const [activeRubric, setActiveRubric] = useState(null);
    const [scores, setScores] = useState({});

    const updateScore = (criterion, value) => {
        setScores(prev => ({ ...prev, [criterion]: value }));
    };

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header-row">
                    <div><h1 style={{ fontSize: 'var(--fs-3xl)', fontWeight: 800, marginBottom: '4px' }}>Interview Rubrics</h1><p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Standardized scoring sheets for objective evaluation</p></div>
                    <button className="btn btn-primary" onClick={() => setShowCreate(!showCreate)}><HiOutlinePlus /> New Rubric</button>
                </div>

                {showCreate && (
                    <div className="glass-card" style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Create New Rubric</h3>
                        <div className="grid-2" style={{ marginBottom: '16px' }}>
                            <div className="input-group"><label>Rubric Title</label><input className="input-field" placeholder="e.g. Backend Developer Interview" /></div>
                            <div className="input-group"><label>Target Role</label><input className="input-field" placeholder="e.g. Sr. Backend Dev" /></div>
                        </div>
                        <div style={{ marginBottom: '16px' }}>
                            <label style={{ fontSize: 'var(--fs-sm)', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Evaluation Criteria</label>
                            {['', '', ''].map((_, i) => (
                                <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '8px', alignItems: 'center' }}>
                                    <input className="input-field" placeholder="Criterion name" style={{ flex: 2 }} />
                                    <input className="input-field" placeholder="Weight %" type="number" style={{ flex: 1 }} />
                                    <button className="btn-icon" style={{ flexShrink: 0 }}><HiOutlineTrash /></button>
                                </div>
                            ))}
                            <button className="btn btn-ghost btn-sm" style={{ marginTop: '4px' }}><HiOutlinePlus /> Add Criterion</button>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn btn-primary"><HiOutlineCheck /> Save Rubric</button>
                            <button className="btn btn-secondary" onClick={() => setShowCreate(false)}>Cancel</button>
                        </div>
                    </div>
                )}

                <div className="grid-2" style={{ marginBottom: '24px' }}>
                    {existingRubrics.map(r => (
                        <div className="glass-card" key={r.id} style={{ cursor: 'pointer', borderColor: activeRubric === r.id ? 'var(--border-active)' : 'var(--border-color)' }}
                            onClick={() => setActiveRubric(activeRubric === r.id ? null : r.id)}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                                <div>
                                    <h3 style={{ fontWeight: 700, marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}><HiOutlineClipboardList /> {r.title}</h3>
                                    <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>For: {r.role} · Used {r.timesUsed} times · Last: {r.lastUsed}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    <button className="btn-icon" style={{ width: '32px', height: '32px' }}><HiOutlinePencil /></button>
                                    <button className="btn-icon" style={{ width: '32px', height: '32px' }}><HiOutlineTrash /></button>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {r.criteria.map((c, ci) => (
                                    <span className="chip" key={ci}>{c.name} ({c.weight}%)</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {activeRubric && (
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>Score Candidate</h3>
                        <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginBottom: '20px' }}>Using: {existingRubrics.find(r => r.id === activeRubric)?.title}</p>
                        <div className="input-group" style={{ marginBottom: '20px', maxWidth: '300px' }}>
                            <label>Candidate Name</label><input className="input-field" placeholder="Enter candidate name" />
                        </div>
                        <table className="data-table">
                            <thead><tr><th>Criterion</th><th>Weight</th><th>Score (1-5)</th><th>Weighted</th></tr></thead>
                            <tbody>
                                {existingRubrics.find(r => r.id === activeRubric)?.criteria.map((c, i) => {
                                    const score = scores[c.name] || 0;
                                    const weighted = ((score / 5) * c.weight).toFixed(1);
                                    return (
                                        <tr key={i}>
                                            <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{c.name}</td>
                                            <td>{c.weight}%</td>
                                            <td><ScoreCell value={score} onChange={v => updateScore(c.name, v)} /></td>
                                            <td style={{ fontWeight: 600 }}>{weighted}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', padding: '16px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)' }}>
                            <div><span style={{ fontWeight: 700, fontSize: 'var(--fs-lg)' }}>Total Score: </span><span style={{ fontWeight: 900, fontSize: 'var(--fs-2xl)' }}>
                                {existingRubrics.find(r => r.id === activeRubric)?.criteria.reduce((sum, c) => sum + ((scores[c.name] || 0) / 5) * c.weight, 0).toFixed(1)}
                            </span><span style={{ color: 'var(--text-muted)' }}> / 100</span></div>
                            <button className="btn btn-primary"><HiOutlineCheck /> Submit Score</button>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default InterviewRubrics;

