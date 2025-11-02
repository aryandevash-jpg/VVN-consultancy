import { Button } from "@/components/ui/button";
import { useMagnetic } from "@/hooks/useScrollAnimation";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const MagneticButton = ({ children, className, style, ...props }: MagneticButtonProps) => {
  const { ref, position } = useMagnetic<HTMLButtonElement>(0.3);

  return (
    <Button
      ref={ref}
      className={className}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
        ...style,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default MagneticButton;

