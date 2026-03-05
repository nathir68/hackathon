import React from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';

const SendBulkEmails = () => (
    <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Recruiter">
        <div className="page-wrapper">
            <div className="page-header"><h1>Send Bulk Emails</h1><p>Send bulk email campaigns to candidates</p></div>
            <div className="glass-card"><div className="empty-state"><div className="empty-icon">🚧</div><div className="empty-title">Under Development</div><div className="empty-desc">This feature is currently being built and will be available soon.</div></div></div>
        </div>
    </DashboardLayout>
);

export default SendBulkEmails;

