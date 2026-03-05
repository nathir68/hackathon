import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';
import { getSystemSettings, updateSystemSetting } from '../../api';

const SystemSetting = () => {
    const [settings, setSettings] = useState({ siteName: '', maintenanceMode: 'false', maxUploadSize: '5' });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Admin' };

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await getSystemSettings();
                const settingsObj = {};
                res.data.forEach(s => {
                    settingsObj[s.key] = s.value;
                });
                setSettings(prev => ({ ...prev, ...settingsObj }));
            } catch (err) {
                console.error('Error fetching settings:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await Promise.all(Object.entries(settings).map(([key, value]) =>
                updateSystemSetting({ key, value })
            ));
            alert('Settings saved successfully!');
        } catch (err) {
            console.error('Error saving settings:', err);
            alert('Failed to save settings.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <DashboardLayout sidebarLinks={adminLinks} userName={user.name} userRole="Administrator">
            <div className="page-wrapper">
                <div className="page-header"><h1>System Setting</h1><p>Configure system-level settings</p></div>
                <div className="glass-card" style={{ maxWidth: '600px' }}>
                    {loading ? (
                        <div style={{ padding: '20px', textAlign: 'center' }}>Loading settings...</div>
                    ) : (
                        <form className="auth-form" onSubmit={handleSave}>
                            <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>General Configuration</h3>

                            <div className="input-group">
                                <label>Site Name</label>
                                <input className="input-field" name="siteName" value={settings.siteName} onChange={handleChange} placeholder="HIRE Platform" />
                            </div>

                            <div className="input-group">
                                <label>Maintenance Mode</label>
                                <select className="select-field" name="maintenanceMode" value={settings.maintenanceMode} onChange={handleChange}>
                                    <option value="false">Disabled (Live)</option>
                                    <option value="true">Enabled (Offline)</option>
                                </select>
                            </div>

                            <div className="input-group">
                                <label>Max File Upload Size (MB)</label>
                                <input type="number" className="input-field" name="maxUploadSize" value={settings.maxUploadSize} onChange={handleChange} />
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={saving}>
                                {saving ? 'Saving...' : 'Save Settings'}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default SystemSetting;

