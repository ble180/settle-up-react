import { Transaction } from '@/application/getMinimumTransactions';
import { TransactionItem } from '@/infraestructure/views/components/TransactionItem';
import { DIContext } from '@/infraestructure/views/providers/DIProvider';
import { useContext, useEffect, useState } from 'react';
import styles from './TransactionList.module.scss';

export function TransactionList() {
  const { getMinimumTransactions } = useContext(DIContext);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    (async () => {
      const transactions = await getMinimumTransactions();
      setTransactions(transactions);
    })();
  }, [getMinimumTransactions]);

  return (
    <div className={styles.transactionList}>
      <span className={styles.transactionList__title}>Deudas</span>
      {transactions.map((t) => (
        <TransactionItem key={t.id} transaction={t} />
      ))}
    </div>
  );
}
