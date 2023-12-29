import { GroupRepository } from '../../repositories/GroupRepository';
import { Group } from '../../models/Group';

export const inMemoryGroupRepository = (
  defaultGroup: Group
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
