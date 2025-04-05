import { IconShieldCheck } from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const Logo = ({ size = "md", showText = true, className = "" }) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10"
  };

  return (
    <Link to="/" className={`flex items-center gap-2 ${className}`}>
      <IconShieldCheck className={`${sizeClasses[size]} text-white`} />
      {showText && (
        <span className="font-semibold text-white text-lg">PhishShield</span>
      )}
    </Link>
  );
}; 