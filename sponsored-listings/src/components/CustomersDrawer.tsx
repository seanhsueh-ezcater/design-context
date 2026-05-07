import { useState, useEffect } from 'react';
import { Button, Typography, Chip, Table } from './ui';
import * as I from '../icons';

interface Customer { name: string; email: string; segment: 'New' | 'Existing' | 'Lapsed'; orders: number; spend: number; last: string; }

const CUSTOMERS: Customer[] = [
  { name: 'Aria Patel',    email: 'aria.p@gmail.com',     segment: 'New',      orders: 1, spend: 142.50, last: 'Jan 22, 2025' },
  { name: 'Marcus Chen',   email: 'm.chen@workmail.com',  segment: 'New',      orders: 1, spend: 98.20,  last: 'Jan 18, 2025' },
  { name: 'Sofia Alvarez', email: 'sofia.a@yahoo.com',    segment: 'New',      orders: 1, spend: 215.00, last: 'Jan 11, 2025' },
  { name: 'David Kim',     email: 'dkim@outlook.com',     segment: 'New',      orders: 1, spend: 76.80,  last: 'Dec 28, 2024' },
  { name: 'Priya Shah',    email: 'pshah@company.io',     segment: 'Existing', orders: 3, spend: 412.30, last: 'Jan 25, 2025' },
  { name: 'Tom Reilly',    email: 't.reilly@gmail.com',   segment: 'Existing', orders: 2, spend: 287.10, last: 'Jan 14, 2025' },
  { name: 'Yuki Tanaka',   email: 'yuki.t@hotmail.com',   segment: 'Existing', orders: 4, spend: 521.40, last: 'Jan 9, 2025'  },
  { name: 'Hannah Lee',    email: 'hlee@design.co',       segment: 'Existing', orders: 2, spend: 198.75, last: 'Dec 21, 2024' },
  { name: 'Jordan Wells',  email: 'jwells@gmail.com',     segment: 'Lapsed',   orders: 1, spend: 64.20,  last: 'Sep 14, 2024' },
  { name: 'Elena Rossi',   email: 'elena.r@yahoo.com',    segment: 'Lapsed',   orders: 1, spend: 89.50,  last: 'Aug 30, 2024' },
  { name: 'Sam Bennett',   email: 's.bennett@gmail.com',  segment: 'Lapsed',   orders: 2, spend: 154.00, last: 'Aug 12, 2024' },
  { name: 'Nina Okafor',   email: 'nina.o@workmail.com',  segment: 'Lapsed',   orders: 1, spend: 72.40,  last: 'Jul 26, 2024' },
  { name: 'Ravi Iyer',     email: 'r.iyer@outlook.com',   segment: 'Lapsed',   orders: 1, spend: 105.60, last: 'Jul 18, 2024' },
  { name: 'Carla Mendes',  email: 'cmendes@gmail.com',    segment: 'Lapsed',   orders: 2, spend: 187.30, last: 'Jul 4, 2024'  },
  { name: 'Owen Bryant',   email: 'obryant@hotmail.com',  segment: 'Lapsed',   orders: 1, spend: 58.90,  last: 'Jun 21, 2024' },
  { name: 'Mei Lin',       email: 'mei.lin@gmail.com',    segment: 'Lapsed',   orders: 1, spend: 91.10,  last: 'Jun 5, 2024'  },
];

const segColor = (s: string) => s === 'New' ? 'var(--green-400)' : s === 'Existing' ? 'var(--green-700)' : '#fbb41a';
const counts: Record<string, number> = { All: CUSTOMERS.length, New: 4, Existing: 4, Lapsed: 8 };
const TABS = ['All', 'New', 'Existing', 'Lapsed'] as const;

export default function CustomersDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [seg, setSeg] = useState<string>('All');
  const [sort, setSort] = useState<{ k: keyof Customer | null; dir: 'asc' | 'desc' }>({ k: null, dir: 'asc' });

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const toggleSort = (k: keyof Customer) => setSort(s => s.k === k ? { k, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { k, dir: 'asc' });
  const dirOf = (k: keyof Customer) => sort.k === k ? sort.dir : undefined;

  let rows = seg === 'All' ? CUSTOMERS : CUSTOMERS.filter(c => c.segment === seg);
  if (sort.k) {
    const k = sort.k;
    rows = [...rows].sort((a, b) => {
      const av = k === 'last' ? new Date(a[k]).getTime() : a[k];
      const bv = k === 'last' ? new Date(b[k]).getTime() : b[k];
      if (typeof av === 'string') return av.localeCompare(bv as string) * (sort.dir === 'asc' ? 1 : -1);
      return ((av as number) - (bv as number)) * (sort.dir === 'asc' ? 1 : -1);
    });
  }

  return (
    <>
      <div onClick={onClose} className="fixed inset-0 z-[60]" style={{ background: 'rgba(0,0,0,0.32)', animation: 'fadeIn 160ms ease' }}/>
      <aside role="dialog" aria-label="Customer breakdown" className="fixed top-0 right-0 bottom-0 z-[61] flex flex-col bg-white"
        style={{ width: 'min(640px, 96vw)', boxShadow: '-12px 0 32px rgba(0,0,0,0.12)', animation: 'slideIn 220ms cubic-bezier(0.2,0.8,0.2,1)' }}>

        <header className="flex items-center gap-3 px-6 py-5" style={{ borderBottom: '1px solid var(--peppercorn-100)' }}>
          <div className="flex-1 min-w-0">
            <Typography variant="heading-md" style={{ marginBottom: 2 }}>Customers in this campaign</Typography>
            <Typography variant="body-sm" className="text-peppercorn-500">16 unique customers placed orders from your sponsored listings.</Typography>
          </div>
          <Button variant="outlined" onClick={onClose} aria-label="Close" style={{ padding: '10.5px 12px' }}>
            <I.Close size={16}/>
          </Button>
        </header>

        <div className="px-6 py-3" style={{ borderBottom: '1px solid var(--peppercorn-100)' }}>
          <div className="flex flex-wrap gap-2">
            {TABS.map(t => (
              <button key={t} onClick={() => setSeg(t)}
                className="inline-flex items-center gap-2 h-8 px-3 rounded-full font-semibold border transition-colors"
                style={{ fontSize: 13, border: `1px solid ${seg === t ? 'var(--green-700)' : 'var(--peppercorn-200)'}`, background: seg === t ? 'var(--green-700)' : '#fff', color: seg === t ? '#fff' : 'var(--peppercorn-700)', font: 'inherit', cursor: 'pointer' }}>
                {t !== 'All' && <span className="w-2 h-2 rounded-full" style={{ background: segColor(t) }}/>}
                {t}
                <span style={{ opacity: 0.85 }}>{counts[t]}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head style={{ paddingLeft: 24 }} sortDirection={dirOf('name')} onClick={() => toggleSort('name')}>Customer</Table.Head>
                <Table.Head sortDirection={dirOf('segment')} onClick={() => toggleSort('segment')}>Segment</Table.Head>
                <Table.Head className="tabular" sortDirection={dirOf('orders')} onClick={() => toggleSort('orders')}>Orders</Table.Head>
                <Table.Head className="tabular" sortDirection={dirOf('spend')} onClick={() => toggleSort('spend')}>Spend</Table.Head>
                <Table.Head className="tabular" style={{ paddingRight: 24 }} sortDirection={dirOf('last')} onClick={() => toggleSort('last')}>Last order</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {rows.map((c, i) => (
                <Table.Row key={i}>
                  <Table.Cell style={{ paddingLeft: 24 }}>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center rounded-full shrink-0 font-semibold bg-peppercorn-100 text-peppercorn-700" style={{ width: 32, height: 32, fontSize: 12 }}>
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </span>
                      <div className="min-w-0">
                        <div className="font-semibold" style={{ fontSize: 13 }}>{c.name}</div>
                        <div className="text-peppercorn-500" style={{ fontSize: 12 }}>{c.email}</div>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Chip variant="default">
                      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: segColor(c.segment) }}/>
                      {c.segment}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell className="tabular">{c.orders}</Table.Cell>
                  <Table.Cell className="tabular">${c.spend.toFixed(2)}</Table.Cell>
                  <Table.Cell className="tabular text-peppercorn-500" style={{ paddingRight: 24 }}>{c.last}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </div>

        <footer className="flex items-center gap-2 px-6 py-4" style={{ borderTop: '1px solid var(--peppercorn-100)' }}>
          <Typography variant="body-sm" className="flex-1 text-peppercorn-500">Showing {rows.length} of {CUSTOMERS.length} customers</Typography>
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button variant="primary">Export CSV</Button>
        </footer>
      </aside>
    </>
  );
}
