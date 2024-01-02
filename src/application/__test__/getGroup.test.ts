import { createDefaultGroup } from '@/domain/models/Group';
import { describe, expect, test } from 'vitest';
import { getGroup } from '../getGroup';
import { inMemoryGroupRepository } from './InMemoryGroupRepository';

describe('getGroup', () => {
  test('non existing group yet => default group', async () => {
    const repository = inMemoryGroupRepository();
    const defaultGroup = createDefaultGroup();

    const group = await getGroup(repository)();
    expect(group).toEqual(defaultGroup);
  });

  test('with an existing group', async () => {
    const repository = inMemoryGroupRepository({
      name: 'Grupo de prueba',
      members: [],
      payments: [],
      balance: {}
    });

    const group = await getGroup(repository)();
    expect(group.name).toBe('Grupo de prueba');
  });
});
