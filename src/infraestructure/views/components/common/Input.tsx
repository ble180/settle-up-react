import styles from './Input.module.scss';

interface InputProps {
  value?: string;
  label?: string;
  placeholder?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  error?: string;
}

export function Input({
  value,
  label,
  required,
  placeholder,
  onChange,
  error
}: InputProps) {
  const labelRequiredClass = required ? styles['input__label--required'] : '';

  return (
    <div className={styles.input}>
      {label && (
        <label className={`${styles.input__label} ${labelRequiredClass}`}>
          {label}
        </label>
      )}
      <input
        className={styles.input__input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {error && <p className={styles.input__error}>{error}</p>}
    </div>
  );
}
