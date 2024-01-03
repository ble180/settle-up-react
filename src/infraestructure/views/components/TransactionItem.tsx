import { Transaction } from '@/application/getMinimumTransactions';
import { formatQuantity } from '@/domain/models/Payment';
import styles from './TransactionItem.module.scss';

interface TransactionProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionProps) {
  return (
    <div className={styles.transactionItem}>
      <div className={styles.transactionItem__fromContainer}>
        <span className={styles.transactionItem__fromUser}>
          {transaction.from.name}
        </span>
        <span className={styles.transactionItem__quantity}>
          {formatQuantity(transaction.quantity)}
        </span>
      </div>
      <span>&rarr;</span>
      <span>{transaction.to.name}</span>
    </div>
  );
}
