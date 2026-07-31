import Input from "../../../components/Input/Input";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className={styles.wrapper}>
      <Input
        value={value}
        onChange={onChange}
        placeholder="Search products..."
      />
    </div>
  );
}
