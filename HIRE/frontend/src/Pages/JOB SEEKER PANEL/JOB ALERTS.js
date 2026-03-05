import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { seekerLinks } from '../Components/SidebarLinks';
import { HiOutlinePlus, HiOutlineTrash, HiOutlinePencil } from 'react-icons/hi';
import { getJobAlerts, createJobAlert, deleteJobAlert, updateJobAlert } from '../../api';

const JobAlerts = () => {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ keywords: '', location: '', type: 'Full-time', frequency: 'Daily' });
    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Guest' };

    const fetchAlerts = async () => {
        try {
            const res = await getJobAlerts();
            setAlerts(res.data);
        } catch (err) {
            console.error('Fetch alerts failed:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    const handleCreateAlert = async () => {
        try {
            await createJobAlert(formData);
            setShowModal(false);
            fetchAlerts();
            setFormData({ keywords: '', location: '', type: 'Full-time', frequency: 'Daily' });
        } catch (err) {
            console.error('Create alert failed:', err);
        }
    };

    const handleDeleteAlert = async (id) => {
        if (!window.confirm('Delete this job alert?')) return;
        try {
            await deleteJobAlert(id);
            fetchAlerts();
        } catch (err) {
            console.error('Delete alert failed:', err);
        }
    };

    const handleToggleAlert = async (id) => {
        try {
            await updateJobAlert(id, {}); // Maps to our toggle endpoint
            fetchAlerts();
        } catch (err) {
            console.error('Toggle alert failed:', err);
        }
    };

    return (
        <DashboardLayout sidebarLinks={seekerLinks} userName={user.name} userRole="Job Seeker">
            <div className="page-wrapper">
                <div className="page-header-row">
                    <div><h1 style={{ fontSize: 'var(--fs-3xl)', fontWeight: 800 }}>Job Alerts</h1><p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Get notified when matching jobs are posted</p></div>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}><HiOutlinePlus /> Create Alert</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {loading ? (
                        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)' }}>Loading job alerts...</div>
                    ) : alerts.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', background: 'var(--grey-800)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔔</div>
                            <h3 style={{ marginBottom: '8px' }}>No Job Alerts</h3>
                            <p style={{ color: 'var(--text-secondary)' }}>Create an alert to get notified of new opportunities.</p>
                        </div>
                    ) : alerts.map((a, i) => (
                        <div className="glass-card" key={a._id || i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div>
                                <div style={{ fontWeight: 700, marginBottom: '4px' }}>{a.keywords}</div>
                                <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)' }}>{a.location} · {a.type} · {a.frequency}</div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div className={`toggle ${a.active ? 'active' : ''}`} onClick={() => handleToggleAlert(a._id)}></div>
                                <button className="btn-icon" onClick={() => handleDeleteAlert(a._id)}><HiOutlineTrash /></button>
                            </div>
                        </div>
                    ))}
                </div>
                {showModal && (
                    <div className="modal-overlay" onClick={() => setShowModal(false)}>
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <h3 style={{ marginBottom: '20px', fontWeight: 700 }}>Create Job Alert</h3>
                            <div className="auth-form">
                                <div className="input-group"><label>Keywords</label><input className="input-field" value={formData.keywords} onChange={e => setFormData({ ...formData, keywords: e.target.value })} placeholder="e.g. React Developer" /></div>
                                <div className="input-group"><label>Location</label><input className="input-field" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} placeholder="City or Remote" /></div>
                                <div className="input-group"><label>Job Type</label><select className="select-field" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}><option>Full-time</option><option>Part-time</option><option>Remote</option><option>Contract</option></select></div>
                                <div className="input-group"><label>Frequency</label><select className="select-field" value={formData.frequency} onChange={e => setFormData({ ...formData, frequency: e.target.value })}><option>Instant</option><option>Daily</option><option>Weekly</option></select></div>
                                <button className="btn btn-primary btn-lg" style={{ width: '100%' }} onClick={handleCreateAlert}>Create Alert</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default JobAlerts;

