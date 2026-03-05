import React from 'react';
import Sidebar from './Sidebar';
import './DashboardLayout.css';

const DashboardLayout = ({ children, sidebarLinks, sectionTitle, userName, userRole }) => {
    return (
        <div className="dashboard-layout">
            <Sidebar links={sidebarLinks} sectionTitle={sectionTitle} userName={userName} userRole={userRole} />
            <main className="dashboard-main">
                <div className="dashboard-content">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
