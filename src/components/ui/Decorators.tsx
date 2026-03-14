import React from 'react';

// Common visual decorators for the Style Library
// Grouping small reusable visual flourishes into one file.

export const Tricolon = ({ className = '', style }: { className?: string, style?: React.CSSProperties }) => (
  <span
    className={`font-mono text-[11px] tracking-[1px] text-nmc-steel select-none ${className}`}
    aria-hidden="true"
    style={style}
  >
    :::
  </span>
);

export const DecoSlash = ({ className = '' }: { className?: string }) => (
  <span className={`font-mono text-[50px] leading-none select-none text-nmc-white ${className}`} aria-hidden="true">
    {'///'}
  </span>
);

export const DecoArrows = ({ className = '' }: { className?: string }) => (
  <span className={`font-mono text-[50px] leading-none select-none text-nmc-white ${className}`} aria-hidden="true">
    {'>>'}
  </span>
);

export const DecoPlus = ({ className = '' }: { className?: string }) => (
  <span className={`font-mono text-[50px] leading-none select-none text-nmc-white ${className}`} aria-hidden="true">
    {'+'}
  </span>
);

export const HazardStripes = ({ className = '' }: { className?: string }) => (
  <div
    className={`relative overflow-hidden bg-nmc-bg ${className}`}
    aria-hidden="true"
    style={{
      backgroundImage: 'repeating-linear-gradient(-45deg, var(--color-nmc-red) 0px, var(--color-nmc-red) 14px, transparent 14px, transparent 32px)',
      clipPath: 'polygon(0 100%, 100% 100%, 0 0)' // Classic slanted cut
    }}
  />
);

export const DiagonalStripes = ({ className = '' }: { className?: string }) => (
    <div
      className={`relative overflow-hidden ${className}`}
      aria-hidden="true"
      style={{
        background: 'repeating-linear-gradient(-45deg, #ff0000 0px, #ff0000 18px, #000000 18px, #000000 36px)'
      }}
    />
  );

type BracketPosition = 'tl' | 'tr' | 'bl' | 'br';
type BracketColor = 'white' | 'red';

export const Bracket = ({
  position = 'tl',
  color = 'white',
  size = 35,
  thickness = 3,
  className = '',
  style
}: {
  position?: BracketPosition;
  color?: BracketColor;
  size?: number;
  thickness?: number;
  className?: string;
  style?: React.CSSProperties;
}) => {
  const cssColor = color === 'white' ? 'var(--color-nmc-white)' : 'var(--color-nmc-red)';

  // We construct the L shape using before/after psuedos on an absolute div,
  // or a wrapper. An inline style SVG is more robust for positioning.
  const pathData = {
    'tl': `M0 ${size} L0 0 L${size} 0 L${size} ${thickness} L${thickness} ${thickness} L${thickness} ${size} Z`,
    'tr': `M0 0 L${size} 0 L${size} ${size} L${size-thickness} ${size} L${size-thickness} ${thickness} L0 ${thickness} Z`,
    'bl': `M0 0 L0 ${size} L${size} ${size} L${size} ${size-thickness} L${thickness} ${size-thickness} L${thickness} 0 Z`,
    'br': `M${size} 0 L${size} ${size} L0 ${size} L0 ${size-thickness} L${size-thickness} ${size-thickness} L${size-thickness} 0 Z`
  };

  return (
    <div
      className={`absolute flex pointer-events-none z-[2] ${className}`}
      aria-hidden="true"
      style={{ width: size, height: size, ...style }}
    >
        <svg width="100%" height="100%" viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={pathData[position]} fill={cssColor} />
        </svg>
    </div>
  );
};