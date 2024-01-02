import { Group } from '@/domain/models/Group';
import { GroupRepository } from '@/domain/repositories/GroupRepository';

export const inMemoryGroupRepository = (
  defaultGroup?: Group
): GroupRepository => {
  let group = defaultGroup;

  const save = (g: Group): Promise<Group> => {
    group = g;
    return Promise.resolve(group);
  };

  const getGroup = () => {
    return Promise.resolve(group);
  };

  return { save, getGroup };
};
