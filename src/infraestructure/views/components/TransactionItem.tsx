import { Transaction } from '@/application/getMinimumTransactions';

interface TransactionProps {
  transaction: Transaction;
}

export function TransactionItem({ transaction }: TransactionProps) {
  return (
    <>
      <span>{transaction.from.name}</span>
      <span>{transaction.to.name}</span>
      <span>{transaction.quantity}</span>
    </>
  );
}
