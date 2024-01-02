import { Group } from '@/domain/models/Group';
import { Payment } from '@/domain/models/Payment';
import { User } from '@/domain/models/User';
import { v4 as uuidv4 } from 'uuid';
import { describe, expect, test } from 'vitest';
import { addPayment } from '../addPayment';
import { inMemoryGroupRepository } from './InMemoryGroupRepository';

describe('addPayment', () => {
  test('addPaymentToGroup to all members', async () => {
    let group = createGroupWithUsers();
    const juan = group.members[0];
    const luis = group.members[1];
    const repository = inMemoryGroupRepository(group);

    const payment = createPayment({
      user: juan,
      members: [juan, luis],
      quantity: 10
    });

    group = await addPayment(repository)(payment);
    expect(group.payments).toContain(payment);
    expect(group.balance[juan.id]).toBe(5);
    expect(group.balance[luis.id]).toBe(-5);
  });

  test('addPaymentToGroup to not payment user', async () => {
    let group = createGroupWithUsers();
    const juan = group.members[0];
    const luis = group.members[1];
    const repository = inMemoryGroupRepository(group);

    const payment = createPayment({
      user: juan,
      members: [luis],
      quantity: 10
    });

    group = await addPayment(repository)(payment);
    expect(group.payments).toContain(payment);
    expect(group.balance[juan.id]).toBe(10);
    expect(group.balance[luis.id]).toBe(-10);
  });

  test('addPaymentToGroup to only payment user', async () => {
    let group = createGroupWithUsers();
    const juan = group.members[0];
    const luis = group.members[1];
    const repository = inMemoryGroupRepository(group);

    const payment = createPayment({
      user: juan,
      members: [juan],
      quantity: 10
    });

    group = await addPayment(repository)(payment);
    expect(group.payments).toContain(payment);
    expect(group.balance[juan.id]).toBe(0);
    expect(group.balance[luis.id]).toBe(0);
  });

  test('addPaymentToGroup add multiple payments', async () => {
    let group = createGroupWithUsers();
    const juan = group.members[0];
    const luis = group.members[1];
    const repository = inMemoryGroupRepository(group);

    // juan: 5, luis: -5
    await addPayment(repository)(
      createPayment({
        user: juan,
        members: [juan, luis],
        quantity: 10
      })
    );

    // juan: -5, luis: 5
    await addPayment(repository)(
      createPayment({
        user: luis,
        members: [juan, luis],
        quantity: 20
      })
    );

    // juan: -10, luis: 10
    await addPayment(repository)(
      createPayment({
        user: luis,
        members: [juan],
        quantity: 5
      })
    );

    // juan: 40, luis: -40
    group = await addPayment(repository)(
      createPayment({
        user: juan,
        members: [luis],
        quantity: 50
      })
    );

    expect(group.balance[juan.id]).toBe(40);
    expect(group.balance[luis.id]).toBe(-40);
  });

  test('addPaymentToGroup to an unexisting member => invalid payment', async () => {
    const group = createGroupWithUsers();
    const repository = inMemoryGroupRepository(group);

    const juan = group.members[0];
    const pedro = createUser({ id: '3', name: 'Pedro' });

    const payment = createPayment({
      user: juan,
      members: [pedro],
      quantity: 10
    });

    await expect(() => addPayment(repository)(payment)).rejects.toThrowError(
      `Some payment member isn't in group`
    );
  });

  test('addPaymentToGroup from unexisting member => invalid payment', async () => {
    const group = createGroupWithUsers();
    const repository = inMemoryGroupRepository(group);

    const juan = group.members[0];
    const pedro = createUser({ id: '3', name: 'Pedro' });

    const payment = createPayment({
      user: pedro,
      members: [juan],
      quantity: 10
    });

    await expect(() => addPayment(repository)(payment)).rejects.toThrowError(
      `Payment user isn't in group`
    );
  });
});

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
