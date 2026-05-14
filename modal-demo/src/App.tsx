import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Slider } from './components/Slider';

function Button({
  variant = 'primary',
  onClick,
  children,
}: {
  variant?: 'primary' | 'outlined';
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const base = 'px-4 py-2 rounded-full text-base font-bold leading-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';
  const styles = {
    primary: `${base} bg-[#14532d] text-white hover:bg-[#166534] focus-visible:ring-[#14532d]`,
    outlined: `${base} border border-[#14532d] text-[#14532d] bg-[var(--color-surface-primary-subtle)] hover:bg-[#f0fdf4] focus-visible:ring-[#14532d]`,
  };
  return (
    <button className={styles[variant]} onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);

  const [sliderValue, setSliderValue] = useState([40]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-12">
      <div className="w-80 flex flex-col gap-6">
        <Slider label="Budget" value={sliderValue} onValueChange={setSliderValue} />
        <Slider label="Rating" defaultValue={[70]} />
        <Slider label="Disabled" defaultValue={[50]} disabled />
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <Button variant="primary">Open modal</Button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/40 z-50" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[480px] max-w-[90vw] bg-[var(--color-surface-primary-subtle)] rounded-2xl shadow-2xl focus:outline-none">
            <div className="p-6 pb-4">
              <Dialog.Title className="text-lg font-bold leading-6 text-[var(--color-text-primary)]">
                Confirm action
              </Dialog.Title>
              <Dialog.Description className="mt-3 text-base font-normal leading-6 text-[var(--color-text-secondary)]">
                Are you sure you want to continue? This action cannot be undone.
              </Dialog.Description>
            </div>
            <div className="flex justify-end gap-4 px-6 pb-6">
              <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
