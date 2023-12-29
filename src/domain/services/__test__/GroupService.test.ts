import { describe, expect, test } from 'vitest';
import { groupService } from '../GroupService';
import { inMemoryGroupRepository } from './InMemoryGroupRepository';
import { Group } from '../../models/Group';
import { User } from '../../models/User';
import { Payment } from '../../models/Payment';

describe('GroupService', () => {
  test('getGroup', async () => {
    const service = groupService(inMemoryGroupRepository(createGroup()));

    const group = await service.getGroup();
    expect(group.name).toBe('Test');
  });

  test('addMemberToGroup with empty group', async () => {
    let group = createGroup();
    const user = createUser();

    const service = groupService(inMemoryGroupRepository(group));
    group = await service.addMemberToGroup(group, user);
    expect(group.members).toContain(user);
    expect(group.balance[user.id]).toBe(0);
  });

  test('addMemberToGroup with existing members', async () => {
    let group = createGroupWithUsers();
    const user = createUser({ id: '3', name: 'Pedro' });

    const service = groupService(inMemoryGroupRepository(group));
    group = await service.addMemberToGroup(group, user);
    expect(group.members).toContain(user);
    expect(group.balance[user.id]).toBe(0);
  });

  test('addMemberToGroup with existing payments', async () => {
    let group = createGroupWithUsers();
    const service = groupService(inMemoryGroupRepository(group));

    group = await service.addPaymentToGroup(
      group,
      createPayment({
        user: group.members[0],
        members: group.members,
        quantity: 10
      })
    );

    const user = createUser({ id: '3', name: 'Pedro' });
    group = await service.addMemberToGroup(group, user);
    expect(group.members).toContain(user);
    expect(group.balance[user.id]).toBe(0);
  });

  test('addPaymentToGroup to all members', async () => {
    let group = createGroupWithUsers();
    const juan = group.members[0];
    const luis = group.members[1];

    const service = groupService(inMemoryGroupRepository(group));
    const payment = createPayment({
      user: juan,
      members: [juan, luis],
      quantity: 10
    });

    group = await service.addPaymentToGroup(group, payment);
    expect(group.payments).toContain(payment);
    expect(group.balance[juan.id]).toBe(5);
    expect(group.balance[luis.id]).toBe(-5);
  });

  test('addPaymentToGroup to not payment user', async () => {
    let group = createGroupWithUsers();
    const juan = group.members[0];
    const luis = group.members[1];

    const service = groupService(inMemoryGroupRepository(group));
    const payment = createPayment({
      user: juan,
      members: [luis],
      quantity: 10
    });

    group = await service.addPaymentToGroup(group, payment);
    expect(group.payments).toContain(payment);
    expect(group.balance[juan.id]).toBe(10);
    expect(group.balance[luis.id]).toBe(-10);
  });

  test('addPaymentToGroup to only payment user', async () => {
    let group = createGroupWithUsers();
    const juan = group.members[0];
    const luis = group.members[1];

    const service = groupService(inMemoryGroupRepository(group));
    const payment = createPayment({
      user: juan,
      members: [juan],
      quantity: 10
    });

    group = await service.addPaymentToGroup(group, payment);
    expect(group.payments).toContain(payment);
    expect(group.balance[juan.id]).toBe(0);
    expect(group.balance[luis.id]).toBe(0);
  });

  test('addPaymentToGroup to an unexisting member => invalid payment', async () => {
    const group = createGroupWithUsers();
    const service = groupService(inMemoryGroupRepository(group));

    const juan = group.members[0];
    const pedro = createUser({ id: '3', name: 'Pedro' });

    const payment = createPayment({
      user: juan,
      members: [pedro],
      quantity: 10
    });

    await expect(() =>
      service.addPaymentToGroup(group, payment)
    ).rejects.toThrowError(`Some payment member isn't in group`);
  });

  test('addPaymentToGroup from unexisting member => invalid payment', async () => {
    const group = createGroupWithUsers();
    const service = groupService(inMemoryGroupRepository(group));

    const juan = group.members[0];
    const pedro = createUser({ id: '3', name: 'Pedro' });

    const payment = createPayment({
      user: pedro,
      members: [juan],
      quantity: 10
    });

    await expect(() =>
      service.addPaymentToGroup(group, payment)
    ).rejects.toThrowError(`Payment user isn't in group`);
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
    name: 'Cena',
    user,
    members,
    quantity,
    operationDate: new Date()
  };
}
