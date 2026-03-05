import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { seekerLinks } from '../../Components/SidebarLinks';
import { HiOutlineX } from 'react-icons/hi';

const initialSkills = [
    { name: 'React.js', level: 'Expert', cat: 'Technical' },
    { name: 'TypeScript', level: 'Advanced', cat: 'Technical' },
    { name: 'Node.js', level: 'Advanced', cat: 'Technical' },
    { name: 'JavaScript', level: 'Expert', cat: 'Technical' },
    { name: 'Python', level: 'Intermediate', cat: 'Technical' },
    { name: 'HTML/CSS', level: 'Expert', cat: 'Technical' },
    { name: 'Communication', level: 'Advanced', cat: 'Soft Skills' },
    { name: 'Problem Solving', level: 'Expert', cat: 'Soft Skills' },
    { name: 'Teamwork', level: 'Advanced', cat: 'Soft Skills' },
    { name: 'Git', level: 'Advanced', cat: 'Tools' },
    { name: 'Figma', level: 'Intermediate', cat: 'Tools' },
    { name: 'Docker', level: 'Beginner', cat: 'Tools' },
];

const levels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
const categories = ['All', 'Technical', 'Soft Skills', 'Tools'];

const Skills = () => {
    const [skills, setSkills] = useState(initialSkills);
    const [newSkill, setNewSkill] = useState('');
    const [filterCat, setFilterCat] = useState('All');

    const filtered = filterCat === 'All' ? skills : skills.filter(s => s.cat === filterCat);

    const addSkill = () => {
        if (newSkill.trim()) {
            setSkills([...skills, { name: newSkill.trim(), level: 'Intermediate', cat: 'Technical' }]);
            setNewSkill('');
        }
    };

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header"><h1>Skills</h1><p>Manage and showcase your skills</p></div>

                <div className="glass-card" style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <input className="input-field" placeholder="Add a new skill..." value={newSkill} onChange={e => setNewSkill(e.target.value)} onKeyDown={e => e.key === 'Enter' && addSkill()} style={{ flex: 1 }} />
                        <button className="btn btn-primary" onClick={addSkill}>Add Skill</button>
                    </div>
                </div>

                <div className="tabs" style={{ marginBottom: '24px' }}>
                    {categories.map(c => <button key={c} className={`tab ${filterCat === c ? 'active' : ''}`} onClick={() => setFilterCat(c)}>{c}</button>)}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                    {filtered.map((s, i) => (
                        <div key={i} className="glass-card" style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)', marginBottom: '4px' }}>{s.name}</div>
                                <select value={s.level} onChange={e => { const n = [...skills]; const idx = skills.indexOf(s); n[idx] = { ...s, level: e.target.value }; setSkills(n) }} style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '4px 8px', color: 'var(--text-secondary)', fontSize: 'var(--fs-xs)' }}>
                                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                                </select>
                            </div>
                            <button onClick={() => setSkills(skills.filter((_, j) => skills.indexOf(s) !== skills.indexOf(_) || i !== skills.indexOf(s) ? true : j !== i))} style={{ background: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}><HiOutlineX /></button>
                        </div>
                    ))}
                </div>

                <button className="btn btn-primary" style={{ marginTop: '24px' }}>Save Changes</button>
            </div>
        </DashboardLayout>
    );
};

export default Skills;

