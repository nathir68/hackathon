import React, { useState } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { seekerLinks } from '../Components/SidebarLinks';
import { HiOutlineVideoCamera, HiOutlineUpload, HiOutlineTrash, HiOutlinePlay, HiOutlineLightBulb, HiOutlineClock, HiOutlineVolumeUp, HiOutlineSparkles } from 'react-icons/hi';

const tips = [
    { icon: <HiOutlineClock />, title: 'Keep it under 60 seconds', desc: 'Recruiters prefer concise pitches. Focus on your key strengths.' },
    { icon: <HiOutlineVolumeUp />, title: 'Speak clearly', desc: 'Use a quiet space with good lighting. Test your audio first.' },
    { icon: <HiOutlineSparkles />, title: 'Show personality', desc: 'Let your enthusiasm shine. Be authentic and professional.' },
    { icon: <HiOutlineLightBulb />, title: 'Highlight achievements', desc: 'Mention 2-3 key accomplishments that set you apart.' },
];

const VideoPitch = () => {
    const [hasVideo, setHasVideo] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header"><h1>Video Pitch</h1><p>Record a 60-second video introduction to stand out from the crowd</p></div>

                <div className="grid-2" style={{ marginBottom: '24px' }}>
                    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
                        <h3 style={{ fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><HiOutlineVideoCamera /> Your Video Pitch</h3>

                        {!hasVideo ? (
                            <div
                                onDragEnter={() => setDragActive(true)} onDragLeave={() => setDragActive(false)}
                                onDragOver={e => e.preventDefault()} onDrop={() => { setDragActive(false); setHasVideo(true); }}
                                style={{
                                    flex: 1, minHeight: '300px', border: `2px dashed ${dragActive ? '#fff' : 'rgba(255,255,255,0.12)'}`, borderRadius: 'var(--radius-lg)',
                                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px',
                                    background: dragActive ? 'rgba(255,255,255,0.04)' : 'transparent', transition: 'all 0.3s', cursor: 'pointer',
                                }}
                                onClick={() => setHasVideo(true)}
                            >
                                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'var(--text-muted)' }}>
                                    <HiOutlineUpload />
                                </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>Drag & drop your video here</div>
                                    <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>or click to browse · MP4, MOV · Max 60 seconds</div>
                                </div>
                                <button className="btn btn-secondary btn-sm" onClick={e => { e.stopPropagation(); setHasVideo(true); }}><HiOutlineUpload /> Browse Files</button>
                            </div>
                        ) : (
                            <div>
                                <div style={{ width: '100%', height: '280px', background: 'var(--grey-900)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: '16px' }}>
                                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
                                        <HiOutlinePlay />
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '12px', left: '12px', padding: '4px 10px', background: 'rgba(0,0,0,0.7)', borderRadius: '6px', fontSize: 'var(--fs-xs)', fontWeight: 600 }}>0:47 / 1:00</div>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                    <div style={{ flex: 1, height: '4px', background: 'var(--grey-800)', borderRadius: '2px', overflow: 'hidden' }}>
                                        <div style={{ width: '78%', height: '100%', background: '#fff', borderRadius: '2px' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>my_video_pitch.mp4</div>
                                        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Uploaded · 47 seconds · 12.4 MB</div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button className="btn btn-secondary btn-sm" onClick={() => setHasVideo(false)}><HiOutlineUpload /> Replace</button>
                                        <button className="btn btn-danger btn-sm" onClick={() => setHasVideo(false)}><HiOutlineTrash /> Remove</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div className="glass-card">
                            <h3 style={{ fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}><HiOutlineLightBulb /> Recording Tips</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {tips.map((t, i) => (
                                    <div key={i} style={{ display: 'flex', gap: '12px', padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)' }}>
                                        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--grey-300)', flexShrink: 0 }}>{t.icon}</div>
                                        <div>
                                            <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)', marginBottom: '2px' }}>{t.title}</div>
                                            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{t.desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="glass-card">
                            <h3 style={{ fontWeight: 700, marginBottom: '12px' }}>Suggested Script</h3>
                            <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: '1.8', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--grey-600)' }}>
                                "Hi, I'm <strong>[Your Name]</strong>. I'm a <strong>[Your Role]</strong> with <strong>[X years]</strong> of experience in <strong>[Key Skills]</strong>. In my recent role at <strong>[Company]</strong>, I <strong>[Key Achievement]</strong>. I'm passionate about <strong>[What Drives You]</strong> and I'm excited to bring my skills to your team."
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default VideoPitch;

