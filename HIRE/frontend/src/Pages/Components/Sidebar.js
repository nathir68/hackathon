import React from 'react';
import { NavLink } from 'react-router-dom';
import { HiOutlineSparkles } from 'react-icons/hi';
import './Sidebar.css';

const Sidebar = ({ links, sectionTitle, userName, userRole }) => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-icon"><HiOutlineSparkles /></div>
                <span className="logo-text">HIRE</span>
            </div>
            <nav className="sidebar-nav">
                {sectionTitle && <div className="sidebar-section-title">{sectionTitle}</div>}
                {links.map((link, i) => (
                    link.section ? (
                        <div className="sidebar-section-title" key={i}>{link.section}</div>
                    ) : (
                        <NavLink
                            key={i}
                            to={link.path}
                            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
                        >
                            <span className="link-icon">{link.icon}</span>
                            <span>{link.label}</span>
                        </NavLink>
                    )
                ))}
            </nav>
            <div className="sidebar-footer">
                <div className="sidebar-user">
                    <div className="avatar">{(userName || 'U')[0]}</div>
                    <div className="sidebar-user-info">
                        <div className="user-name">{userName || 'User'}</div>
                        <div className="user-role">{userRole || 'Member'}</div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
