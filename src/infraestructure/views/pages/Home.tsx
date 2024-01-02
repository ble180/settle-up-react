import { GroupInfo } from '@/infraestructure/views/components/GroupInfo';
import { MemberList } from '@/infraestructure/views/components/MemberList';
import { PaymentList } from '@/infraestructure/views/components/PaymentList';
import { Link } from 'react-router-dom';
import { TransactionList } from '../components/TransactionList';
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
        <MemberList />
        <TransactionList />
      </div>
      <div className={styles.home__actionBtns}>
        <Link className={styles.home__actionBtn} to={'/create-payment'}>
          Añadir gasto
        </Link>
        <Link className={styles.home__actionBtn} to={'/create-user'}>
          Añadir miembro
        </Link>
      </div>
    </div>
  );
}
