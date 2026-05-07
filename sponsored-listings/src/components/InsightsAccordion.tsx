import { useState } from 'react';
import { Card, Button, Typography } from './ui';
import * as I from '../icons';

interface Slide { title: string; body: string; cta: string; }

const SLIDES: Slide[][] = [
  [
    { title: 'Get more orders by increasing weekly budget ($50/week)', body: 'Restaurants near you are budgeting a weekly cap of $200–$250. Try increasing to $250 to get more orders.', cta: 'Update budget' },
    { title: 'You have $120 in ad credits available', body: 'Credits auto-apply to future ad spend on your Sponsored Listing 12/5/24–3/20/25 campaign.', cta: 'Apply credits' },
  ],
  [
    { title: 'Add 3 more locations to expand reach', body: 'Stores within 8 miles of your active locations average 2.4× more views when added to a single campaign.', cta: 'Add locations' },
    { title: 'Pin your best seller to lift conversion', body: '"Spicy Chicken Sandwich" converts 2.3× better than your average dish. Pin it to your campaign listing.', cta: 'Pin dish' },
  ],
];

function RecAlert({ title, body, cta }: Slide) {
  return (
    <div className="rec-alert">
      <Typography variant="heading-xs">{title}</Typography>
      <Typography variant="body-sm" style={{ color: 'var(--peppercorn-500)' }}>{body}</Typography>
      <div className="mt-2">
        <Button variant="primary">{cta}</Button>
      </div>
    </div>
  );
}

export default function InsightsAccordion() {
  const [open, setOpen] = useState(true);
  const [idx, setIdx] = useState(0);
  const total = SLIDES.length;
  const go = (n: number) => setIdx(((idx + n) % total + total) % total);

  return (
    <Card style={{ padding: 20 }}>
      <div className="flex items-center gap-4">
        <span className="flex items-center justify-center shrink-0 rounded-[10px] bg-ez-green-50 text-ez-green-700" style={{ width: 36, height: 36 }}>
          <I.TrendUp size={18}/>
        </span>
        <span className="flex-1 min-w-0 text-base leading-snug">
          <strong className="font-bold">Your campaigns brought in 12 orders!</strong>{' '}
          <span className="text-peppercorn-500">Here's what's working, and how you can boost your success.</span>
        </span>
        <div className="flex items-center gap-2">
          <Button variant="outlined" aria-label="Previous" onClick={() => go(-1)} style={{ padding: '10.5px 12px' }}>
            <I.ChevronLeft size={16}/>
          </Button>
          <Button variant="outlined" aria-label="Next" onClick={() => go(1)} style={{ padding: '10.5px 12px' }}>
            <I.Chevron size={16}/>
          </Button>
          <Button variant="buttonLink" onClick={() => setOpen(o => !o)}>{open ? 'Hide' : 'Show'}</Button>
        </div>
      </div>

      {open && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          {SLIDES[idx].map((r, i) => <RecAlert key={i} {...r}/>)}
        </div>
      )}
    </Card>
  );
}
