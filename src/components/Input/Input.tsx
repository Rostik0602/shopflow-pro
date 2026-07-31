import styles from "./Input.module.scss";
interface InputProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name?: string;
  placeholder?: string;
  list?: string;
  min?: number;
  max?: number;
  step?: number;
}

export default function Input({
  value,
  onChange,
  type = "text",
  name,
  placeholder,
  list,
  min,
  max,
  step,
}: InputProps) {
  return (
    <input
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      list={list}
      min={min}
      max={max}
      step={step}
      className={styles.input}
    />
  );
}
