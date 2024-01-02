import styles from './Select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: SelectOption[];
}

export function Select({ label, options }: SelectProps) {
  return (
    <div className={styles.select}>
      {label && <label className={styles.select__label}>{label}</label>}
      <select name={label} className={styles.select__select}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
