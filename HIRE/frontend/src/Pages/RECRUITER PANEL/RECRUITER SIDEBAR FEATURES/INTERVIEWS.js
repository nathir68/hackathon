import React from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlineVideoCamera, HiOutlinePhone, HiOutlineLocationMarker, HiOutlinePlus } from 'react-icons/hi';

const upcoming = [
    { candidate: 'Alice Johnson', role: 'Sr. React Developer', date: 'Mar 8, 2026', time: '10:00 AM', type: 'Video', round: 'Technical' },
    { candidate: 'Bob Williams', role: 'Sr. React Developer', date: 'Mar 9, 2026', time: '2:00 PM', type: 'Phone', round: 'HR' },
    { candidate: 'Carol Smith', role: 'Backend Engineer', date: 'Mar 10, 2026', time: '11:00 AM', type: 'In-person', round: 'Final' },
];

const past = [
    { candidate: 'David Brown', role: 'Product Designer', date: 'Mar 1', outcome: 'Passed', notes: 'Strong portfolio, good cultural fit' },
    { candidate: 'Emma Davis', role: 'Backend Engineer', date: 'Feb 28', outcome: 'Rejected', notes: 'Insufficient system design experience' },
];

const RecruiterInterviews = () => (
    <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Recruiter">
        <div className="page-wrapper">
            <div className="page-header-row">
                <div><h1 style={{ fontSize: 'var(--fs-3xl)', fontWeight: 800 }}>Interviews</h1><p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Schedule and manage candidate interviews</p></div>
                <button className="btn btn-primary"><HiOutlinePlus /> Schedule Interview</button>
            </div>

            <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Upcoming</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                {upcoming.map((i, idx) => (
                    <div className="glass-card" key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div className="avatar-lg">{i.candidate[0]}</div>
                            <div>
                                <div style={{ fontWeight: 700 }}>{i.candidate}</div>
                                <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{i.role} · {i.round} Round</div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{i.date} at {i.time}</div>
                            <span className="badge badge-outline" style={{ marginTop: '4px' }}>{i.type === 'Video' ? <HiOutlineVideoCamera /> : i.type === 'Phone' ? <HiOutlinePhone /> : <HiOutlineLocationMarker />} {i.type}</span>
                        </div>
                    </div>
                ))}
            </div>

            <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Past</h3>
            <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
                <table className="data-table">
                    <thead><tr><th>Candidate</th><th>Position</th><th>Date</th><th>Outcome</th><th>Notes</th></tr></thead>
                    <tbody>
                        {past.map((p, i) => <tr key={i}><td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{p.candidate}</td><td>{p.role}</td><td>{p.date}</td><td><span className="badge badge-outline">{p.outcome}</span></td><td style={{ maxWidth: '200px' }}>{p.notes}</td></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </DashboardLayout>
);

export default RecruiterInterviews;

