import styles from './Checkbox.module.scss';

interface CheckboxProps {
  value: boolean;
  onChange: React.ChangeEventHandler;
}

export function Checkbox({ value, onChange }: CheckboxProps) {
  return (
    <input
      className={styles.checkbox}
      type="checkbox"
      checked={value}
      onChange={onChange}
    />
  );
}
