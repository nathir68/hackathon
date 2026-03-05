import React from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';

const SkillGapAnalysis = () => (
    <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Recruiter">
        <div className="page-wrapper">
            <div className="page-header"><h1>Skill Gap Analysis</h1><p>Identify skill gaps in candidate profiles</p></div>
            <div className="glass-card"><div className="empty-state"><div className="empty-icon">🚧</div><div className="empty-title">Under Development</div><div className="empty-desc">This feature is currently being built and will be available soon.</div></div></div>
        </div>
    </DashboardLayout>
);

export default SkillGapAnalysis;

