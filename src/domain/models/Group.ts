import { Payment } from './Payment';
import { User } from './User';

export type Group = {
  name: string;
  members: User[];
  payments: Payment[];
  balance: GroupBalance;
};

export type GroupBalance = {
  [userId: string]: number;
};

export function isUserInGroup(group: Group, user: User): boolean {
  return group.members.some((member) => member.id === user.id);
}
