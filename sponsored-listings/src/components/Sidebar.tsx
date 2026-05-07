import type { ReactNode } from 'react';
import { Typography, Chip } from './ui';
import * as I from '../icons';

interface NavItem { icon: ReactNode; label: string; badge?: string; chev?: boolean; active?: boolean; }
interface NavGroup { label: string; items: NavItem[]; }

const groups: NavGroup[] = [
  { label: 'Daily operations', items: [
    { icon: <I.Cart/>, label: 'ezCater orders', badge: '3', chev: true },
    { icon: <I.Bag/>, label: 'Relish orders' },
    { icon: <I.Truck/>, label: 'Delivery', chev: true },
  ]},
  { label: 'Business insights', items: [
    { icon: <I.Bars/>, label: 'Operational metrics' },
    { icon: <I.Shield/>, label: 'Reliability Rockstar' },
    { icon: <I.Chat/>, label: 'Reviews' },
    { icon: <I.Gauge/>, label: 'Performance' },
  ]},
  { label: 'Engage customers', items: [
    { icon: <I.Megaphone/>, label: 'Marketing', chev: true, active: true },
  ]},
  { label: 'Manage account', items: [
    { icon: <I.Settings/>, label: 'Settings', chev: true },
    { icon: <I.CreditCard/>, label: 'Financials' },
    { icon: <I.Utensils/>, label: 'Menus' },
  ]},
  { label: 'Support & resources', items: [
    { icon: <I.Book/>, label: 'Training resources' },
    { icon: <I.Chat/>, label: 'Chat with us' },
    { icon: <I.Headset/>, label: '24/7 support' },
  ]},
];

export default function Sidebar() {
  return (
    <aside className="sb flex flex-col" style={{ position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>
      <div className="flex items-center gap-2" style={{ padding: '16px 16px 12px' }}>
        <span className="flex items-center justify-center font-black text-base rounded-[10px] bg-ez-green-700 text-ez-green-300 shrink-0" style={{ width: 32, height: 32 }}>e</span>
        <Typography variant="heading-xs">ezCater</Typography>
        <span className="ml-auto"><Chip variant="default">Partner</Chip></span>
      </div>

      <div className="flex-1" style={{ padding: '4px 8px 12px' }}>
        {groups.map((g, i) => (
          <div key={i} style={{ marginTop: i === 0 ? 0 : 4 }}>
            <div className="sb-group-label">{g.label}</div>
            {g.items.map((it, j) => (
              <button key={j} className="sb-item" data-active={it.active ? 'true' : undefined}>
                <span className="sb-icon">{it.icon}</span>
                <span className="flex-1 truncate">{it.label}</span>
                {it.badge && <Chip variant={it.active ? 'default' : 'success'}>{it.badge}</Chip>}
                {it.chev && <I.Chevron size={14}/>}
              </button>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-col" style={{ padding: 12, borderTop: '1.5px solid var(--peppercorn-100)' }}>
        <button className="sb-item" style={{ padding: 8 }}>
          <span className="flex items-center justify-center rounded-full bg-peppercorn-100 text-peppercorn-500 shrink-0" style={{ width: 32, height: 32 }}>
            <I.User size={14}/>
          </span>
          <span className="flex-1 min-w-0 text-left">
            <span className="block font-bold text-sm">John Stone</span>
            <span className="block text-xs text-peppercorn-500 truncate">john.stone@gmail.com</span>
          </span>
          <I.ChevronUp size={14}/>
        </button>
      </div>
    </aside>
  );
}
