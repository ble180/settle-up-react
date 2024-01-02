import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  primary?: boolean;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
}

export function Button({
  label,
  primary = false,
  disabled = false,
  onClick
}: ButtonProps) {
  const primaryClassName = primary ? styles['button--primary'] : '';
  return (
    <button
      className={`${styles.button} ${primaryClassName}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
}
