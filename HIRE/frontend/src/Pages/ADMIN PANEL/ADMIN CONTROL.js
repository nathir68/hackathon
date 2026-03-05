import React from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { adminLinks } from '../Components/SidebarLinks';
import { HiOutlineSearch, HiOutlinePlus, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';

const admins = [];

const AdminControl = () => (
    <DashboardLayout sidebarLinks={adminLinks} userName={(JSON.parse(localStorage.getItem("hire_user") || '{"name":"Admin"}').name)} userRole="Administrator">
        <div className="page-wrapper">
            <div className="page-header-row">
                <div><h1 style={{ fontSize: 'var(--fs-3xl)', fontWeight: 800 }}>Admin Control</h1><p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Manage administrator accounts</p></div>
                <button className="btn btn-primary"><HiOutlinePlus /> Add Admin</button>
            </div>
            <div className="search-bar" style={{ marginBottom: '24px' }}><HiOutlineSearch className="search-icon" /><input placeholder="Search admins..." /></div>
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="data-table">
                    <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Last Login</th><th>Status</th><th>Actions</th></tr></thead>
                    <tbody>
                        {admins.map((a, i) => (
                            <tr key={i}>
                                <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div className="avatar-sm">{a.name[0]}</div>{a.name}</div></td>
                                <td>{a.email}</td><td><span className="badge badge-outline">{a.role}</span></td><td>{a.lastLogin}</td>
                                <td><span className="badge badge-outline">{a.status}</span></td>
                                <td><div style={{ display: 'flex', gap: '4px' }}><button className="btn-icon"><HiOutlinePencil /></button><button className="btn-icon"><HiOutlineTrash /></button></div></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </DashboardLayout>
);

export default AdminControl;

