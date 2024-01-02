import styles from './Select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value?: string;
  label?: string;
  options: SelectOption[];
  onChange?: (option: SelectOption) => void;
}

export function Select({ value, label, options, onChange }: SelectProps) {
  function handleOnChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (onChange) {
      const value = event.target.value;
      const option = options.find((o) => o.value === value) as SelectOption;
      onChange(option);
    }
  }

  return (
    <div className={styles.select}>
      {label && <label className={styles.select__label}>{label}</label>}
      <select
        name={label}
        className={styles.select__select}
        value={value}
        onChange={handleOnChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
