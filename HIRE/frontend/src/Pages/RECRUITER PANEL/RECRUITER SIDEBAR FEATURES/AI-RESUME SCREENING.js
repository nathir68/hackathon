import React from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';

const AIResumeScreening = () => (
    <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Recruiter">
        <div className="page-wrapper">
            <div className="page-header"><h1>AI Resume Screening</h1><p>AI-powered resume screening and filtering</p></div>
            <div className="glass-card"><div className="empty-state"><div className="empty-icon">🚧</div><div className="empty-title">Under Development</div><div className="empty-desc">This feature is currently being built and will be available soon.</div></div></div>
        </div>
    </DashboardLayout>
);

export default AIResumeScreening;

