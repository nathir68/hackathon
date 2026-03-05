import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';
import { HiOutlineDownload, HiOutlineCloudUpload } from 'react-icons/hi';
import API from '../../api';

const Backup = () => {
    const [backups, setBackups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);
    const [backupType, setBackupType] = useState('Full Backup');
    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Admin' };

    useEffect(() => {
        fetchBackups();
    }, []);

    const fetchBackups = async () => {
        try {
            const res = await API.get('/admin/backups');
            setBackups(res.data);
        } catch (err) {
            console.error('Error fetching backups:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateBackup = async () => {
        setCreating(true);
        try {
            await API.post('/admin/backups', { name: backupType, type: 'Manual' });
            fetchBackups();
            alert('Backup created successfully!');
        } catch (err) {
            console.error('Error creating backup:', err);
            alert('Failed to create backup.');
        } finally {
            setCreating(false);
        }
    };
    return (
        <DashboardLayout sidebarLinks={adminLinks} userName={user.name} userRole="Administrator">
            <div className="page-wrapper">
                <div className="page-header"><h1>System Backup</h1><p>Manage database and file backups</p></div>
                <div className="grid-3" style={{ marginBottom: '24px' }}>
                    {[{ l: 'Last Backup', v: backups.length ? new Date(backups[0].createdAt).toLocaleDateString() : 'Never' }, { l: 'Total Backups', v: backups.length }, { l: 'Storage Used', v: '45.2 GB' }].map((s, i) => (
                        <div className="stat-card" key={i}><div className="stat-value">{s.v}</div><div className="stat-label">{s.l}</div></div>
                    ))}
                </div>

                <div className="grid-2" style={{ marginBottom: '24px' }}>
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Create Backup</h3>
                        <div className="auth-form">
                            <div className="input-group"><label>Backup Type</label><select className="select-field" value={backupType} onChange={e => setBackupType(e.target.value)}><option>Full Backup</option><option>Database Only</option><option>Files Only</option></select></div>
                            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleCreateBackup} disabled={creating}><HiOutlineCloudUpload /> {creating ? 'Creating...' : 'Create Backup Now'}</button>
                        </div>
                    </div>
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>Auto-Backup Schedule</h3>
                        <div className="auth-form">
                            <div className="input-group"><label>Frequency</label><select className="select-field"><option>Daily</option><option>Weekly</option><option>Monthly</option></select></div>
                            <div className="input-group"><label>Time</label><input className="input-field" type="time" defaultValue="02:00" /></div>
                            <div className="input-group"><label>Retention (days)</label><input className="input-field" type="number" defaultValue="30" /></div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span style={{ fontSize: 'var(--fs-sm)' }}>Auto-Backup Enabled</span><div className="toggle active"></div></div>
                        </div>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="data-table">
                        <thead><tr><th>Backup</th><th>Date</th><th>Size</th><th>Type</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
                            ) : backups.length === 0 ? (
                                <tr><td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>No backups found.</td></tr>
                            ) : (
                                backups.map((b, i) => (
                                    <tr key={b._id || i}><td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{b.name}</td><td>{new Date(b.createdAt).toLocaleString()}</td><td>{b.size}</td><td><span className="badge badge-outline">{b.type}</span></td><td><span className="badge badge-outline">{b.status}</span></td><td><button className="btn btn-ghost btn-sm" onClick={() => alert('Download starting...')}><HiOutlineDownload /> Download</button></td></tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Backup;

