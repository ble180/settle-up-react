import { GroupInfo } from '@/infraestructure/views/components/GroupInfo';
import { PaymentList } from '@/infraestructure/views/components/PaymentList';
import styles from './Home.module.scss';

export function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.home__info}>
        <div className={styles.home__infoContent}>
          <GroupInfo />
        </div>
      </div>
      <div className={styles.home__content}>
        <PaymentList />
      </div>
    </div>
  );
}
