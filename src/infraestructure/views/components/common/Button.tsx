import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  primary?: boolean;
  onClick?: React.MouseEventHandler;
}

export function Button({ label, primary = false, onClick }: ButtonProps) {
  const primaryClassName = primary ? styles['button--primary'] : '';
  return (
    <button
      className={`${styles.button} ${primaryClassName}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
