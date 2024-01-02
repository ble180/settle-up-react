import { GroupBalance } from '@/domain/models/Group';
import { User } from '@/domain/models/User';
import { GroupRepository } from '@/domain/repositories/GroupRepository';
import { v4 as uuidv4 } from 'uuid';

export interface Transaction {
  id: string;
  from: User;
  to: User;
  quantity: number;
}

export interface InternalTransaction {
  from: string;
  to: string;
  quantity: number;
}

export function getMinimumTransactions(groupRespository: GroupRepository) {
  return async function (): Promise<Transaction[]> {
    const group = await groupRespository.getGroup();
    if (!group) {
      throw new Error("Group doesn't exist yet");
    }

    const newBalance = { ...group.balance };
    return getNegativeBalances(group.balance)
      .map(([memberId, memberBalance]) =>
        getTransactionsForUser(memberId, memberBalance, newBalance)
      )
      .flatMap((t) => t)
      .map((t) => {
        const from = group.members.find((m) => m.id === t.from)!;
        const to = group.members.find((m) => m.id === t.to)!;
        return {
          id: uuidv4(),
          from,
          to,
          quantity: t.quantity
        };
      });
  };
}

function getTransactionsForUser(
  userId: string,
  quantity: number,
  balance: GroupBalance
): InternalTransaction[] {
  const transactions: InternalTransaction[] = [];
  let positiveBalances = getPositiveBalances(balance);

  let restQuantity = quantity;
  while (restQuantity < 0) {
    const [maxUserId, maxUserBalance] = positiveBalances[0];
    if (maxUserBalance > Math.abs(quantity)) {
      balance[maxUserId] += quantity;
      restQuantity = 0;

      transactions.push({
        from: userId,
        to: maxUserId,
        quantity: Math.abs(quantity)
      });
    } else {
      balance[maxUserId] = 0;
      restQuantity = restQuantity + maxUserBalance;

      transactions.push({
        from: userId,
        to: maxUserId,
        quantity: maxUserBalance
      });
    }

    positiveBalances = getPositiveBalances(balance);
  }

  return transactions;
}

function getPositiveBalances(balance: GroupBalance) {
  return Object.entries(balance)
    .filter(([, balanceQuantity]) => balanceQuantity > 0)
    .sort((a, b) => b[1] - a[1]);
}

function getNegativeBalances(balance: GroupBalance) {
  return Object.entries(balance)
    .filter(([, balanceQuantity]) => balanceQuantity < 0)
    .sort((a, b) => a[1] - b[1]);
}
