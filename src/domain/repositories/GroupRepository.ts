import { Group } from '../models/Group';

export interface GroupRepository {
  getGroup(): Promise<Group>;
  save(group: Group): Promise<Group>;
}
