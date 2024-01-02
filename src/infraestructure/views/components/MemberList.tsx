import { Group } from '@/domain/models/Group';
import { User } from '@/domain/models/User';
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

  const content =
    group?.members.length === 0 ? (
      <p>No hay miembros</p>
    ) : (
      group &&
      Object.entries(group.balance)
        .sort((a, b) => a[1] - b[1])
        .map(([id, balance]) => {
          const member = group.members.find((m) => m.id === id) as User;
          return <MemberItem key={id} member={member} balance={balance} />;
        })
    );

  return (
    <div className={styles.memberList}>
      <span className={styles.memberList__title}>Miembros</span>
      {content}
    </div>
  );
}
