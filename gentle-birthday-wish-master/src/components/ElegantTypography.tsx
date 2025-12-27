import { ReactNode } from "react";

interface ElegantTypographyProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ElegantTypography = ({ children, className = "", delay = 0 }: ElegantTypographyProps) => {
  return (
    <span
      className={`inline-block ${className}`}
      style={{
        animation: `letterReveal 1.8s ease-out ${delay}s both`,
        letterSpacing: "0.05em",
      }}
    >
      {children}
    </span>
  );
};

export default ElegantTypography;

