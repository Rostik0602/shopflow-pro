import styles from "./EmptyState.module.scss";
import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  icon?: LucideIcon;
}

export default function EmptyState({
  message = "Nothing found",
  icon: Icon,
}: EmptyStateProps) {
  return (
    <div className={styles.wrapper}>
      {Icon && <Icon size={48} strokeWidth={1.5} />}
      <p>{message}</p>
    </div>
  );
}
