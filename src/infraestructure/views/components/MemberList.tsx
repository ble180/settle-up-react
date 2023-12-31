import { DIContext } from '@/infraestructure/views/providers/DIProvider';
import { useContext } from 'react';
import { MemberItem } from './MemberItem';
import styles from './MemberList.module.scss';

export function MemberList() {
  const { group } = useContext(DIContext);
  return (
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
  );
}
