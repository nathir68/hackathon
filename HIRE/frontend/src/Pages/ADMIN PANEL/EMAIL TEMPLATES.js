import React, { useState, useEffect } from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';
import { HiOutlinePencil, HiOutlineEye, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import { getEmailTemplates, createEmailTemplate, updateEmailTemplate, deleteEmailTemplate } from '../../api';

const EmailTemplates = () => {
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [formData, setFormData] = useState({ name: '', subject: '', trigger: '', bodyHtml: '' });
    const userStr = localStorage.getItem('hire_user');
    const user = userStr ? JSON.parse(userStr) : { name: 'Admin' };

    useEffect(() => {
        fetchTemplates();
    }, []);

    const fetchTemplates = async () => {
        try {
            const res = await getEmailTemplates();
            setTemplates(res.data);
        } catch (err) {
            console.error('Error fetching templates:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (tmpl) => {
        setEditing(tmpl._id || 'new');
        setFormData(tmpl._id ? { name: tmpl.name, subject: tmpl.subject, trigger: tmpl.trigger, bodyHtml: tmpl.bodyHtml } : { name: '', subject: '', trigger: 'Manual', bodyHtml: '' });
    };

    const handleSave = async () => {
        try {
            if (editing === 'new') {
                await createEmailTemplate(formData);
            } else {
                await updateEmailTemplate(editing, formData);
            }
            setEditing(null);
            fetchTemplates();
        } catch (err) {
            console.error('Error saving template:', err);
            alert('Failed to save template. Name must be unique.');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this template?')) return;
        try {
            await deleteEmailTemplate(id);
            fetchTemplates();
        } catch (err) {
            console.error('Error deleting template:', err);
        }
    };

    return (
        <DashboardLayout sidebarLinks={adminLinks} userName={user.name} userRole="Administrator">
            <div className="page-wrapper">
                <div className="page-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <div><h1>Email Templates</h1><p>Manage system email templates</p></div>
                    {editing === null && <button className="btn btn-primary" onClick={() => handleEdit({})}><HiOutlinePlus /> Create Template</button>}
                </div>

                {editing !== null ? (
                    <div className="glass-card">
                        <h3 style={{ fontWeight: 700, marginBottom: '20px' }}>{editing === 'new' ? 'New Template' : 'Edit Template'}</h3>
                        <div className="auth-form">
                            <div className="input-group"><label>Template Name</label><input className="input-field" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} /></div>
                            <div className="input-group"><label>Subject Line</label><input className="input-field" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} /></div>
                            <div className="input-group"><label>Trigger Event</label><select className="select-field" value={formData.trigger} onChange={e => setFormData({ ...formData, trigger: e.target.value })}><option>Registration</option><option>Forgot Password</option><option>Job Apply</option><option>Interview Created</option><option>Manual</option></select></div>
                            <div className="input-group"><label>Email Body (HTML)</label><textarea className="textarea-field" rows={12} value={formData.bodyHtml} onChange={e => setFormData({ ...formData, bodyHtml: e.target.value })} /></div>
                            <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Variables: {'{name}'}, {'{email}'}, {'{company}'}, {'{job_title}'}, {'{verify_link}'}</p>
                            <div style={{ display: 'flex', gap: '12px' }}><button className="btn btn-primary" onClick={handleSave}>Save Template</button><button className="btn btn-secondary" onClick={() => setEditing(null)}>Cancel</button></div>
                        </div>
                    </div>
                ) : (
                    <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                        <table className="data-table">
                            <thead><tr><th>Template</th><th>Subject</th><th>Trigger</th><th>Last Edited</th><th>Actions</th></tr></thead>
                            <tbody>
                                {loading ? (
                                    <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
                                ) : templates.length === 0 ? (
                                    <tr><td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>No templates found.</td></tr>
                                ) : (
                                    templates.map((t, i) => (
                                        <tr key={t._id || i}>
                                            <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{t.name}</td>
                                            <td>{t.subject}</td>
                                            <td><span className="badge badge-outline">{t.trigger}</span></td>
                                            <td>{new Date(t.updatedAt || t.createdAt || Date.now()).toLocaleDateString()}</td>
                                            <td><div style={{ display: 'flex', gap: '4px' }}><button className="btn-icon" onClick={() => handleEdit(t)}><HiOutlinePencil /></button><button className="btn-icon" onClick={() => handleDelete(t._id)}><HiOutlineTrash /></button></div></td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default EmailTemplates;

