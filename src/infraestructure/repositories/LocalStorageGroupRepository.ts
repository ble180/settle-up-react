import { Group } from '../../domain/models/Group';
import { GroupRepository } from '../../domain/repositories/GroupRepository';

const GROUP_ITEM_KEY = 'group';

export const localStorageGroupRepository: GroupRepository = {
  getGroup() {
    const group = localStorage.getItem(GROUP_ITEM_KEY);
    if (!group) {
      return Promise.reject();
    }
    return Promise.resolve(JSON.parse(group));
  },

  save(group) {
    localStorage.setItem(GROUP_ITEM_KEY, JSON.stringify(group));
    return Promise.resolve(group);
  }
};

// TODO - revisar
async function initialize() {
  let group: Group;

  try {
    group = await localStorageGroupRepository.getGroup();
  } catch (e) {
    group = {
      name: 'Amigos',
      members: [],
      payments: [
        {
          name: 'Pagos',
          members: [],
          quantity: 0,
          operationDate: new Date(),
          user: {
            id: '1',
            name: 'Pepe'
          }
        }
      ],
      balance: {}
    };
  }

  localStorageGroupRepository.save(group);
}

initialize().then();
