import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { sendBulkEmail } from '../../../api';

const SendBulkEmails = () => {
    const [recipients, setRecipients] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: '', text: '' });

        try {
            await sendBulkEmail({ recipients, subject, message });
            setStatus({ type: 'success', text: 'Emails sent successfully!' });
            setRecipients('');
            setSubject('');
            setMessage('');
        } catch (error) {
            setStatus({
                type: 'error',
                text: error.response?.data?.message || 'Failed to send bulk emails.'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user") || '{"name":"Guest"}').name)} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header">
                    <h1>Send Bulk Emails</h1>
                    <p>Send bulk email campaigns to multiple candidates at once</p>
                </div>

                <div className="glass-card">
                    {status.text && (
                        <div style={{
                            padding: '12px',
                            marginBottom: '20px',
                            borderRadius: '8px',
                            backgroundColor: status.type === 'success' ? 'rgba(46, 213, 115, 0.1)' : 'rgba(255, 71, 87, 0.1)',
                            color: status.type === 'success' ? '#2ed573' : '#ff4757',
                            border: `1px solid ${status.type === 'success' ? 'rgba(46, 213, 115, 0.3)' : 'rgba(255, 71, 87, 0.3)'}`
                        }}>
                            {status.text}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group" style={{ marginBottom: '20px' }}>
                            <label>Recipients (Comma-separated emails)</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="candidate1@example.com, candidate2@example.com"
                                value={recipients}
                                onChange={(e) => setRecipients(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group" style={{ marginBottom: '20px' }}>
                            <label>Email Subject</label>
                            <input
                                type="text"
                                className="input-field"
                                placeholder="Interview Invitation - H.I.R.E."
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                required
                            />
                        </div>

                        <div className="input-group" style={{ marginBottom: '24px' }}>
                            <label>Message Body</label>
                            <textarea
                                className="textarea-field"
                                rows={8}
                                placeholder="Type your email message here..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            {loading ? 'Sending...' : 'Send Emails'}
                            {!loading && <span>✈️</span>}
                        </button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default SendBulkEmails;
