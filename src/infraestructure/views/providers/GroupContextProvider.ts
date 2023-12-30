import { createContext } from 'react';
import { groupService } from '@/domain/services/GroupService';
import { localStorageGroupRepository } from '@/infraestructure/repositories/LocalStorageGroupRepository';
import { Group } from '@/domain/models/Group';

const _groupService = groupService(localStorageGroupRepository);

export const group = await _groupService.getGroup();
export const GroupContext = createContext<Group>(group);
