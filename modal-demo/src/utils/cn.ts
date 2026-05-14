import { twJoin, twMerge } from 'tailwind-merge';

type ClassValue = Parameters<typeof twJoin>[0];

export default function cn(...inputs: ClassValue[]) {
  return twMerge(twJoin(inputs));
}
