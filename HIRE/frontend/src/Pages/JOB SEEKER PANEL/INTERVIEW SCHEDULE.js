import React from 'react';
import DashboardLayout from '../Components/DashboardLayout';
import { seekerLinks } from '../Components/SidebarLinks';
import { HiOutlineVideoCamera, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

const upcoming = [
    { company: 'TechCorp', role: 'Senior React Developer', date: 'Mar 8, 2026', time: '10:00 AM', type: 'Video', interviewer: 'Sarah Chen' },
    { company: 'DesignHub', role: 'Product Designer', date: 'Mar 10, 2026', time: '2:00 PM', type: 'Phone', interviewer: 'Mike Brooks' },
    { company: 'DataFlow', role: 'Data Scientist', date: 'Mar 15, 2026', time: '11:30 AM', type: 'In-person', interviewer: 'James Lee' },
];

const past = [
    { company: 'WebScale', role: 'Full Stack Developer', date: 'Feb 25, 2026', status: 'Completed', outcome: 'Passed' },
    { company: 'CloudBase', role: 'DevOps Engineer', date: 'Feb 20, 2026', status: 'Completed', outcome: 'Rejected' },
];

const typeIcon = { Video: <HiOutlineVideoCamera />, Phone: <HiOutlinePhone />, 'In-person': <HiOutlineLocationMarker /> };

const InterviewSchedule = () => (
    <DashboardLayout sidebarLinks={seekerLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Job Seeker">
        <div className="page-wrapper">
            <div className="page-header"><h1>Interview Schedule</h1><p>Manage your upcoming and past interviews</p></div>
            <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Upcoming Interviews</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {upcoming.map((i, idx) => (
                    <div className="glass-card" key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div className="avatar-lg" style={{ background: 'var(--grey-800)', border: '1px solid var(--border-color)' }}>{i.company[0]}</div>
                            <div>
                                <div style={{ fontWeight: 700 }}>{i.role}</div>
                                <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{i.company} · {i.interviewer}</div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{i.date}</div>
                            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>at {i.time}</div>
                            <span className="badge badge-outline" style={{ marginTop: '6px' }}>{typeIcon[i.type]} {i.type}</span>
                        </div>
                    </div>
                ))}
            </div>
            <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Past Interviews</h3>
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="data-table">
                    <thead><tr><th>Company</th><th>Position</th><th>Date</th><th>Outcome</th></tr></thead>
                    <tbody>
                        {past.map((p, i) => (
                            <tr key={i}><td>{p.company}</td><td>{p.role}</td><td>{p.date}</td><td><span className="badge badge-outline">{p.outcome}</span></td></tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </DashboardLayout>
);

export default InterviewSchedule;

