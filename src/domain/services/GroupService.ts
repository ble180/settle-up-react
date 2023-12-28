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
      Promise.reject(new InvalidGroupOperation(`Payment user isn't in group`));
    }

    if (!areUsersInGroup(group, payment.members)) {
      Promise.reject(
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
      newBalance[user.id] -= quantityByUser;
    }

    // adjust payment user balance
    newBalance[payment.user.id] += payment.quantity;

    return groupRepository.save(newGroup);
  },

  addMemberToGroup: (group: Group, user: User) => {
    if (isUserInGroup(group, user)) {
      return Promise.resolve(group);
    }

    const newGroup = { ...group };
    newGroup.members = [...group.members, user];

    return groupRepository.save(newGroup);
  },
});
