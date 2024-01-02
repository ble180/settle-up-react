import { createMember } from '@/application/createMember';
import { Group } from '@/domain/models/Group';
import { User } from '@/domain/models/User';
import { GroupService, groupService } from '@/domain/services/GroupService';
import { localStorageGroupRepository } from '@/infraestructure/repositories/LocalStorageGroupRepository';
import { createContext } from 'react';

export type DIContainer = {
  groupService: GroupService;
  createMember: (user: User) => Promise<Group>;
  group: Group;
};

const _groupService = groupService(localStorageGroupRepository);
const _createMember = createMember(localStorageGroupRepository);

const group = await _groupService.getGroup();

const diContainer: DIContainer = {
  groupService: _groupService,
  createMember: _createMember,
  group
};

export const DIContext = createContext<DIContainer>(diContainer);

export const DIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DIContext.Provider value={diContainer}>{children}</DIContext.Provider>
  );
};
