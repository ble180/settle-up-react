import { Transaction } from '@/application/getMinimumTransactions';
import { DIContext } from '@/infraestructure/views/providers/DIProvider';
import { useContext, useEffect, useState } from 'react';
import { TransactionItem } from './TransactionItem';

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
    <>
      {transactions.map((t) => (
        <TransactionItem key={t.id} transaction={t} />
      ))}
    </>
  );
}
