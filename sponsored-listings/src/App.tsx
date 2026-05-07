import { useState } from 'react';
import { Button, Typography, Select, Popover } from './components/ui';
import Sidebar from './components/Sidebar';
import InsightsAccordion from './components/InsightsAccordion';
import { AnalyticsCard, KPICard, CustomersCard, KPIRow } from './components/AnalyticsCard';
import LocationsTable from './components/LocationsTable';
import CustomersDrawer from './components/CustomersDrawer';
import OrdersDrawer from './components/OrdersDrawer';
import * as I from './icons';

export default function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [ordersOpen, setOrdersOpen] = useState(false);

  return (
    <div className="app-shell" style={{ display: 'grid', gridTemplateColumns: '248px 1fr', minHeight: '100vh', background: 'var(--peppercorn-50)' }}>
      <Sidebar/>

      <main style={{ minWidth: 0 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '20px 32px 56px' }}>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 pb-3 text-sm text-peppercorn-500">
            <a href="#" className="text-peppercorn-500 no-underline">My campaigns</a>
            <I.Chevron size={12}/>
            <span className="font-semibold text-peppercorn-800">Sponsored Listing 12/5/24–3/20/25</span>
          </nav>

          {/* Page header */}
          <header className="flex items-center gap-4 pb-5">
            <Typography variant="heading-xl" className="flex-1 truncate">
              Sponsored Listing 12/5/24–3/20/25
            </Typography>
            <div className="flex items-center gap-2">
              <Button variant="outlined"><I.Pencil size={16}/> Edit campaign</Button>
              <Button variant="outlined"><I.Pause size={16}/> Pause campaign</Button>
              <div className="relative">
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <Button variant="outlined" aria-label="More actions" style={{ padding: '10.5px 12px' }}>
                      <I.More size={16}/>
                    </Button>
                  </Popover.Trigger>
                  <Popover.Content align="end">
                    <button className="popover-item"><I.Copy size={14}/> Duplicate campaign</button>
                    <button className="popover-item"><I.Share size={14}/> Share report</button>
                    <button className="popover-item"><I.Bell size={14}/> Manage alerts</button>
                    <button className="popover-item"><I.FileExport size={14}/> Export PDF</button>
                    <hr style={{ border: 0, borderTop: '1px solid var(--peppercorn-100)', margin: '4px 0' }}/>
                    <button className="popover-item danger"><I.Trash size={14}/> End campaign</button>
                  </Popover.Content>
                </Popover.Root>
              </div>
            </div>
          </header>

          {/* Filters */}
          <div className="flex items-end gap-4 pb-5 flex-wrap">
            <div className="flex flex-col gap-1.5" style={{ minWidth: 220 }}>
              <Typography variant="body-sm" style={{ fontWeight: 700 }}>Time range</Typography>
              <div className="relative">
                <Select.Root defaultValue="all">
                  <Select.Trigger><Select.Value placeholder="Select…"/></Select.Trigger>
                  <Select.Content>
                    <Select.Item value="all">All time</Select.Item>
                    <Select.Item value="7d">Last 7 days</Select.Item>
                    <Select.Item value="30d">Last 30 days</Select.Item>
                    <Select.Item value="90d">Last 90 days</Select.Item>
                    <Select.Item value="custom">Custom range…</Select.Item>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
            <div className="flex flex-col gap-1.5" style={{ minWidth: 240 }}>
              <Typography variant="body-sm" style={{ fontWeight: 700 }}>Store</Typography>
              <div className="relative">
                <Select.Root defaultValue="all">
                  <Select.Trigger><Select.Value placeholder="All stores"/></Select.Trigger>
                  <Select.Content>
                    <Select.Item value="all">All stores</Select.Item>
                    <Select.Item value="plano">3750 Plano Parkway</Select.Item>
                    <Select.Item value="culebra">11647 Culebra Rd</Select.Item>
                    <Select.Item value="parkway">1645 Parkway</Select.Item>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
            <div className="ml-auto">
              <Button variant="buttonLink"><I.Download size={14}/> Download CSV</Button>
            </div>
          </div>

          {/* Main content */}
          <div className="flex flex-col gap-5">
            <InsightsAccordion/>
            <AnalyticsCard onViewOrders={() => setOrdersOpen(true)}/>
            <KPIRow>
              <KPICard label="Amount spent on ads" value="$155"
                sub={<>$124.12 after discounts. How much you've spent on sponsored listings.</>}/>
              <KPICard label="Conversion rate" value="1.5%" warn
                highlight={<><strong>1.5 out of every 100</strong> customers placed an order after viewing your menu.</>}/>
              <KPICard label="Return on ad spend (ROAS)" value="1.3x" warn
                highlight={<>You've earned <strong>$1.30 for every $1</strong> spent across your campaigns.</>}/>
              <CustomersCard onClick={() => setDrawerOpen(true)}/>
            </KPIRow>
            <LocationsTable/>
          </div>

        </div>
      </main>

      <CustomersDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}/>
      <OrdersDrawer open={ordersOpen} onClose={() => setOrdersOpen(false)}/>
    </div>
  );
}
