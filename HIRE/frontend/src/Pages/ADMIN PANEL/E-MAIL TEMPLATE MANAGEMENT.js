import React from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';

const EmailTemplateManagement = () => (
    <DashboardLayout sidebarLinks={adminLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Admin"}').name)} userRole="Administrator">
        <div className="page-wrapper">
            <div className="page-header"><h1>E-Mail Template Management</h1><p>Create and manage email templates</p></div>
            <div className="glass-card"><div className="empty-state"><div className="empty-icon">🚧</div><div className="empty-title">Under Development</div><div className="empty-desc">This feature is currently being built and will be available soon.</div></div></div>
        </div>
    </DashboardLayout>
);

export default EmailTemplateManagement;

