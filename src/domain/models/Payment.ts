import { User } from './User';

export type Payment = {
  name: string;
  quantity: number;
  operationDate: Date;
  user: User;
  members: User[];
};

export function formatQuantity(quantity: number): string {
  return new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'EUR'
  }).format(quantity);
}
