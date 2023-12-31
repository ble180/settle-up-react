import { Group } from '@/domain/models/Group';
import { GroupService, groupService } from '@/domain/services/GroupService';
import { localStorageGroupRepository } from '@/infraestructure/repositories/LocalStorageGroupRepository';
import { createContext } from 'react';

export type DIContainer = {
  groupService: GroupService;
  group: Group;
};

const _groupService = groupService(localStorageGroupRepository);
const group = await _groupService.getGroup();

const diContainer: DIContainer = {
  groupService: _groupService,
  group
};

export const DIContext = createContext<DIContainer>(diContainer);

export const DIProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DIContext.Provider value={diContainer}>{children}</DIContext.Provider>
  );
};
