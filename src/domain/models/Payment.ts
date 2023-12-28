import { User } from './User';

export type Payment = {
  name: string;
  quantity: number;
  operationDate: Date;
  user: User;
  members: User[];
};
