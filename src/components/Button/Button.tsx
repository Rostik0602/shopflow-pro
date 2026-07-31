import styles from "./Button.module.scss";
import type { LucideIcon } from "lucide-react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "danger" | "danger-solid" | "secondary";
  icon?: LucideIcon;
  className?: string;
}

export default function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  icon: Icon,
  className,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${className ?? ""}`}
    >
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}
