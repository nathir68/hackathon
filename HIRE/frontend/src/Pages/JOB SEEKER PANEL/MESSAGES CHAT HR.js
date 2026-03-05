import React, { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { seekerLinks } from '../Components/SidebarLinks';
import { HiOutlineSearch, HiOutlinePaperAirplane, HiOutlineEmojiHappy, HiOutlinePaperClip } from 'react-icons/hi';
import { getConversations, getMessages, sendMessage } from '../../api';

const MessagesChat = () => {
    const [conversations, setConversations] = useState([]);
    const [messages, setMessages] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [msgInput, setMsgInput] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const userStr = localStorage.getItem('hire_user');

    useEffect(() => {
        const fetchConvos = async () => {
            try {
                const res = await getConversations();
                setConversations(res.data);
                if (res.data.length > 0) setActiveId(res.data[0].userId);
            } catch (err) {
                console.error("Fetch convos err:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchConvos();
    }, []);

    useEffect(() => {
        if (!activeId) return;
        const fetchChat = async () => {
            try {
                const res = await getMessages(activeId);
                setMessages(res.data);
                scrollToBottom();
            } catch (err) {
                console.error("Fetch messages err:", err);
            }
        };
        fetchChat();
    }, [activeId]);

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleSend = async () => {
        if (!msgInput.trim() || !activeId) return;
        const previousMsg = msgInput;
        setMsgInput('');

        // Optimistic UI update
        const fakeTime = new Date().toISOString();
        setMessages(prev => [...prev, { _id: Date.now(), from: 'me', text: previousMsg, time: fakeTime }]);
        scrollToBottom();

        try {
            await sendMessage({ receiverId: activeId, text: previousMsg });
            const res = await getConversations();
            setConversations(res.data);
        } catch (err) {
            console.error("Send msg err:", err);
        }
    };

    const activeConvo = conversations.find(c => c.userId === activeId);

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user") || '{"name":"Guest"}').name)} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header"><h1>Messages</h1></div>
                <div className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'grid', gridTemplateColumns: '320px 1fr', height: 'calc(100vh - 180px)' }}>
                    {/* Sidebar */}
                    <div style={{ borderRight: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
                            <div className="search-bar"><HiOutlineSearch className="search-icon" /><input placeholder="Search conversations..." /></div>
                        </div>
                        <div style={{ flex: 1, overflowY: 'auto' }}>
                            {loading ? <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div> :
                                conversations.length === 0 ? <div style={{ padding: '20px', textAlign: 'center', color: 'var(--grey-500)' }}>No active conversations</div> :
                                    conversations.map((c) => (
                                        <div key={c._id} onClick={() => setActiveId(c.userId)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', cursor: 'pointer', borderBottom: '1px solid var(--border-color)', background: activeId === c.userId ? 'var(--bg-glass)' : 'transparent', transition: 'background 0.2s' }}>
                                            <div style={{ position: 'relative' }}><div className="avatar">{c.name[0]}</div>{c.online && <div style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', background: 'var(--white)', border: '2px solid var(--bg-primary)' }}></div>}</div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{c.name}</span><span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{new Date(c.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
                                                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.role || ''}</div>
                                                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.lastMsg}</div>
                                            </div>
                                            {c.unread > 0 && <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--white)', color: 'var(--black)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700 }}>{c.unread}</div>}
                                        </div>
                                    ))}
                        </div>
                    </div>
                    {/* Chat */}
                    {activeConvo ? (
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div className="avatar">{activeConvo.name[0]}</div>
                                <div><div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{activeConvo.name}</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{activeConvo.role || ''} · {activeConvo.online ? 'Online' : 'Offline'}</div></div>
                            </div>
                            <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {messages.map((m) => (
                                    <div key={m._id} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start' }}>
                                        <div style={{ maxWidth: '65%', padding: '12px 16px', borderRadius: 'var(--radius-md)', background: m.from === 'me' ? 'var(--white)' : 'var(--bg-glass)', color: m.from === 'me' ? 'var(--black)' : 'var(--text-primary)', fontSize: 'var(--fs-sm)' }}>
                                            {m.text}
                                            <div style={{ fontSize: 'var(--fs-xs)', marginTop: '4px', opacity: 0.5, textAlign: 'right' }}>{new Date(m.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <button className="btn-icon" style={{ flexShrink: 0 }}><HiOutlinePaperClip /></button>
                                <button className="btn-icon" style={{ flexShrink: 0 }}><HiOutlineEmojiHappy /></button>
                                <input className="input-field" placeholder="Type a message..." value={msgInput} onChange={e => setMsgInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} style={{ flex: 1 }} />
                                <button className="btn btn-primary" style={{ flexShrink: 0 }} onClick={handleSend}><HiOutlinePaperAirplane /></button>
                            </div>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', flexDirection: 'column' }}>
                            <HiOutlineSearch style={{ fontSize: '48px', opacity: 0.2, marginBottom: '16px' }} />
                            <h3>Select a conversation</h3>
                            <p>Choose a contact from the list to start chatting.</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default MessagesChat;

