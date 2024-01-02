import { Group } from '@/domain/models/Group';
import { Payment } from '@/domain/models/Payment';
import { User } from '@/domain/models/User';
import { v4 as uuidv4 } from 'uuid';
import { describe, expect, test } from 'vitest';
import { addPayment } from '../addPayment';
import { createMember } from '../createMember';
import { inMemoryGroupRepository } from './InMemoryGroupRepository';

describe('createMember', () => {
  test('add member to an empty group', async () => {
    const repository = inMemoryGroupRepository(createGroup());
    const user = createUser();

    const group = await createMember(repository)(user);
    expect(group.members).toContain(user);
    expect(group.balance[user.id]).toBe(0);
  });

  test('add member to a group with existing members', async () => {
    const repository = inMemoryGroupRepository(createGroupWithUsers());
    const user = createUser({ id: '3', name: 'Pedro' });

    const group = await createMember(repository)(user);
    expect(group.members).toContain(user);
    expect(group.balance[user.id]).toBe(0);
  });

  test('add member to a group with existing payments', async () => {
    let group = createGroupWithUsers();
    const repository = inMemoryGroupRepository(group);

    group = await addPayment(repository)(
      createPayment({
        user: group.members[0],
        members: group.members,
        quantity: 10
      })
    );

    const user = createUser({ id: '3', name: 'Pedro' });
    group = await createMember(repository)(user);
    expect(group.members).toContain(user);
    expect(group.balance[user.id]).toBe(0);
  });
});

function createGroup(): Group {
  return {
    name: 'Test',
    members: [],
    payments: [],
    balance: {}
  };
}

function createGroupWithUsers(): Group {
  return {
    name: 'Test',
    members: [
      createUser({ id: '1', name: 'Juan' }),
      createUser({ id: '2', name: 'Luis' })
    ],
    payments: [],
    balance: {
      1: 0,
      2: 0
    }
  };
}

function createUser(user: User = { id: '1', name: 'User' }): User {
  const { id, name } = user;
  return {
    id,
    name
  };
}

function createPayment(payment: {
  user: User;
  members: User[];
  quantity: number;
}): Payment {
  const { user, members, quantity } = payment;
  return {
    id: uuidv4(),
    name: 'Cena',
    user,
    members,
    quantity,
    operationDate: new Date()
  };
}
