import { Group, createDefaultGroup } from '@/domain/models/Group';
import { GroupRepository } from '@/domain/repositories/GroupRepository';

export function getGroup(groupRespository: GroupRepository) {
  return async function (): Promise<Group> {
    let group = await groupRespository.getGroup();

    if (!group) {
      group = createDefaultGroup();
      await groupRespository.save(group);
    }

    group.payments.sort(
      (p1, p2) => p2.operationDate.getTime() - p1.operationDate.getTime()
    );

    return Promise.resolve(group);
  };
}
