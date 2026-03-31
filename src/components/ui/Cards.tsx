import React from 'react';
import Link from 'next/link';

type HubCardProps = {
  href: string;
  title: string;
  subtitle: string;
  isExternal?: boolean;
  className?: string;
};

type SectionProps = React.PropsWithChildren<{
  className?: string;
}>;

function joinClasses(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function HubCard({
  href,
  title,
  subtitle,
  isExternal = false,
  className = '',
}: HubCardProps) {
  const content = (
    <div
      className={joinClasses(
        'group relative flex min-h-[124px] flex-col justify-between overflow-hidden bg-[#0d1016] p-[18px_20px_22px] text-left transition-[transform,filter] duration-200 hover:brightness-110 hover:-translate-y-[2px]',
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(135deg, rgba(113,132,160,0.28) 0%, rgba(113,132,160,0.08) 35%, rgba(0,0,0,0) 100%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[8px] bg-[#ff0000]"
        aria-hidden="true"
      />
      <span className="relative font-mono text-[32px] font-bold uppercase tracking-[-1.4px] text-white">
        {title}
      </span>
      <span className="relative max-w-[22ch] font-sans text-[11px] font-semibold uppercase leading-[1.35] tracking-[0.7px] text-[#d6deeb]">
        {subtitle}
      </span>
    </div>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="block">
      {content}
    </Link>
  );
}

export function AngledSection({ children, className = '' }: SectionProps) {
  return (
    <section
      className={joinClasses('relative overflow-hidden bg-[#0b0d12] text-white', className)}
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 28px 100%, 0 calc(100% - 28px))' }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(180deg, rgba(113,132,160,0.18) 0%, rgba(113,132,160,0.06) 40%, rgba(0,0,0,0) 100%)',
        }}
      />
      <div className="relative h-full w-full">{children}</div>
    </section>
  );
}

export function GradientPanel({ children, className = '' }: SectionProps) {
  return (
    <div
      className={joinClasses('relative overflow-hidden bg-[#0b0d12]', className)}
      style={{
        background:
          'linear-gradient(135deg, rgba(113,132,160,0.38) 0%, rgba(44,52,67,0.92) 42%, rgba(8,10,14,1) 100%)',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%), repeating-linear-gradient(-45deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 2px, transparent 2px, transparent 14px)',
        }}
      />
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}

export default HubCard;
