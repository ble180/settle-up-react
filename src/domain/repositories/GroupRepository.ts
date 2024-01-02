import { Group } from '../models/Group';

export interface GroupRepository {
  getGroup(): Promise<Group | undefined>;
  save(group: Group): Promise<Group>;
}
