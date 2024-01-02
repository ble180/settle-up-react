import { Group } from '@/domain/models/Group';
import { DIContext } from '@/infraestructure/views/providers/DIProvider';
import { useContext, useEffect, useState } from 'react';
import { MemberItem } from './MemberItem';
import styles from './MemberList.module.scss';

export function MemberList() {
  const { getGroup } = useContext(DIContext);
  const [group, setGroup] = useState<Group>();

  useEffect(() => {
    (async () => {
      const data = await getGroup();
      setGroup(data);
    })();
  }, [getGroup]);

  return (
    group && (
      <div className={styles.memberList}>
        <span className={styles.memberList__title}>Miembros</span>
        {group.members.map((member) => (
          <MemberItem
            key={member.name}
            member={member}
            balance={group.balance[member.id]}
          />
        ))}
      </div>
    )
  );
}
