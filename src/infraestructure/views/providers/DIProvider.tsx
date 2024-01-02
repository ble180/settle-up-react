import { addPayment } from '@/application/addPayment';
import { createMember } from '@/application/createMember';
import { getGroup } from '@/application/getGroup';
import {
  Transaction,
  getMinimumTransactions
} from '@/application/getMinimumTransactions';
import { Group } from '@/domain/models/Group';
import { Payment } from '@/domain/models/Payment';
import { User } from '@/domain/models/User';
import { localStorageGroupRepository } from '@/infraestructure/repositories/LocalStorageGroupRepository';
import { createContext } from 'react';

export type DIContainer = {
  createMember: (user: User) => Promise<Group>;
  getGroup: () => Promise<Group>;
  addPayment: (payment: Payment) => Promise<Group>;
  getMinimumTransactions: () => Promise<Transaction[]>;
};

const _createMember = createMember(localStorageGroupRepository);
const _getGroup = getGroup(localStorageGroupRepository);
const _addPayment = addPayment(localStorageGroupRepository);
const _getMinimumTransactions = getMinimumTransactions(
  localStorageGroupRepository
);

const diContainer: DIContainer = {
  createMember: _createMember,
  getGroup: _getGroup,
  addPayment: _addPayment,
  getMinimumTransactions: _getMinimumTransactions
};

export const DIContext = createContext<DIContainer>(diContainer);

export const DIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DIContext.Provider value={diContainer}>{children}</DIContext.Provider>
  );
};
