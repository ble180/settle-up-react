import { Group, isUserInGroup } from '@/domain/models/Group';
import { User } from '@/domain/models/User';
import { GroupRepository } from '@/domain/repositories/GroupRepository';

export function createMember(groupRepository: GroupRepository) {
  return async function (user: User): Promise<Group> {
    const group = await groupRepository.getGroup();

    if (!group) {
      return Promise.reject(new Error("Group doesn't exist yet"));
    }

    if (isUserInGroup(group, user)) {
      return Promise.resolve(group);
    }

    const newGroup = { ...group };
    newGroup.members = [...group.members, user];

    newGroup.balance = {
      ...group.balance,
      [user.id]: 0
    };

    return groupRepository.save(newGroup);
  };
}
