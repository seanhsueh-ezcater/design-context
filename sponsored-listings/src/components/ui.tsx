import { useState, useRef, useEffect, createContext, useContext, forwardRef, type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes } from 'react';
import { ChevronDown, ArrowSort } from '../icons';

const cn = (...a: (string | undefined | false | null)[]) => a.filter(Boolean).join(' ');

// --- Typography ---
interface TypographyProps {
  variant?: 'heading-xl' | 'heading-md' | 'heading-sm' | 'heading-xs' | 'body-md' | 'body-sm';
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
}
export const Typography = ({ variant = 'body-md', className, children, style }: TypographyProps) => (
  <div className={cn(`t-${variant}`, className)} style={style}>{children}</div>
);

// --- Button ---
type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'buttonLink' | 'contrast';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'small' | 'medium';
  destructive?: boolean;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  variant = 'primary', size = 'medium', destructive = false, className, children, ...rest
}, ref) => (
  <button ref={ref} type="button"
    data-variant={variant}
    data-size={variant === 'buttonLink' ? undefined : size}
    data-destructive={destructive ? 'true' : undefined}
    className={cn('Tapas-Button', className)} {...rest}>
    {children}
  </button>
));
Button.displayName = 'Button';

// --- Card ---
interface CardProps { className?: string; children?: ReactNode; style?: React.CSSProperties; onClick?: () => void; }
export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, children, style, onClick }, ref) => (
  <div ref={ref} className={cn('Tapas-Card', className)} style={style} onClick={onClick}>{children}</div>
));
Card.displayName = 'Card';

// --- Chip ---
interface ChipProps { variant?: 'default' | 'success' | 'info' | 'warning' | 'danger'; className?: string; children?: ReactNode; }
export const Chip = ({ variant = 'default', className, children }: ChipProps) => (
  <div data-variant={variant} className={cn('Tapas-Chip', className)}>{children}</div>
);

// --- TextField ---
const TextFieldCtx = createContext({ error: false });
const TextFieldRoot = forwardRef<HTMLDivElement, { error?: boolean; className?: string; children?: ReactNode }>(
  ({ error = false, className, children }, ref) => (
    <TextFieldCtx.Provider value={{ error }}>
      <div ref={ref} data-error={error || undefined} className={cn('Tapas-TextField-Root', className)}>{children}</div>
    </TextFieldCtx.Provider>
  )
);
TextFieldRoot.displayName = 'TextField.Root';
const TextFieldInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...rest }, ref) => {
    const { error } = useContext(TextFieldCtx);
    return <input ref={ref} type="text" aria-invalid={error || undefined} className={cn('Tapas-TextField-Input', className)} {...rest}/>;
  }
);
TextFieldInput.displayName = 'TextField.Input';
const TextFieldSlot = ({ className, children }: { className?: string; children?: ReactNode }) => (
  <div className={cn('Tapas-TextField-Slot', className)}>{children}</div>
);
export const TextField = { Root: TextFieldRoot, Input: TextFieldInput, Slot: TextFieldSlot };

// --- Switch ---
const SwitchRoot = forwardRef<HTMLButtonElement, { checked?: boolean; onCheckedChange?: (v: boolean) => void; disabled?: boolean; className?: string; children?: ReactNode }>(
  ({ checked, onCheckedChange, disabled, className, children }, ref) => (
    <button ref={ref} type="button" role="switch"
      aria-checked={!!checked}
      data-state={checked ? 'checked' : 'unchecked'}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange?.(!checked)}
      className={cn('Tapas-Switch-Root', className)}>
      {children}
    </button>
  )
);
SwitchRoot.displayName = 'Switch.Root';
const SwitchThumb = ({ className }: { className?: string }) => <span className={cn('Tapas-Switch-Thumb', className)}/>;
export const Switch = { Root: SwitchRoot, Thumb: SwitchThumb };

// --- Select ---
interface SelectCtxType { value: string; setValue: (v: string) => void; open: boolean; setOpen: (v: boolean) => void; triggerRef: React.MutableRefObject<HTMLButtonElement | null>; labelMap: Record<string, ReactNode>; }
const SelectCtx = createContext<SelectCtxType | null>(null);
const SelectRoot = ({ value: valueProp, defaultValue = '', onValueChange, children }: { value?: string; defaultValue?: string; onValueChange?: (v: string) => void; children: ReactNode }) => {
  const [internal, setInternal] = useState(defaultValue);
  const v = valueProp !== undefined ? valueProp : internal;
  const labelMapRef = useRef<Record<string, ReactNode>>({});
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const set = (nv: string) => { if (valueProp === undefined) setInternal(nv); onValueChange?.(nv); };
  return <SelectCtx.Provider value={{ value: v, setValue: set, open, setOpen, triggerRef, labelMap: labelMapRef.current }}>{children}</SelectCtx.Provider>;
};
const SelectTrigger = forwardRef<HTMLButtonElement, { className?: string; children?: ReactNode; error?: boolean; id?: string }>(
  ({ className, children, error, id, ...rest }, ref) => {
    const ctx = useContext(SelectCtx)!;
    const setRef = (el: HTMLButtonElement | null) => { ctx.triggerRef.current = el; if (typeof ref === 'function') ref(el); else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = el; };
    return (
      <button ref={setRef} id={id} type="button"
        data-state={ctx.open ? 'open' : 'closed'} data-error={error ? 'true' : undefined}
        onClick={() => ctx.setOpen(!ctx.open)}
        className={cn('Tapas-Select', className)} {...rest}>
        {children}
        <span className="Tapas-Select-chevron"><ChevronDown size={14}/></span>
      </button>
    );
  }
);
SelectTrigger.displayName = 'Select.Trigger';
const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const ctx = useContext(SelectCtx)!;
  const label = ctx.labelMap[ctx.value];
  return <span className="Tapas-Select-Value">{label ?? ctx.value ?? <span className="text-peppercorn-300">{placeholder}</span>}</span>;
};
const SelectContent = ({ children, className }: { children?: ReactNode; className?: string }) => {
  const ctx = useContext(SelectCtx)!;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ctx.open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && ctx.triggerRef.current && !ctx.triggerRef.current.contains(e.target as Node)) ctx.setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [ctx.open]);
  if (!ctx.open) return null;
  return <div ref={ref} className={cn('Tapas-Select-Content', className)} style={{ left: 0, right: 0, top: '100%' }}>{children}</div>;
};
const SelectItem = ({ value, children, className }: { value: string; children?: ReactNode; className?: string }) => {
  const ctx = useContext(SelectCtx)!;
  ctx.labelMap[value] = children;
  const checked = ctx.value === value;
  return (
    <div role="option" data-state={checked ? 'checked' : 'unchecked'}
      onClick={() => { ctx.setValue(value); ctx.setOpen(false); }}
      className={cn('Tapas-Select-Item', className)}>
      <span>{children}</span>
    </div>
  );
};
export const Select = { Root: SelectRoot, Trigger: SelectTrigger, Value: SelectValue, Content: SelectContent, Item: SelectItem };

// --- Popover ---
interface PopoverCtxType { open: boolean; set: (v: boolean) => void; triggerRef: React.MutableRefObject<HTMLElement | null>; }
const PopoverCtx = createContext<PopoverCtxType | null>(null);
const PopoverRoot = ({ open: openProp, onOpenChange, children }: { open?: boolean; onOpenChange?: (v: boolean) => void; children: ReactNode }) => {
  const [internal, setInternal] = useState(false);
  const open = openProp !== undefined ? openProp : internal;
  const set = (v: boolean) => { if (openProp === undefined) setInternal(v); onOpenChange?.(v); };
  const triggerRef = useRef<HTMLElement | null>(null);
  return <PopoverCtx.Provider value={{ open, set, triggerRef }}>{children}</PopoverCtx.Provider>;
};
const PopoverTrigger = ({ asChild, children }: { asChild?: boolean; children: React.ReactElement }) => {
  const ctx = useContext(PopoverCtx)!;
  const handle = (e: React.MouseEvent) => { e.stopPropagation(); ctx.set(!ctx.open); };
  if (asChild) {
    return <>{React.cloneElement(children, { ref: ctx.triggerRef, onClick: (e: React.MouseEvent) => { (children.props as { onClick?: (e: React.MouseEvent) => void }).onClick?.(e); handle(e); } })}</>;
  }
  return <button ref={ctx.triggerRef as React.Ref<HTMLButtonElement>} onClick={handle}>{children}</button>;
};
const PopoverContent = ({ align = 'end', sideOffset = 4, className, children }: { align?: 'start' | 'center' | 'end'; sideOffset?: number; className?: string; children?: ReactNode }) => {
  const ctx = useContext(PopoverCtx)!;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ctx.open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && ctx.triggerRef.current && !ctx.triggerRef.current.contains(e.target as Node)) ctx.set(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [ctx.open]);
  if (!ctx.open) return null;
  const alignStyle = align === 'start' ? { left: 0 } : align === 'center' ? { left: '50%', transform: 'translateX(-50%)' } : { right: 0 };
  return (
    <div ref={ref} className={cn('popover-content', className)}
      style={{ position: 'absolute', top: `calc(100% + ${sideOffset}px)`, ...alignStyle }}>
      {children}
    </div>
  );
};
export const Popover = { Root: PopoverRoot, Trigger: PopoverTrigger, Content: PopoverContent };

// --- Table ---
const TableRoot = forwardRef<HTMLDivElement, { bordered?: boolean; className?: string; children?: ReactNode }>(
  ({ bordered = false, className, children }, ref) => (
    <div ref={ref} className="Tapas-Table-Wrapper" data-bordered={bordered ? 'true' : undefined}>
      <table className={cn('Tapas-Table', className)}>{children}</table>
    </div>
  )
);
TableRoot.displayName = 'Table.Root';
const TableHeader = ({ className, children }: { className?: string; children?: ReactNode }) => <thead className={cn('Tapas-TableHeader', className)}>{children}</thead>;
const TableBody   = ({ className, children }: { className?: string; children?: ReactNode }) => <tbody className={cn('Tapas-TableBody', className)}>{children}</tbody>;
const TableRow    = ({ className, children, ...rest }: { className?: string; children?: ReactNode; onClick?: () => void }) => <tr className={cn('Tapas-TableRow', className)} {...rest}>{children}</tr>;
const TableHead   = ({ sortDirection, className, children, onClick, style }: { sortDirection?: string | false; className?: string; children?: ReactNode; onClick?: () => void; style?: React.CSSProperties }) => (
  <th data-sortable={sortDirection !== undefined ? 'true' : undefined} onClick={onClick} className={cn('Tapas-TableHead', className)} style={style}>
    <span className="inline-flex items-center">
      {children}
      {sortDirection !== undefined && (
        <span className="Tapas-TableHead-SortButton" aria-hidden="true"><ArrowSort size={12}/></span>
      )}
    </span>
  </th>
);
const TableCell = ({ className, children, style, ...rest }: { className?: string; children?: ReactNode; style?: React.CSSProperties; colSpan?: number }) => (
  <td className={cn('Tapas-TableCell', className)} style={style} {...rest}>{children}</td>
);
export const Table = { Root: TableRoot, Header: TableHeader, Body: TableBody, Row: TableRow, Head: TableHead, Cell: TableCell };

// --- Pagination ---
const PaginationRoot = ({ className, children }: { className?: string; children?: ReactNode }) => (
  <nav role="navigation" aria-label="pagination" className={cn('Tapas-Pagination', className)}>{children}</nav>
);
const PaginationContent = ({ className, children }: { className?: string; children?: ReactNode }) => (
  <ul className={cn('Tapas-Pagination-Content', className)}>{children}</ul>
);
const PaginationItem = ({ className, children }: { className?: string; children?: ReactNode }) => (
  <li className={cn('Tapas-Pagination-Item', className)}>{children}</li>
);
const PaginationLink = ({ isActive, size = 'icon', className, children, ...rest }: { isActive?: boolean; size?: string; className?: string; children?: ReactNode; onClick?: () => void; disabled?: boolean; 'aria-label'?: string }) => (
  <button type="button" aria-current={isActive ? 'page' : undefined} data-active={isActive ? 'true' : undefined} data-size={size} className={cn('Tapas-Pagination-Link', className)} {...rest}>{children}</button>
);
const PaginationPrevious = ({ className, ...rest }: { className?: string; onClick?: () => void; disabled?: boolean }) => (
  <PaginationLink aria-label="Go to previous page" size="default" className={cn('Tapas-Pagination-Prev', className)} {...rest}>
    <ChevronLeft size={14}/><span>Previous</span>
  </PaginationLink>
);
const PaginationNext = ({ className, ...rest }: { className?: string; onClick?: () => void; disabled?: boolean }) => (
  <PaginationLink aria-label="Go to next page" size="default" className={cn('Tapas-Pagination-Next', className)} {...rest}>
    <span>Next</span><Chevron size={14}/>
  </PaginationLink>
);
const PaginationEllipsis = ({ className }: { className?: string }) => (
  <span aria-hidden="true" className={cn('Tapas-Pagination-Ellipsis', className)}>…</span>
);
export const Pagination = { Root: PaginationRoot, Content: PaginationContent, Item: PaginationItem, Link: PaginationLink, Previous: PaginationPrevious, Next: PaginationNext, Ellipsis: PaginationEllipsis };

// --- TextLink ---
interface TextLinkProps { variant?: 'default' | 'subtle' | 'inverse'; size?: 'inherit' | 'small' | 'medium'; destructive?: boolean; external?: boolean; className?: string; children?: ReactNode; href?: string; onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void; }
export const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>(({
  variant = 'default', size = 'inherit', destructive = false, external = false, className, children, ...rest
}, ref) => (
  <a ref={ref}
    data-variant={variant} data-size={size} data-destructive={destructive ? 'true' : undefined}
    target={external ? '_blank' : undefined}
    rel={external ? 'noopener noreferrer' : undefined}
    className={cn('Tapas-TextLink', className)} {...rest}>
    {children}
    {external && <External size={12} className="ml-1 inline" aria-hidden="true"/>}
  </a>
));
TextLink.displayName = 'TextLink';

// needed for PopoverTrigger cloneElement
import React from 'react';
import { Chevron, ChevronLeft, External } from '../icons';
