import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlineUserGroup, HiOutlineThumbUp, HiOutlineThumbDown, HiOutlineChat, HiOutlinePaperAirplane } from 'react-icons/hi';

const candidates = [];

const teamMembers = [
    { name: 'Sarah Chen', role: 'Lead Recruiter', votes: 12 },
    { name: 'Mike Ross', role: 'Engineering Manager', votes: 8 },
    { name: 'John Kim', role: 'HR Partner', votes: 15 },
];

const CollaborativeHiring = () => {
    const [selected, setSelected] = useState(0);
    const [newNote, setNewNote] = useState('');

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user") || '{"name":"Guest"}').name)} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header"><h1>Collaborative Hiring</h1><p>Team notes, votes, and discussions on candidates</p></div>

                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[
                        { label: 'Team Members', value: '3', change: 'Active collaborators' },
                        { label: 'Total Votes', value: '35', change: 'Across all candidates' },
                        { label: 'Notes Added', value: '28', change: '+8 this week' },
                        { label: 'Consensus Rate', value: '84%', change: 'Team alignment' },
                    ].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div><div className="stat-change">{s.change}</div></div>
                    ))}
                </div>

                <div className="grid-2">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div className="glass-card" style={{ padding: '16px' }}>
                            <h3 style={{ fontWeight: 700, marginBottom: '12px' }}>Team Members</h3>
                            {teamMembers.map((t, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', marginBottom: '8px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div className="avatar avatar-sm">{t.name[0]}</div>
                                        <div><div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{t.name}</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{t.role}</div></div>
                                    </div>
                                    <span className="chip">{t.votes} votes</span>
                                </div>
                            ))}
                        </div>

                        {candidates.map((c, i) => (
                            <div key={i} className="glass-card" onClick={() => setSelected(i)}
                                style={{ cursor: 'pointer', borderColor: selected === i ? 'var(--border-active)' : 'var(--border-color)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div className="avatar">{c.name[0]}</div>
                                        <div>
                                            <div style={{ fontWeight: 700 }}>{c.name}</div>
                                            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{c.role} · Score: {c.score}%</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <span className="badge badge-light"><HiOutlineThumbUp /> {c.votes.up}</span>
                                        <span className="badge badge-outline"><HiOutlineThumbDown /> {c.votes.down}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {candidates.length > 0 ? (
                        <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <div>
                                    <h3 style={{ fontWeight: 700 }}>{candidates[selected].name}</h3>
                                    <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{candidates[selected].role} · {candidates[selected].stage}</div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button className="btn-icon" title="Vote Up"><HiOutlineThumbUp /></button>
                                    <button className="btn-icon" title="Vote Down"><HiOutlineThumbDown /></button>
                                </div>
                            </div>

                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
                                <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}><HiOutlineChat style={{ verticalAlign: 'middle' }} /> Team Discussion</div>
                                {candidates[selected].notes.map((n, ni) => (
                                    <div key={ni} style={{ padding: '12px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                            <span style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{n.author}</span>
                                            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{n.time}</span>
                                        </div>
                                        <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{n.text}</div>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', gap: '8px' }}>
                                <input className="input-field" placeholder="Add a note..." value={newNote} onChange={e => setNewNote(e.target.value)} style={{ flex: 1 }} />
                                <button className="btn btn-primary" onClick={() => setNewNote('')}><HiOutlinePaperAirplane /></button>
                            </div>
                        </div>
                    ) : (
                        <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                            No candidates available for review.
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CollaborativeHiring;

