import React, { useState } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { seekerLinks } from '../Components/SidebarLinks';
import { HiOutlineStar, HiOutlineThumbUp, HiOutlineThumbDown, HiOutlinePencil } from 'react-icons/hi';

const reviews = [
    { company: 'TechCorp Inc.', role: 'Frontend Developer', rating: 4, date: 'Feb 2026', title: 'Great culture, competitive pay', pros: 'Flexible hours, strong engineering team, good mentorship', cons: 'Fast pace can be stressful, limited remote options', recommend: true },
    { company: 'DataFlow Systems', role: 'React Engineer', rating: 3, date: 'Jan 2026', title: 'Good technical challenges', pros: 'Interesting projects, modern tech stack', cons: 'Management could improve, work-life balance issues', recommend: false },
    { company: 'DesignHub', role: 'UI Developer', rating: 5, date: 'Dec 2025', title: 'Best place I have worked', pros: 'Amazing team, creative freedom, great benefits', cons: 'Smaller company so fewer advancement paths', recommend: true },
    { company: 'CloudScale', role: 'Full Stack Dev', rating: 4, date: 'Nov 2025', title: 'Solid engineering company', pros: 'Cutting-edge tech, good compensation', cons: 'Onboarding could be smoother', recommend: true },
];

const StarRating = ({ rating, size = 16, interactive = false, onChange }) => (
    <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map(s => (
            <span key={s} style={{ fontSize: `${size}px`, cursor: interactive ? 'pointer' : 'default', color: s <= rating ? '#fff' : '#3D3D3D', transition: 'all 0.2s' }}
                onClick={() => interactive && onChange?.(s)}>★</span>
        ))}
    </div>
);

const CompanyReviews = () => {
    const [showForm, setShowForm] = useState(false);
    const [newRating, setNewRating] = useState(0);

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header-row">
                    <div><h1 style={{ fontSize: 'var(--fs-3xl)', fontWeight: 800, marginBottom: '4px' }}>Company Reviews</h1><p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Anonymous reviews from interview experiences</p></div>
                    <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}><HiOutlinePencil /> Write Review</button>
                </div>

                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {[
                        { label: 'Total Reviews', value: '156', change: '+12 this month' },
                        { label: 'Avg. Rating', value: '4.1', change: '★★★★☆' },
                        { label: 'Companies Reviewed', value: '48', change: '+5 this month' },
                        { label: 'Helpful Votes', value: '892', change: '+67 this week' },
                    ].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-value">{s.value}</div><div className="stat-label">{s.label}</div><div className="stat-change">{s.change}</div></div>
                    ))}
                </div>

                {showForm && (
                    <div className="glass-card" style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Write a Review</h3>
                        <div className="grid-2" style={{ marginBottom: '16px' }}>
                            <div className="input-group"><label>Company Name</label><input className="input-field" placeholder="Enter company name" /></div>
                            <div className="input-group"><label>Your Role</label><input className="input-field" placeholder="Position you interviewed for" /></div>
                        </div>
                        <div className="input-group" style={{ marginBottom: '16px' }}>
                            <label>Overall Rating</label>
                            <StarRating rating={newRating} size={28} interactive onChange={setNewRating} />
                        </div>
                        <div className="input-group" style={{ marginBottom: '16px' }}><label>Review Title</label><input className="input-field" placeholder="Summarize your experience" /></div>
                        <div className="grid-2" style={{ marginBottom: '16px' }}>
                            <div className="input-group"><label>Pros</label><textarea className="textarea-field" placeholder="What did you like?" /></div>
                            <div className="input-group"><label>Cons</label><textarea className="textarea-field" placeholder="What could be improved?" /></div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button className="btn btn-primary">Submit Review</button>
                            <button className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                        </div>
                    </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {reviews.map((r, i) => (
                        <div className="glass-card" key={i}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                <div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                                        <div className="avatar">{r.company[0]}</div>
                                        <div>
                                            <div style={{ fontWeight: 700 }}>{r.company}</div>
                                            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{r.role} · {r.date}</div>
                                        </div>
                                    </div>
                                </div>
                                <StarRating rating={r.rating} />
                            </div>
                            <h4 style={{ fontWeight: 600, marginBottom: '12px' }}>{r.title}</h4>
                            <div className="grid-2" style={{ marginBottom: '12px' }}>
                                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
                                    <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}><HiOutlineThumbUp /> PROS</div>
                                    <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{r.pros}</div>
                                </div>
                                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
                                    <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}><HiOutlineThumbDown /> CONS</div>
                                    <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{r.cons}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className={`badge ${r.recommend ? 'badge-light' : 'badge-outline'}`}>{r.recommend ? '👍 Recommends' : '👎 Does Not Recommend'}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CompanyReviews;

