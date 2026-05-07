import { useState, useMemo } from 'react';
import { Card, Button, Typography, TextField, Switch, Table, Popover, Pagination } from './ui';
import * as I from '../icons';

interface Row { store: string; views: string; spend: number; discounts: number | null; sales: number; orders: number; conv: number; roas: number; enabled: boolean; }

const ALL_ROWS: Row[] = [
  { store: '3750 Plano Parkway 233/15', views: '515 / 22',  spend: 414.82, discounts: 203.98, sales: 1558.31, orders: 3, conv: 20,    roas: 11.55, enabled: true  },
  { store: '11647 Culebra Rd',          views: '515 / 22',  spend: 414.82, discounts: null,   sales: 1558.31, orders: 3, conv: 20,    roas: 11.55, enabled: true  },
  { store: '1645 Parkway',              views: '515 / 222', spend: 134.88, discounts: null,   sales: 1558.31, orders: 3, conv: 20,    roas: 11.55, enabled: true  },
  { store: '1645 Parkway',              views: '515 / 22',  spend: 134.88, discounts: null,   sales: 1558.31, orders: 3, conv: 20,    roas: 11.55, enabled: true  },
  { store: '9300 Forum Dr',             views: '412 / 18',  spend: 98.40,  discounts: 22.10,  sales: 842.05,  orders: 2, conv: 11.11, roas: 8.55,  enabled: false },
  { store: '210 Beacon St',             views: '380 / 14',  spend: 88.20,  discounts: null,   sales: 720.10,  orders: 2, conv: 14.29, roas: 8.16,  enabled: true  },
  { store: '4400 N Central Expy',       views: '602 / 31',  spend: 222.50, discounts: 41.00,  sales: 1840.00, orders: 4, conv: 12.90, roas: 8.27,  enabled: true  },
  { store: '99 Greene St',              views: '410 / 19',  spend: 132.00, discounts: null,   sales: 980.00,  orders: 3, conv: 15.79, roas: 7.42,  enabled: true  },
  { store: '7700 Forsyth Blvd',         views: '298 / 11',  spend: 76.40,  discounts: null,   sales: 510.00,  orders: 2, conv: 18.18, roas: 6.68,  enabled: false },
  { store: '188 W Madison Ave',         views: '521 / 24',  spend: 188.10, discounts: 22.30,  sales: 1422.50, orders: 3, conv: 12.50, roas: 7.56,  enabled: true  },
  { store: '52 Belmont Ave',            views: '430 / 17',  spend: 110.80, discounts: null,   sales: 880.10,  orders: 2, conv: 11.76, roas: 7.94,  enabled: true  },
  { store: '15 Highland Park Cir',      views: '275 / 9',   spend: 64.00,  discounts: null,   sales: 412.00,  orders: 1, conv: 11.11, roas: 6.44,  enabled: true  },
  { store: '801 Mass Ave',              views: '612 / 33',  spend: 245.50, discounts: 38.00,  sales: 1980.00, orders: 5, conv: 15.15, roas: 8.06,  enabled: true  },
  { store: '4242 Westheimer Rd',        views: '378 / 16',  spend: 98.20,  discounts: null,   sales: 720.40,  orders: 2, conv: 12.50, roas: 7.34,  enabled: false },
];

type ColKey = 'views' | 'spend' | 'discounts' | 'sales' | 'orders' | 'conv' | 'roas' | 'enabled';
const COLS: { key: ColKey; label: string; sortable?: boolean }[] = [
  { key: 'views',     label: 'Views / Clicks' },
  { key: 'spend',     label: 'Ad Spend',  sortable: true },
  { key: 'discounts', label: 'Discounts', sortable: true },
  { key: 'sales',     label: 'Ad Sales',  sortable: true },
  { key: 'orders',    label: 'Order Total' },
  { key: 'conv',      label: 'Conversion' },
  { key: 'roas',      label: 'ROAS' },
  { key: 'enabled',   label: 'Enabled' },
];

const fmtUSD = (n: number | null) => n == null ? '—' : '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function buildPages(page: number, total: number): (number | '…')[] {
  const out: (number | '…')[] = [];
  if (total <= 7) { for (let i = 1; i <= total; i++) out.push(i); return out; }
  out.push(1);
  if (page > 3) out.push('…');
  for (let i = Math.max(2, page - 1); i <= Math.min(total - 1, page + 1); i++) out.push(i);
  if (page < total - 2) out.push('…');
  out.push(total);
  return out;
}

export default function LocationsTable() {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<{ k: string | null; dir: 'asc' | 'desc' }>({ k: null, dir: 'asc' });
  const [enabledMap, setEnabledMap] = useState(() => ALL_ROWS.map(r => r.enabled));
  const [visible, setVisible] = useState<Record<ColKey, boolean>>(Object.fromEntries(COLS.map(c => [c.key, true])) as Record<ColKey, boolean>);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  const filtered = useMemo(() => {
    let r = ALL_ROWS.map((row, i) => ({ ...row, _i: i, enabled: enabledMap[i] }));
    if (q.trim()) r = r.filter(x => x.store.toLowerCase().includes(q.trim().toLowerCase()));
    if (sort.k) {
      r = [...r].sort((a, b) => {
        const av = (a as Record<string, unknown>)[sort.k!] ?? -Infinity;
        const bv = (b as Record<string, unknown>)[sort.k!] ?? -Infinity;
        if (typeof av === 'string') return (av as string).localeCompare(bv as string) * (sort.dir === 'asc' ? 1 : -1);
        return ((av as number) - (bv as number)) * (sort.dir === 'asc' ? 1 : -1);
      });
    }
    return r;
  }, [q, sort, enabledMap]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const curPage = Math.min(page, totalPages);
  const start = (curPage - 1) * PAGE_SIZE;
  const pageRows = filtered.slice(start, start + PAGE_SIZE);

  const dirOf = (k: string) => sort.k === k ? sort.dir : (undefined as string | undefined);
  const toggleSort = (k: string) => { setSort(s => s.k === k ? { k, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { k, dir: 'asc' }); setPage(1); };
  const pages = buildPages(curPage, totalPages);

  return (
    <Card style={{ padding: 0, overflow: 'visible' }}>
      <div className="flex items-center gap-4" style={{ padding: '16px 20px', borderBottom: '1.5px solid var(--peppercorn-100)' }}>
        <Typography variant="heading-sm" className="flex-1">Locations in this campaign</Typography>
        <div style={{ width: 240 }}>
          <TextField.Root>
            <TextField.Slot><I.Search size={14}/></TextField.Slot>
            <TextField.Input placeholder="Search locations" value={q} onChange={e => { setQ(e.target.value); setPage(1); }}/>
          </TextField.Root>
        </div>
        <div className="relative">
          <Popover.Root>
            <Popover.Trigger asChild>
              <Button variant="outlined" className="flex items-center gap-2">
                <I.Sliders size={16}/> View columns <I.ChevronDown size={14}/>
              </Button>
            </Popover.Trigger>
            <Popover.Content align="end">
              {COLS.map(c => (
                <label key={c.key} className="popover-item cursor-pointer">
                  <input type="checkbox" checked={visible[c.key]}
                    onChange={e => setVisible(v => ({ ...v, [c.key]: e.target.checked }))}
                    style={{ accentColor: 'var(--green-700)' }}/>
                  <span>{c.label}</span>
                </label>
              ))}
            </Popover.Content>
          </Popover.Root>
        </div>
      </div>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head sortDirection={dirOf('store')} onClick={() => toggleSort('store')}>Store</Table.Head>
            {COLS.filter(c => visible[c.key]).map(c => (
              <Table.Head key={c.key} sortDirection={c.sortable ? dirOf(c.key) : undefined} onClick={c.sortable ? () => toggleSort(c.key) : undefined}>
                {c.label}
              </Table.Head>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {pageRows.map(r => (
            <Table.Row key={`${r._i}-${r.store}`}>
              <Table.Cell>{r.store}</Table.Cell>
              {visible.views     && <Table.Cell className="tabular">{r.views}</Table.Cell>}
              {visible.spend     && <Table.Cell className="tabular">{fmtUSD(r.spend)}</Table.Cell>}
              {visible.discounts && <Table.Cell className="tabular">{fmtUSD(r.discounts)}</Table.Cell>}
              {visible.sales     && <Table.Cell className="tabular">{fmtUSD(r.sales)}</Table.Cell>}
              {visible.orders    && <Table.Cell className="tabular"><a href="#" className="text-ez-blue-500 font-semibold">{r.orders}</a></Table.Cell>}
              {visible.conv      && <Table.Cell className="tabular">{r.conv.toFixed(2)}%</Table.Cell>}
              {visible.roas      && <Table.Cell className="tabular">{r.roas.toFixed(2)}x</Table.Cell>}
              {visible.enabled   && (
                <Table.Cell>
                  <Switch.Root checked={r.enabled} onCheckedChange={v => setEnabledMap(arr => arr.map((e, i) => i === r._i ? v : e))}>
                    <Switch.Thumb/>
                  </Switch.Root>
                </Table.Cell>
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Pagination.Root>
        <Typography variant="body-sm" className="text-peppercorn-500">
          Showing {filtered.length === 0 ? 0 : start + 1}–{Math.min(start + PAGE_SIZE, filtered.length)} of {filtered.length}
        </Typography>
        <Pagination.Content>
          <Pagination.Item>
            <Pagination.Previous disabled={curPage === 1} onClick={() => setPage(p => Math.max(1, p - 1))}/>
          </Pagination.Item>
          {pages.map((p, i) => (
            <Pagination.Item key={i}>
              {p === '…'
                ? <Pagination.Ellipsis/>
                : <Pagination.Link isActive={p === curPage} onClick={() => setPage(p as number)}>{p}</Pagination.Link>}
            </Pagination.Item>
          ))}
          <Pagination.Item>
            <Pagination.Next disabled={curPage === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}/>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination.Root>
    </Card>
  );
}
