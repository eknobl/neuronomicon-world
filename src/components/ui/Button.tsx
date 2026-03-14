import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  stripeColor?: 'blue' | 'black' | 'red';
  disabled?: boolean;
  href?: string;
  isExternal?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button = ({
  children,
  variant = 'primary',
  stripeColor = 'black',
  disabled = false,
  href,
  isExternal,
  className = '',
  onClick,
}: ButtonProps) => {
  const isPrimary = variant === 'primary';
  const bgColor = isPrimary ? 'bg-nmc-red' : 'bg-nmc-steel'; // Assuming steel for secondary based on palette
  const hoverEffect = !disabled ? 'hover:brightness-115 cursor-pointer' : 'opacity-50 cursor-not-allowed';

  const stripeBg = {
    blue: 'bg-nmc-steel',
    black: 'bg-nmc-bg',
    red: 'bg-nmc-red',
  }[stripeColor];

  const contentClasses = `flex-1 flex items-center justify-center ${bgColor} text-nmc-white font-body font-black text-[11px] uppercase text-center tracking-[0.3px] px-[6px] leading-[1.2] transition-[filter] duration-200 focus-visible:outline-white focus-visible:outline-2 outline-offset-[-2px] ${hoverEffect} ${className}`;

  const renderContent = () => (
    <div className="flex items-stretch w-[158px] h-[41px]">
      <span className={`block w-[10px] shrink-0 ${stripeBg}`} aria-hidden="true" />
      {href ? (
        isExternal ? (
          <a
            href={disabled ? undefined : href}
            className={contentClasses}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            onClick={disabled ? (e) => e.preventDefault() : undefined}
          >
            {children}
          </a>
        ) : (
          <Link
            href={disabled ? '#' : href}
            className={contentClasses}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            onClick={disabled ? (e) => e.preventDefault() : undefined}
          >
            {children}
          </Link>
        )
      ) : (
        <button
          className={contentClasses}
          disabled={disabled}
          onClick={onClick}
          aria-disabled={disabled}
        >
          {children}
        </button>
      )}
    </div>
  );

  return renderContent();
};