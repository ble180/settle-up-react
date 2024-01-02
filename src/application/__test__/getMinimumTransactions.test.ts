import { Group, GroupBalance } from '@/domain/models/Group';
import { User } from '@/domain/models/User';
import { describe, expect, test } from 'vitest';
import { getMinimumTransactions } from '../getMinimumTransactions';
import { inMemoryGroupRepository } from './InMemoryGroupRepository';

describe('getMinimumTransactions', () => {
  test('exact transaction', async () => {
    const group = createGroup({
      '1': 10,
      '2': -10
    });
    const repository = inMemoryGroupRepository(group);

    const transactions = await getMinimumTransactions(repository)();
    expect(transactions).toEqual([
      {
        from: group.members[1],
        to: group.members[0],
        quantity: 10
      }
    ]);
  });

  test('multiple transaction', async () => {
    const group = createGroup({
      '1': -10,
      '2': -5,
      '3': 5,
      '4': 10
    });
    const repository = inMemoryGroupRepository(group);

    const transactions = await getMinimumTransactions(repository)();
    expect(transactions).toEqual([
      {
        from: group.members[0],
        to: group.members[3],
        quantity: 10
      },
      {
        from: group.members[1],
        to: group.members[2],
        quantity: 5
      }
    ]);
  });

  test('multiple transaction with divisions', async () => {
    const group = createGroup({
      '1': -15.5,
      '2': 0,
      '3': 5.5,
      '4': 10
    });
    const repository = inMemoryGroupRepository(group);

    const transactions = await getMinimumTransactions(repository)();
    expect(transactions).toEqual([
      {
        from: group.members[0],
        to: group.members[3],
        quantity: 10
      },
      {
        from: group.members[0],
        to: group.members[2],
        quantity: 5.5
      }
    ]);
  });
});

function createGroup(balance: GroupBalance): Group {
  return {
    name: 'Test',
    members: [
      createUser({ id: '1', name: 'Juan' }),
      createUser({ id: '2', name: 'Luis' }),
      createUser({ id: '3', name: 'Pedro' }),
      createUser({ id: '4', name: 'Abel' })
    ],
    payments: [],
    balance
  };
}

function createUser(user: User = { id: '1', name: 'User' }): User {
  const { id, name } = user;
  return {
    id,
    name
  };
}
