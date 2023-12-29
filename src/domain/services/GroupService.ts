import { InvalidGroupOperation } from '../exceptions/InvalidGroupOperation';
import { Group } from '../models/Group';
import { Payment } from '../models/Payment';
import { User } from '../models/User';
import { GroupRepository } from '../repositories/GroupRepository';

export interface GroupService {
  getGroup(): Promise<Group>;
  addMemberToGroup(group: Group, user: User): Promise<Group>;
  addPaymentToGroup(group: Group, payment: Payment): Promise<Group>;
}

function isUserInGroup(group: Group, user: User): boolean {
  return group.members.some((member) => member.id === user.id);
}

function areUsersInGroup(group: Group, users: User[]): boolean {
  return users.every((user) => isUserInGroup(group, user));
}

export const groupService = (
  groupRepository: GroupRepository
): GroupService => ({
  getGroup: () => groupRepository.getGroup(),

  addPaymentToGroup: (group: Group, payment: Payment) => {
    if (!isUserInGroup(group, payment.user)) {
      return Promise.reject(
        new InvalidGroupOperation(`Payment user isn't in group`)
      );
    }

    if (!areUsersInGroup(group, payment.members)) {
      return Promise.reject(
        new InvalidGroupOperation(`Some payment member isn't in group`)
      );
    }

    // add payment to group
    const newGroup = { ...group };
    newGroup.payments = [...group.payments, payment];

    // adjust group balance
    const quantityByUser = payment.quantity / payment.members.length;
    const newBalance = { ...group.balance };
    for (const user of payment.members) {
      const userBalance = newBalance[user.id] ?? 0;
      newBalance[user.id] = userBalance - quantityByUser;
    }

    // adjust payment user balance
    const userBalance = newBalance[payment.user.id] ?? 0;
    newBalance[payment.user.id] = userBalance + payment.quantity;
    newGroup.balance = newBalance;

    return groupRepository.save(newGroup);
  },

  addMemberToGroup: (group: Group, user: User) => {
    if (isUserInGroup(group, user)) {
      return Promise.resolve(group);
    }

    const newGroup = { ...group };
    newGroup.members = [...group.members, user];

    newGroup.balance = {
      ...group.balance,
      [user.id]: 0
    };

    return groupRepository.save(newGroup);
  }
});
