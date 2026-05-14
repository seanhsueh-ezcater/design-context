import * as RadixSlider from '@radix-ui/react-slider';

interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onValueChange?: (value: number[]) => void;
  label?: string;
}

export function Slider({
  value,
  defaultValue = [0],
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onValueChange,
  label,
}: SliderProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <span className="text-base font-normal text-[var(--color-text-primary)]">{label}</span>
      )}
      <RadixSlider.Root
        className="relative flex items-center select-none touch-none w-full h-6"
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        onValueChange={onValueChange}
      >
        <RadixSlider.Track className="relative grow rounded-full h-1.5 bg-[#d1d5db]">
          <RadixSlider.Range className="absolute h-full rounded-full bg-[#14532d]" />
        </RadixSlider.Track>
        {(value ?? defaultValue).map((_, i) => (
          <RadixSlider.Thumb
            key={i}
            className={[
              'block w-4 h-4 rounded-full bg-[#14532d] border-2 border-white shadow-md',
              'transition-shadow',
              'hover:shadow-[0_0_0_4px_rgba(20,83,45,0.15)]',
              'focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgba(20,83,45,0.25)]',
              disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
            ].join(' ')}
            aria-label={label ?? 'Slider'}
          />
        ))}
      </RadixSlider.Root>
    </div>
  );
}
