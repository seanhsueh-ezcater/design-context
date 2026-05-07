import type { ReactNode } from 'react';
import { Card, Button, Typography, TextLink } from './ui';
import * as I from '../icons';

// --- Sales chart ---
function SalesChart() {
  const bars = [50, 50, 100, 70, 50, 50, 50, 100, 100];
  const line = [70, 80, 75, 78, 45, 32, 38, 65, 92];
  const labels = ['Dec 1','Dec 7','Dec 14','Dec 21','Dec 28','Jan 4','Jan 11','Jan 18','Jan 25'];
  const W = 720, H = 260, padL = 40, padR = 12, padT = 10, padB = 28;
  const innerW = W - padL - padR, innerH = H - padT - padB, max = 100;
  const bw = innerW / bars.length;
  const ticks = [0, 20, 40, 60, 80, 100];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: '100%', height: 260 }}>
      <g>
        {ticks.map((t, i) => {
          const y = padT + innerH - (t / max) * innerH;
          return <g key={i}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="var(--peppercorn-100)" strokeDasharray="2 4"/>
            <text x={padL - 6} y={y + 3} textAnchor="end" fontSize="11" fill="var(--peppercorn-500)">${t}</text>
          </g>;
        })}
      </g>
      <g>
        {bars.map((v, i) => {
          const h = (v / max) * innerH, x = padL + i * bw + bw * 0.18, y = padT + innerH - h;
          return <rect key={i} x={x} y={y} width={bw * 0.64} height={h} rx="4" fill="var(--green-400)"/>;
        })}
      </g>
      <polyline fill="none" stroke="var(--blue-400)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        points={line.map((v, i) => `${padL + i * bw + bw / 2},${padT + innerH - (v / max) * innerH}`).join(' ')}/>
      {line.map((v, i) => <circle key={i} cx={padL + i * bw + bw / 2} cy={padT + innerH - (v / max) * innerH} r="2.5" fill="var(--blue-400)"/>)}
      <g fontSize="11" fill="var(--peppercorn-500)" textAnchor="middle">
        {labels.map((l, i) => <text key={i} x={padL + i * bw + bw / 2} y={H - 8}>{l}</text>)}
      </g>
    </svg>
  );
}

// --- Analytics card ---
const campaignDetails: [string, string][] = [
  ['Budget $400/week', 'Spending capped at $100/week at 4 locations.'],
  ['Run time', 'Until paused'],
  ['Bidding', 'Automatic'],
  ['Number of locations', '4'],
  ['Audience', 'New, lapsed, returning'],
];

export function AnalyticsCard({ onViewOrders }: { onViewOrders?: () => void }) {
  return (
    <Card style={{ padding: 0, overflow: 'hidden' }}>
      <div className="analytics-card-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 280px' }}>
        <div className="p-6">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
            <Typography variant="heading-sm" style={{ whiteSpace: 'nowrap' }}>Sales from ads</Typography>
            <Typography variant="body-sm" className="text-peppercorn-500" style={{ whiteSpace: 'nowrap' }}>Last updated: 12/15/24</Typography>
            <span className="ml-auto flex items-center gap-4 text-peppercorn-500" style={{ fontSize: 13, flexWrap: 'wrap' }}>
              <span className="flex items-center gap-1.5" style={{ whiteSpace: 'nowrap' }}>
                <span className="w-2.5 h-2.5 rounded-full bg-ez-green-400"/>Sales
              </span>
              <span className="flex items-center gap-1.5" style={{ whiteSpace: 'nowrap' }}>
                <span className="inline-block rounded bg-ez-blue-400" style={{ width: 16, height: 2 }}/>Ad views
              </span>
            </span>
          </div>
          <div className="flex items-baseline gap-3 mb-3">
            <Typography variant="heading-xl">$1,532.15</Typography>
            <TextLink size="small" href="#" onClick={(e) => { e.preventDefault(); onViewOrders?.(); }}>(View orders)</TextLink>
          </div>
          <SalesChart/>
        </div>

        <aside className="analytics-side flex flex-col gap-4 p-6 bg-white" style={{ borderLeft: '1.5px solid var(--peppercorn-100)' }}>
          <Typography variant="heading-xs">Campaign details</Typography>
          {campaignDetails.map(([k, v], i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <Typography variant="body-sm" style={{ fontWeight: 700 }}>{k}</Typography>
              <Typography variant="body-sm" className="text-peppercorn-500">{v}</Typography>
            </div>
          ))}
          <Button variant="buttonLink" className="mt-auto self-end">
            <I.Pencil size={14}/> Edit campaign
          </Button>
        </aside>
      </div>
    </Card>
  );
}

// --- Donut chart ---
interface Segment { label: string; value: number; color: string; }
function Donut({ segments, total }: { segments: Segment[]; total: number }) {
  let acc = 0;
  return (
    <svg viewBox="0 0 36 36" style={{ width: 80, height: 80 }}>
      <circle cx="18" cy="18" r="15.9155" fill="none" stroke="var(--peppercorn-100)" strokeWidth="4"/>
      {segments.map((s, i) => {
        const dash = (s.value / total) * 100;
        const offset = 25 - acc;
        acc += dash;
        return <circle key={i} cx="18" cy="18" r="15.9155" fill="none"
          stroke={s.color} strokeWidth="4"
          strokeDasharray={`${dash} 100`} strokeDashoffset={offset}
          transform="rotate(-90 18 18)"/>;
      })}
      <text x="18" y="20.5" textAnchor="middle" fontWeight="700" fontSize="8" fill="var(--peppercorn-800)">{total}</text>
    </svg>
  );
}

// --- KPI cards ---
interface KPICardProps { label: string; value: string; warn?: boolean; sub?: ReactNode; highlight?: ReactNode; }
export function KPICard({ label, value, warn, sub, highlight }: KPICardProps) {
  return (
    <div className="flex flex-col gap-1.5 flex-1 min-w-0" style={{ padding: 20, minHeight: 132 }}>
      <span className="flex items-center gap-1.5 font-semibold text-peppercorn-500" style={{ fontSize: 13 }}>
        {label} <I.Info size={13}/>
      </span>
      <span className="flex items-center gap-2">
        <Typography variant="heading-xl" style={{ fontSize: 30, lineHeight: '34px' }}>{value}</Typography>
        {warn && <I.AlertIcon size={18} style={{ color: 'var(--guava-400)' }}/>}
      </span>
      {sub && <Typography variant="body-sm" className="text-peppercorn-500">{sub}</Typography>}
      {highlight && <Typography variant="body-sm" style={{ color: 'var(--guava-500)' }}>{highlight}</Typography>}
    </div>
  );
}

const segs: Segment[] = [
  { label: 'New', value: 4, color: 'var(--green-400)' },
  { label: 'Existing', value: 4, color: 'var(--green-700)' },
  { label: 'Lapsed', value: 8, color: '#fbb41a' },
];

export function CustomersCard({ onClick }: { onClick?: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col gap-2.5 flex-1 min-w-0 bg-transparent border-0 text-left cursor-pointer font-inherit text-inherit transition-colors hover:bg-peppercorn-50"
      style={{ padding: 20, minHeight: 132 }}>
      <span className="flex items-center gap-1.5 font-semibold text-peppercorn-500" style={{ fontSize: 13 }}>
        Customers <I.Info size={13}/>
        <I.Chevron size={12} className="ml-auto text-peppercorn-400"/>
      </span>
      <div className="flex items-center gap-3">
        <Donut segments={segs} total={16}/>
        <ul className="flex flex-col gap-1 m-0 p-0 list-none" style={{ fontSize: 14 }}>
          {segs.map((s, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }}/>
              <span className="font-bold w-4">{s.value}</span>
              <span className="text-peppercorn-500">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </button>
  );
}

export function KPIRow({ children }: { children: ReactNode }) {
  const arr = Array.isArray(children) ? children.flat() : [children];
  return (
    <Card style={{ display: 'flex', alignItems: 'stretch', overflow: 'hidden', padding: 0 }}>
      {arr.flatMap((c, i) =>
        i < arr.length - 1
          ? [c, <div key={'d' + i} className="w-px bg-peppercorn-100 self-stretch"/>]
          : [c]
      )}
    </Card>
  );
}
