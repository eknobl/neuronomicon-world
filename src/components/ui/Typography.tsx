import React from 'react';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

interface ParagraphProps extends TypographyProps {
  size?: 'sm' | 'base' | 'lg';
  opacity?: 'normal' | 'muted';
}

/**
 * Global Paragraph component for standard body text.
 * Defaults to the 'Roboto' body font (var(--font-body)), white text, and normal weight.
 */
export const Paragraph = ({ children, className = '', size = 'base', opacity = 'normal' }: ParagraphProps) => {
  const sizeClasses = {
    sm: 'text-[12px] leading-tight',
    base: 'text-[14px] leading-relaxed',
    lg: 'text-[20px] leading-[1.55]',
  };

  const opacityClasses = {
    normal: 'text-nmc-white opacity-100',
    muted: 'text-nmc-white opacity-90',
  };

  return (
    <p className={`font-body font-medium ${sizeClasses[size]} ${opacityClasses[opacity]} ${className}`}>
      {children}
    </p>
  );
};

interface HeadingProps extends TypographyProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Global Heading component. Defaults to uppercase Kode Mono (font-mono) with bold weight.
 */
export const Heading = ({ children, as: Component = 'h2', className = '' }: HeadingProps) => {
  const baseClasses = 'font-mono font-bold text-nmc-white uppercase leading-none';

  const sizeClasses = {
    h1: 'text-[48px] md:text-[64px]',
    h2: 'text-[30px] md:text-[40px]',
    h3: 'text-[24px]',
    h4: 'text-[20px]',
    h5: 'text-[16px]',
    h6: 'text-[14px]',
  };

  return (
    <Component className={`${baseClasses} ${sizeClasses[Component]} ${className}`}>
      {children}
    </Component>
  );
};

/**
 * A specialized mono label component often used for tags, breadcrumbs, or overlines (e.g. ":::").
 */
export const LabelMono = ({ children, className = '' }: TypographyProps) => {
  return (
    <span className={`font-mono text-[11px] text-nmc-steel tracking-[1px] select-none ${className}`}>
      {children}
    </span>
  );
};
