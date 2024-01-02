import { Payment, formatQuantity } from '@/domain/models/Payment';
import styles from './PaymentItem.module.scss';

export function PaymentItem({ payment }: { payment: Payment }) {
  return (
    <div className={styles.paymentItem}>
      <div className={styles.paymentItem__column}>
        <span className={styles.paymentItem__user}>{payment.user.name}</span>
        <span className={styles.paymentItem__concept}>{payment.name}</span>
      </div>
      <div
        className={`${styles.paymentItem__column} ${styles['paymentItem__column--right']}`}
      >
        <span className={styles.paymentItem__quantity}>
          {formatQuantity(payment.quantity)}
        </span>
        <span className={styles.paymentItem__date}>
          {formatDate(payment.operationDate)}
        </span>
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  const rtf = new Intl.RelativeTimeFormat(navigator.language, {
    numeric: 'auto'
  });

  const timeMs = date.getTime();
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity
  ];
  const units: Intl.RelativeTimeFormatUnit[] = [
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year'
  ];

  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds)
  );

  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}
