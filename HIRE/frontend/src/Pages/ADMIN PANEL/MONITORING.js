import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';
import { getMonitoring } from '../../api';

const Monitoring = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Admin' };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await getMonitoring();
                setStats(res.data);
            } catch (err) {
                console.error('Monitoring error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
        const interval = setInterval(fetchStats, 5000); // refresh every 5s
        return () => clearInterval(interval);
    }, []);

    return (
        <DashboardLayout sidebarLinks={adminLinks} userName={user.name} userRole="Administrator">
            <div className="page-wrapper">
                <div className="page-header"><h1>Server Monitoring</h1><p>Real-time system health and performance</p></div>

                <div className="grid-4" style={{ marginBottom: '24px' }}>
                    {loading || !stats ? (
                        <div style={{ padding: '20px', color: 'var(--text-muted)' }}>Loading live metrics...</div>
                    ) : (
                        <>
                            <div className="stat-card">
                                <div className="stat-value">{stats.cpuUsage}%</div>
                                <div className="stat-label">CPU Usage</div>
                                <div className="progress-bar" style={{ marginTop: '8px' }}><div className="progress-fill" style={{ width: `${Math.min(stats.cpuUsage, 100)}%`, background: stats.cpuUsage > 80 ? 'var(--danger-color)' : 'var(--primary-color)' }}></div></div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-value">{stats.memory?.used} / {stats.memory?.total} GB</div>
                                <div className="stat-label">Memory ({stats.memory?.percentage}%)</div>
                                <div className="progress-bar" style={{ marginTop: '8px' }}><div className="progress-fill" style={{ width: `${stats.memory?.percentage}%`, background: stats.memory?.percentage > 85 ? 'var(--danger-color)' : 'var(--primary-color)' }}></div></div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-value">{stats.platform}</div>
                                <div className="stat-label">OS Platform</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-value">{stats.uptime?.formatted}</div>
                                <div className="stat-label">Server Uptime</div>
                            </div>
                        </>
                    )}
                </div>

                <div className="grid-2" style={{ marginBottom: '24px' }}>
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Service Status</h3>
                        {[['API Server', 'Running', 'Local'], ['Node.js Env', loading ? '...' : stats?.nodeVersion, process.env.NODE_ENV || 'development'], ['Database', 'Running', 'MongoDB']].map(([s, st, lat], i) => (
                            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 2 ? '1px solid var(--border-color)' : 'none' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--white)' }}></div><span style={{ fontSize: 'var(--fs-sm)', fontWeight: 500 }}>{s}</span></div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{lat}</span><span className="badge badge-light">{st}</span></div>
                            </div>
                        ))}
                    </div>
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Live Uptime Monitor</h3>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '180px', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--white)' }}>
                                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'var(--white)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-color)', fontWeight: 800 }}>LIVE</div>
                            </div>
                            <div style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-sm)', marginTop: '12px' }}>Monitoring active. Refreshes every 5s.</div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Monitoring;

