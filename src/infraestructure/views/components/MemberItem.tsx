import { formatQuantity } from '@/domain/models/Payment';
import { User } from '@/domain/models/User';
import styles from './MemberItem.module.scss';

export function MemberItem({
  member,
  balance
}: {
  member: User;
  balance: number;
}) {
  const balanceClassName =
    balance < 0
      ? styles['memberItem__balance--negative']
      : styles['memberItem__balance--positive'];

  return (
    <div className={styles.memberItem}>
      <span className={styles.memberItem__name}>{member.name}</span>
      <span className={`${styles.memberItem__balance} ${balanceClassName}`}>
        {formatQuantity(balance)}
      </span>
    </div>
  );
}
