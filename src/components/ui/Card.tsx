import React from 'react';
import { cn } from '@/lib/utils/validation';

// Change this line to extend the interface with specific properties
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add a specific property to the interface
  variant?: 'default' | 'outline' | 'ghost';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border bg-card text-card-foreground shadow-sm",
          variant === 'outline' && "bg-transparent",
          variant === 'ghost' && "border-none shadow-none bg-transparent",
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = "Card";

export default Card;