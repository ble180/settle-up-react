import { InvalidGroupOperation } from '@/domain/exceptions/InvalidGroupOperation';
import { Group, areUsersInGroup, isUserInGroup } from '@/domain/models/Group';
import { Payment } from '@/domain/models/Payment';
import { GroupRepository } from '@/domain/repositories/GroupRepository';

export function addPayment(groupRepository: GroupRepository) {
  return async function (payment: Payment): Promise<Group> {
    const group = await groupRepository.getGroup();

    if (!group) {
      return Promise.reject(new Error("Group doesn't exist yet"));
    }

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
    newGroup.payments = [payment, ...group.payments];

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
  };
}
