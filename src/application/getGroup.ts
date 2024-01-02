import { Group, createDefaultGroup } from '@/domain/models/Group';
import { GroupRepository } from '@/domain/repositories/GroupRepository';

export function getGroup(groupRespository: GroupRepository) {
  return async function (): Promise<Group> {
    let group = await groupRespository.getGroup();

    if (!group) {
      group = createDefaultGroup();
      await groupRespository.save(group);
    }

    return Promise.resolve(group);
  };
}
