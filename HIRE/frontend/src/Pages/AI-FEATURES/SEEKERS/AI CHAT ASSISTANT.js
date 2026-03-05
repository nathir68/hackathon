import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { seekerLinks } from '../../Components/SidebarLinks';
import { HiOutlinePaperAirplane } from 'react-icons/hi';
import { aiChat } from '../../../api';

const initialMsgs = [
    { from: 'ai', text: "Hi! I'm HIRE AI Assistant. I can help you with your job search, resume tips, interview prep, and career advice. What would you like to know?" },
];

const suggestions = ['Help me improve my resume', 'What jobs match my skills?', 'Tips for technical interviews', 'How to negotiate salary?'];

const AIChatAssistant = () => {
    const [messages, setMessages] = useState(initialMsgs);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const send = async (text) => {
        const msg = text || input;
        if (!msg.trim() || loading) return;

        const newMessages = [...messages, { from: 'user', text: msg }];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const res = await aiChat({ messages: newMessages });
            setMessages([...newMessages, { from: 'ai', text: res.data.reply }]);
        } catch (error) {
            console.error("Chat error:", error);
            setMessages([...newMessages, { from: 'ai', text: "Sorry, I'm having trouble connecting right now." }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user") || '{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header"><h1>AI Chat Assistant</h1></div>
                <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 180px)', padding: 0, overflow: 'hidden' }}>
                    <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {messages.map((m, i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: m.from === 'user' ? 'flex-end' : 'flex-start' }}>
                                <div style={{ maxWidth: '70%', padding: '14px 18px', borderRadius: 'var(--radius-md)', background: m.from === 'user' ? 'var(--white)' : 'var(--bg-glass)', color: m.from === 'user' ? 'var(--black)' : 'var(--text-primary)', fontSize: 'var(--fs-sm)', lineHeight: 1.7, border: m.from === 'ai' ? '1px solid var(--border-color)' : 'none' }}>
                                    {m.from === 'ai' && <div style={{ fontWeight: 700, marginBottom: '4px', fontSize: 'var(--fs-xs)', color: m.from === 'user' ? 'var(--grey-600)' : 'var(--grey-400)' }}>🤖 HIRE AI</div>}
                                    {m.text}
                                </div>
                            </div>
                        ))}
                    </div>
                    {messages.length <= 2 && (
                        <div style={{ padding: '0 24px 12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {suggestions.map((s, i) => <button key={i} className="chip" style={{ cursor: 'pointer' }} onClick={() => send(s)}>{s}</button>)}
                        </div>
                    )}
                    <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px' }}>
                        <input className="input-field" placeholder="Ask me anything about your career..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} style={{ flex: 1 }} disabled={loading} />
                        <button className="btn btn-primary" onClick={() => send()} disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
                            {loading ? '...' : <HiOutlinePaperAirplane />}
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AIChatAssistant;

