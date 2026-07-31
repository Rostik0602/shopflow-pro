import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CategoryFilter } from "../../../types/product";
import styles from "./Filters.module.scss";

interface FiltersProps {
  categories: string[];
  value: CategoryFilter;
  onChange: (category: CategoryFilter) => void;
}

const ALL_LABEL = "All categories";

export default function Filters({ categories, value, onChange }: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelect = (category: CategoryFilter) => {
    onChange(category);
    setIsOpen(false);
  };

  const currentLabel = value === "all" ? ALL_LABEL : value;

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button
        type="button"
        className={styles.select}
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Category filter"
      >
        <span className={styles.value}>{currentLabel}</span>
        <ChevronDown
          size={16}
          className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
        />
      </button>

      {isOpen && (
        <ul className={styles.options} role="listbox">
          <li
            role="option"
            aria-selected={value === "all"}
            className={`${styles.option} ${value === "all" ? styles.optionActive : ""}`}
            onClick={() => handleSelect("all")}
          >
            {ALL_LABEL}
          </li>

          {categories.map((category) => (
            <li
              key={category}
              role="option"
              aria-selected={value === category}
              className={`${styles.option} ${value === category ? styles.optionActive : ""}`}
              onClick={() => handleSelect(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
