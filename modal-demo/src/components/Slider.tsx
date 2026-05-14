import { forwardRef } from 'react';
import { Slider as SliderPrimitive } from 'radix-ui';
import { tv } from 'tailwind-variants';
import cn from '../utils/cn';
import { tapasClassNames } from '../utils/tapasClassNames';

const sliderVariants = tv({
  slots: {
    root: 'relative flex items-center select-none touch-none w-full h-6',
    track: 'relative grow rounded-full h-1.5 bg-peppercorn-200 data-[disabled]:bg-peppercorn-100',
    range: 'absolute h-full rounded-full bg-green-700 data-[disabled]:bg-peppercorn-300',
    thumb: [
      'block w-4 h-4 rounded-full bg-green-700 border-2 border-white shadow-md',
      'transition-shadow',
      'hover:bg-green-600',
      'active:bg-green-800',
      'data-[disabled]:bg-peppercorn-300 data-[disabled]:pointer-events-none',
      tapasClassNames.focusVisibleOffset,
    ].join(' '),
  },
});

const { root, track, range, thumb } = sliderVariants();

const SliderRoot = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentProps<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    data-slot="slider-root"
    className={cn(root(), className)}
    {...props}
  />
));
SliderRoot.displayName = 'Slider.Root';

const SliderTrack = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Track>,
  React.ComponentProps<typeof SliderPrimitive.Track>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Track
    ref={ref}
    data-slot="slider-track"
    className={cn(track(), className)}
    {...props}
  />
));
SliderTrack.displayName = 'Slider.Track';

const SliderRange = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Range>,
  React.ComponentProps<typeof SliderPrimitive.Range>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Range
    ref={ref}
    data-slot="slider-range"
    className={cn(range(), className)}
    {...props}
  />
));
SliderRange.displayName = 'Slider.Range';

const SliderThumb = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Thumb>,
  React.ComponentProps<typeof SliderPrimitive.Thumb>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Thumb
    ref={ref}
    data-slot="slider-thumb"
    className={cn(thumb(), className)}
    {...props}
  />
));
SliderThumb.displayName = 'Slider.Thumb';

const Slider = {
  Root: SliderRoot,
  Track: SliderTrack,
  Range: SliderRange,
  Thumb: SliderThumb,
} as const;

export { Slider };
