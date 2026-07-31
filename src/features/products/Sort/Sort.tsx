import Button from "../../../components/Button/Button";
import type { SortDirection, SortType } from "../../../types/product";
import styles from "./Sort.module.scss";

interface SortProps {
  value: SortType;
  direction: SortDirection;
  onClick: (sort: SortType) => void;
}

export default function Sort({ value, direction, onClick }: SortProps) {
  const arrow = direction === "asc" ? "↑" : "↓";

  return (
    <div className={styles.group}>
      <Button
        className={styles.sortButton}
        onClick={() => onClick("price")}
        variant={value === "price" ? "primary" : "secondary"}
      >
        Price {value === "price" && arrow}
      </Button>
      <Button
        className={styles.sortButton}
        onClick={() => onClick("title")}
        variant={value === "title" ? "primary" : "secondary"}
      >
        Title
      </Button>
      <Button
        className={styles.sortButton}
        onClick={() => onClick("rating")}
        variant={value === "rating" ? "primary" : "secondary"}
      >
        Rating {value === "rating" && arrow}
      </Button>
    </div>
  );
}
