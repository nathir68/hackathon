import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlineUser, HiOutlineStar, HiOutlineClock } from 'react-icons/hi';

const initialColumns = {
    applied: {
        title: 'Applied', color: 'rgba(255,255,255,0.06)',
        items: [
            { id: '1', name: 'Emma Wilson', role: 'React Dev', score: 82, time: '2d ago' },
            { id: '2', name: 'James Lee', role: 'Frontend', score: 75, time: '3d ago' },
            { id: '3', name: 'Priya Patel', role: 'UI Engineer', score: 88, time: '1d ago' },
        ]
    },
    screening: {
        title: 'Screening', color: 'rgba(255,255,255,0.08)',
        items: [
            { id: '4', name: 'Alice Johnson', role: 'Sr. Dev', score: 92, time: '1d ago' },
            { id: '5', name: 'Tom Brown', role: 'Full Stack', score: 85, time: '4d ago' },
        ]
    },
    interview: {
        title: 'Interview', color: 'rgba(255,255,255,0.10)',
        items: [
            { id: '6', name: 'Sarah Kim', role: 'Frontend Lead', score: 95, time: '5d ago' },
        ]
    },
    offered: {
        title: 'Offered', color: 'rgba(255,255,255,0.12)',
        items: [
            { id: '7', name: 'David Chen', role: 'Sr. Engineer', score: 96, time: '1w ago' },
        ]
    },
    hired: {
        title: 'Hired', color: 'rgba(255,255,255,0.15)',
        items: []
    },
};

const KanbanTracker = () => {
    const [columns, setColumns] = useState(initialColumns);
    const [dragItem, setDragItem] = useState(null);
    const [dragOverCol, setDragOverCol] = useState(null);

    const onDragStart = (colKey, itemIdx) => {
        setDragItem({ colKey, itemIdx });
    };

    const onDragOver = (e, colKey) => {
        e.preventDefault();
        setDragOverCol(colKey);
    };

    const onDrop = (targetCol) => {
        if (!dragItem || dragItem.colKey === targetCol) {
            setDragItem(null);
            setDragOverCol(null);
            return;
        }
        const newCols = JSON.parse(JSON.stringify(columns));
        const [movedItem] = newCols[dragItem.colKey].items.splice(dragItem.itemIdx, 1);
        newCols[targetCol].items.push(movedItem);
        setColumns(newCols);
        setDragItem(null);
        setDragOverCol(null);
    };

    const totalCandidates = Object.values(columns).reduce((sum, c) => sum + c.items.length, 0);

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header-row">
                    <div>
                        <h1 style={{ fontSize: 'var(--fs-3xl)', fontWeight: 800, marginBottom: '4px' }}>Application Tracker</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>Drag candidates between stages · {totalCandidates} total candidates</p>
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '16px', minHeight: '500px' }}>
                    {Object.entries(columns).map(([colKey, col]) => (
                        <div
                            key={colKey}
                            onDragOver={e => onDragOver(e, colKey)}
                            onDrop={() => onDrop(colKey)}
                            onDragLeave={() => setDragOverCol(null)}
                            style={{
                                flex: '1 0 220px', minWidth: '220px', display: 'flex', flexDirection: 'column',
                                background: dragOverCol === colKey ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.02)',
                                border: `1px solid ${dragOverCol === colKey ? 'rgba(255,255,255,0.2)' : 'var(--border-color)'}`,
                                borderRadius: 'var(--radius-lg)', padding: '16px', transition: 'all 0.3s',
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <div style={{ fontWeight: 700, fontSize: 'var(--fs-sm)' }}>{col.title}</div>
                                <span className="badge badge-default">{col.items.length}</span>
                            </div>

                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {col.items.map((item, idx) => (
                                    <div
                                        key={item.id}
                                        draggable
                                        onDragStart={() => onDragStart(colKey, idx)}
                                        style={{
                                            padding: '14px', background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                                            borderRadius: 'var(--radius-md)', cursor: 'grab', transition: 'all 0.2s',
                                            opacity: dragItem?.colKey === colKey && dragItem?.itemIdx === idx ? 0.4 : 1,
                                        }}
                                        onMouseOver={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                        onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'none'; }}
                                    >
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                            <div className="avatar avatar-sm">{item.name[0]}</div>
                                            <div>
                                                <div style={{ fontWeight: 600, fontSize: 'var(--fs-sm)' }}>{item.name}</div>
                                                <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{item.role}</div>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><HiOutlineStar /> {item.score}%</span>
                                            <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}><HiOutlineClock /> {item.time}</span>
                                        </div>
                                    </div>
                                ))}

                                {col.items.length === 0 && (
                                    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', padding: '24px', color: 'var(--text-muted)', fontSize: 'var(--fs-xs)' }}>
                                        Drop candidates here
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default KanbanTracker;

