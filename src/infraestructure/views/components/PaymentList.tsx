import { Payment } from '@/domain/models/Payment';
import { PaymentItem } from '@/infraestructure/views/components/PaymentItem';
import { useContext, useEffect, useState } from 'react';
import { DIContext } from '../providers/DIProvider';
import style from './PaymentList.module.scss';

export function PaymentList() {
  const { getGroup } = useContext(DIContext);
  const [payments, setPayments] = useState<Payment[]>([]);

  useEffect(() => {
    (async () => {
      const group = await getGroup();
      setPayments(group.payments);
    })();
  }, [getGroup]);

  return (
    <div className={style.paymentList}>
      <span className={style.paymentList__title}>Gastos</span>
      {payments.map((payment) => (
        <PaymentItem key={payment.name} payment={payment} />
      ))}
    </div>
  );
}
