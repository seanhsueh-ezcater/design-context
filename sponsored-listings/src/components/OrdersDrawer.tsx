import { useState, useEffect } from 'react';
import { Button, Typography, Chip, Table, TextLink } from './ui';
import * as I from '../icons';

interface Order { id: string; date: string; customer: string; company: string; store: string; items: number; total: number; status: string; }

const ORDERS: Order[] = [
  { id: 'EZ-48211', date: 'Jan 25, 2025', customer: 'Priya Shah',    company: 'Northwind Health',  store: '3750 Plano Parkway', items: 22, total: 412.30, status: 'Delivered' },
  { id: 'EZ-48174', date: 'Jan 22, 2025', customer: 'Aria Patel',    company: 'Loomis & Co.',      store: '11647 Culebra Rd',   items: 12, total: 142.50, status: 'Delivered' },
  { id: 'EZ-48150', date: 'Jan 18, 2025', customer: 'Marcus Chen',   company: 'Bridgewater LLC',   store: '3750 Plano Parkway', items: 8,  total: 98.20,  status: 'Delivered' },
  { id: 'EZ-48121', date: 'Jan 14, 2025', customer: 'Tom Reilly',    company: 'Crestline Group',   store: '1645 Parkway',       items: 18, total: 287.10, status: 'Delivered' },
  { id: 'EZ-48098', date: 'Jan 11, 2025', customer: 'Sofia Alvarez', company: 'Apex Marketing',    store: '11647 Culebra Rd',   items: 16, total: 215.00, status: 'Delivered' },
  { id: 'EZ-48064', date: 'Jan 9, 2025',  customer: 'Yuki Tanaka',   company: 'Stellar Studios',   store: '9300 Forum Dr',      items: 28, total: 521.40, status: 'Delivered' },
  { id: 'EZ-48021', date: 'Dec 28, 2024', customer: 'David Kim',     company: 'Harbor Tech',       store: '3750 Plano Parkway', items: 6,  total: 76.80,  status: 'Delivered' },
  { id: 'EZ-47988', date: 'Dec 21, 2024', customer: 'Hannah Lee',    company: 'Meridian Design',   store: '1645 Parkway',       items: 14, total: 198.75, status: 'Delivered' },
  { id: 'EZ-47940', date: 'Dec 15, 2024', customer: 'Carla Mendes',  company: 'Olive Branch',      store: '11647 Culebra Rd',   items: 10, total: 187.30, status: 'Delivered' },
  { id: 'EZ-47902', date: 'Dec 10, 2024', customer: 'Sam Bennett',   company: 'Quill & Co.',       store: '3750 Plano Parkway', items: 11, total: 154.00, status: 'Delivered' },
  { id: 'EZ-47855', date: 'Dec 5, 2024',  customer: 'Ravi Iyer',     company: 'Foundry Labs',      store: '9300 Forum Dr',      items: 9,  total: 105.60, status: 'Delivered' },
  { id: 'EZ-47820', date: 'Dec 1, 2024',  customer: 'Nina Okafor',   company: 'Greenline Inc.',    store: '1645 Parkway',       items: 7,  total: 72.40,  status: 'Delivered' },
];

const statusColor = (s: string) => s === 'Delivered' ? 'var(--green-500)' : s === 'In progress' ? 'var(--blue-400)' : 'var(--peppercorn-400)';

export default function OrdersDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [sort, setSort] = useState<{ k: keyof Order; dir: 'asc' | 'desc' }>({ k: 'date', dir: 'desc' });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const toggleSort = (k: keyof Order) => setSort(s => s.k === k ? { k, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { k, dir: 'asc' });
  const dirOf = (k: keyof Order) => sort.k === k ? sort.dir : undefined;

  const rows = [...ORDERS].sort((a, b) => {
    const k = sort.k;
    const av = k === 'date' ? new Date(a[k]).getTime() : a[k];
    const bv = k === 'date' ? new Date(b[k]).getTime() : b[k];
    if (typeof av === 'string') return av.localeCompare(bv as string) * (sort.dir === 'asc' ? 1 : -1);
    return ((av as number) - (bv as number)) * (sort.dir === 'asc' ? 1 : -1);
  });

  const grandTotal = rows.reduce((s, r) => s + r.total, 0);

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-[60]" style={{ background: 'rgba(0,0,0,0.32)', animation: 'fadeIn 160ms ease' }}/>
      <aside role="dialog" aria-label="Orders from this campaign" className="fixed top-0 right-0 bottom-0 z-[61] flex flex-col bg-white"
        style={{ width: 'min(720px, 96vw)', boxShadow: '-12px 0 32px rgba(0,0,0,0.12)', animation: 'slideIn 220ms cubic-bezier(0.2,0.8,0.2,1)' }}>

        <header className="flex items-center gap-3 px-6 py-5" style={{ borderBottom: '1px solid var(--peppercorn-100)' }}>
          <div className="flex-1 min-w-0">
            <Typography variant="heading-md" style={{ marginBottom: 2 }}>Orders from ad sales</Typography>
            <Typography variant="body-sm" className="text-peppercorn-500">
              {rows.length} orders driven by your sponsored listings, totaling ${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.
            </Typography>
          </div>
          <Button variant="outlined" onClick={onClose} aria-label="Close" style={{ padding: '10.5px 12px' }}>
            <I.Close size={16}/>
          </Button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head style={{ paddingLeft: 24 }} sortDirection={dirOf('id')} onClick={() => toggleSort('id')}>Order</Table.Head>
                <Table.Head sortDirection={dirOf('date')} onClick={() => toggleSort('date')}>Date</Table.Head>
                <Table.Head sortDirection={dirOf('customer')} onClick={() => toggleSort('customer')}>Customer</Table.Head>
                <Table.Head className="tabular" sortDirection={dirOf('items')} onClick={() => toggleSort('items')}>Items</Table.Head>
                <Table.Head className="tabular" sortDirection={dirOf('total')} onClick={() => toggleSort('total')}>Total</Table.Head>
                <Table.Head style={{ paddingRight: 24 }} sortDirection={dirOf('status')} onClick={() => toggleSort('status')}>Status</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map(o => (
                <Table.Row key={o.id}>
                  <Table.Cell style={{ paddingLeft: 24 }}>
                    <TextLink size="small" href="#" onClick={e => e.preventDefault()}>{o.id}</TextLink>
                  </Table.Cell>
                  <Table.Cell className="text-peppercorn-500">{o.date}</Table.Cell>
                  <Table.Cell>
                    <div className="min-w-0">
                      <div className="font-semibold" style={{ fontSize: 13 }}>{o.customer}</div>
                      <div className="text-peppercorn-500" style={{ fontSize: 12 }}>{o.company}</div>
                    </div>
                  </Table.Cell>
                  <Table.Cell className="tabular">{o.items}</Table.Cell>
                  <Table.Cell className="tabular font-semibold">${o.total.toFixed(2)}</Table.Cell>
                  <Table.Cell style={{ paddingRight: 24 }}>
                    <Chip variant="default">
                      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: statusColor(o.status) }}/>
                      {o.status}
                    </Chip>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>

        <footer className="flex items-center gap-2 px-6 py-4" style={{ borderTop: '1px solid var(--peppercorn-100)' }}>
          <Typography variant="body-sm" className="flex-1 text-peppercorn-500">Showing {rows.length} of {ORDERS.length} orders</Typography>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button variant="primary">Export CSV</Button>
        </footer>
      </aside>
    </>
  );
}
