import React, { useState } from 'react';
import DashboardLayout from '../../Components/DashboardLayout';
import { recruiterLinks } from '../../Components/SidebarLinks';
import { HiOutlineCheck } from 'react-icons/hi';

const plans = [
    { name: 'Starter', price: '$0', period: '/month', features: ['3 job posts', '50 applications', 'Basic analytics', 'Email support'], current: false },
    { name: 'Professional', price: '$49', period: '/month', features: ['Unlimited jobs', 'Unlimited apps', 'AI screening', 'Priority support', 'Bulk emails'], current: true },
    { name: 'Enterprise', price: '$149', period: '/month', features: ['Everything in Pro', 'Custom branding', 'API access', 'Dedicated manager', 'SSO'], current: false },
];

const Subscription = () => {
    const [billing, setBilling] = useState('monthly');

    return (
        <DashboardLayout sidebarLinks={recruiterLinks} userName={(JSON.parse(localStorage.getItem("hire_user")||'{"name":"Guest"}').name)} userRole="Recruiter">
            <div className="page-wrapper">
                <div className="page-header"><h1>Subscription</h1><p>Manage your plan and billing</p></div>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
                    <div className="tabs"><button className={`tab ${billing === 'monthly' ? 'active' : ''}`} onClick={() => setBilling('monthly')}>Monthly</button><button className={`tab ${billing === 'yearly' ? 'active' : ''}`} onClick={() => setBilling('yearly')}>Yearly (Save 20%)</button></div>
                </div>
                <div className="grid-3" style={{ marginBottom: '32px' }}>
                    {plans.map((p, i) => (
                        <div key={i} className="glass-card" style={{ textAlign: 'center', border: p.current ? '1px solid var(--white)' : '1px solid var(--border-color)', position: 'relative' }}>
                            {p.current && <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--white)', color: 'var(--black)', padding: '4px 16px', borderRadius: 'var(--radius-full)', fontSize: 'var(--fs-xs)', fontWeight: 700 }}>Current Plan</div>}
                            <h3 style={{ fontWeight: 700, marginBottom: '8px', marginTop: p.current ? '12px' : '0' }}>{p.name}</h3>
                            <div style={{ fontSize: 'var(--fs-4xl)', fontWeight: 900, marginBottom: '4px' }}>{billing === 'yearly' ? `$${Math.round(parseInt(p.price.replace('$', '')) * 0.8)}` : p.price}</div>
                            <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', marginBottom: '24px' }}>{p.period}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px', textAlign: 'left' }}>
                                {p.features.map((f, j) => <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}><HiOutlineCheck style={{ flexShrink: 0 }} /> {f}</div>)}
                            </div>
                            <button className={`btn ${p.current ? 'btn-secondary' : 'btn-primary'} btn-lg`} style={{ width: '100%' }}>{p.current ? 'Current Plan' : 'Upgrade'}</button>
                        </div>
                    ))}
                </div>
                <div className="glass-card">
                    <h3 style={{ fontWeight: 700, marginBottom: '16px' }}>Billing History</h3>
                    <table className="data-table">
                        <thead><tr><th>Date</th><th>Plan</th><th>Amount</th><th>Status</th><th>Invoice</th></tr></thead>
                        <tbody>
                            {[['Mar 1, 2026', 'Professional', '$49', 'Paid'], ['Feb 1, 2026', 'Professional', '$49', 'Paid'], ['Jan 1, 2026', 'Professional', '$49', 'Paid']].map((r, i) => (
                                <tr key={i}><td>{r[0]}</td><td>{r[1]}</td><td style={{ fontWeight: 600 }}>{r[2]}</td><td><span className="badge badge-outline">{r[3]}</span></td><td><button className="btn btn-ghost btn-sm">Download</button></td></tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Subscription;

