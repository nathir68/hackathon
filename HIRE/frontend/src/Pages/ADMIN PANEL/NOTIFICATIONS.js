import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';
import { HiOutlineSearch, HiOutlineBell } from 'react-icons/hi';
import { getNotifications, markAllRead } from '../../api';

const AdminNotifications = () => {
    const [notifs, setNotifs] = useState([]);
    const [loading, setLoading] = useState(true);
    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Admin' };

    useEffect(() => {
        const fetchNotifs = async () => {
            try {
                const res = await getNotifications();
                setNotifs(res.data);
            } catch (err) {
                console.error('Error fetching notifications:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifs();
    }, []);

    const handleMarkAllRead = async () => {
        try {
            await markAllRead();
            setNotifs(prev => prev.map(n => ({ ...n, read: true })));
        } catch (err) {
            console.error('Error marking all read:', err);
        }
    };

    return (
        <DashboardLayout sidebarLinks={adminLinks} userName={user.name} userRole="Administrator">
            <div className="page-wrapper">
                <div className="page-header-row">
                    <div><h1 style={{ fontSize: 'var(--fs-3xl)', fontWeight: 800 }}>Notifications</h1><p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>System alerts and notifications</p></div>
                    <button className="btn btn-secondary" onClick={handleMarkAllRead}>Mark All Read</button>
                </div>
                <div className="search-bar" style={{ marginBottom: '24px' }}><HiOutlineSearch className="search-icon" /><input placeholder="Search notifications..." /></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {loading ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading...</div>
                    ) : notifs.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>No notifications yet.</div>
                    ) : (
                        notifs.map((n, i) => (
                            <div className="glass-card" key={n._id || i} style={{ display: 'flex', alignItems: 'center', gap: '16px', opacity: n.read ? 0.6 : 1, borderColor: n.read ? 'var(--border-color)' : 'var(--white)' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: n.read ? 'transparent' : 'var(--white)', flexShrink: 0 }}></div>
                                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><HiOutlineBell /></div>
                                <div style={{ flex: 1 }}><div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{n.title}</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{n.description}</div></div>
                                <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', flexShrink: 0 }}>{new Date(n.createdAt).toLocaleString()}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminNotifications;
