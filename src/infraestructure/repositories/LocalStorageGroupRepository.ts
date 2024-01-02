import { Payment } from '@/domain/models/Payment';
import { GroupRepository } from '@/domain/repositories/GroupRepository';

const GROUP_ITEM_KEY = 'group';

export const localStorageGroupRepository: GroupRepository = {
  getGroup() {
    const groupStr = localStorage.getItem(GROUP_ITEM_KEY);
    if (!groupStr) {
      return Promise.resolve(undefined);
    }

    const group = JSON.parse(groupStr);
    group.payments.forEach((p: Payment) => {
      p.operationDate = new Date(p.operationDate);
    });

    return Promise.resolve(group);
  },

  save(group) {
    localStorage.setItem(GROUP_ITEM_KEY, JSON.stringify(group));
    return Promise.resolve(group);
  }
};
