import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { seekerLinks } from '../../Components/SidebarLinks';
import { HiOutlineVideoCamera, HiOutlineMicrophone } from 'react-icons/hi';

const AIMockInterview = () => {
    const [started, setStarted] = useState(false);
    const [currentQ, setCurrentQ] = useState(0);
    const mockQuestions = ['Tell me about yourself and your experience.', 'Why are you interested in this position?', 'Describe a challenging project you worked on.', 'How do you handle tight deadlines?', 'Do you have any questions for us?'];

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header"><h1>AI Mock Interview</h1><p>Practice interviews with our AI interviewer</p></div>
                {!started ? (
                    <div className="glass-card" style={{ textAlign: 'center', padding: '48px' }}>
                        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '2rem' }}>🎤</div>
                        <h2 style={{ fontWeight: 800, marginBottom: '12px' }}>Ready for your mock interview?</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>Our AI will ask you interview questions and provide real-time feedback on your answers.</p>
                        <div className="grid-2" style={{ maxWidth: '400px', margin: '0 auto 24px', gap: '12px' }}>
                            <div className="input-group"><label>Role</label><select className="select-field"><option>Frontend Developer</option><option>Backend Developer</option><option>Full Stack</option><option>DevOps</option></select></div>
                            <div className="input-group"><label>Difficulty</label><select className="select-field"><option>Easy</option><option>Medium</option><option>Hard</option></select></div>
                        </div>
                        <button className="btn btn-primary btn-lg" onClick={() => setStarted(true)}><HiOutlineVideoCamera /> Start Interview</button>
                    </div>
                ) : (
                    <div className="grid-2">
                        <div className="glass-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h3 style={{ fontWeight: 700 }}>Question {currentQ + 1}/{mockQuestions.length}</h3>
                                <span className="badge badge-outline">In Progress</span>
                            </div>
                            <div style={{ padding: '24px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '20px', fontSize: 'var(--fs-lg)', fontWeight: 600 }}>{mockQuestions[currentQ]}</div>
                            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '2rem', cursor: 'pointer', border: '2px solid var(--white)' }}><HiOutlineMicrophone /></div>
                                <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', marginTop: '8px' }}>Click to start recording</p>
                            </div>
                            <textarea className="textarea-field" rows={4} placeholder="Or type your answer here..." />
                            <div style={{ display: 'flex', gap: '12px', marginTop: '16px', justifyContent: 'flex-end' }}>
                                {currentQ > 0 && <button className="btn btn-secondary" onClick={() => setCurrentQ(currentQ - 1)}>Previous</button>}
                                {currentQ < mockQuestions.length - 1 ? <button className="btn btn-primary" onClick={() => setCurrentQ(currentQ + 1)}>Next Question</button> : <button className="btn btn-primary" onClick={() => setStarted(false)}>Finish Interview</button>}
                            </div>
                        </div>
                        <div className="glass-card">
                            <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>AI Feedback</h3>
                            <div style={{ padding: '16px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '12px' }}>
                                <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)', marginBottom: '4px' }}>Confidence</div>
                                <div className="progress-bar"><div className="progress-fill" style={{ width: '72%' }}></div></div>
                            </div>
                            <div style={{ padding: '16px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '12px' }}>
                                <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)', marginBottom: '4px' }}>Clarity</div>
                                <div className="progress-bar"><div className="progress-fill" style={{ width: '85%' }}></div></div>
                            </div>
                            <div style={{ padding: '16px', background: 'var(--bg-glass)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                                <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)', marginBottom: '8px' }}>Tips</div>
                                <ul style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', paddingLeft: '16px', lineHeight: 1.8 }}>
                                    <li>Use the STAR method for structured answers</li>
                                    <li>Include specific metrics and numbers</li>
                                    <li>Keep your answer under 2 minutes</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AIMockInterview;

