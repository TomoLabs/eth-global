import { ReactNode } from "react";

interface MarqueeTextProps {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
  className?: string;
}

const MarqueeText = ({ children, reverse = false, speed = 30, className = "" }: MarqueeTextProps) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div 
        className={`inline-block ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'}`}
        style={{ 
          animationDuration: `${speed}s`,
          minWidth: '100%'
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default MarqueeText;