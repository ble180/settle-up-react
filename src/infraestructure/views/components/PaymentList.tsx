import { Payment } from '@/domain/models/Payment';
import { PaymentItem } from '@/infraestructure/views/components/PaymentItem';
import { GroupContext } from '@/infraestructure/views/providers/GroupContextProvider';
import { useContext, useState } from 'react';
import style from './PaymentList.module.scss';

export function PaymentList() {
  const group = useContext(GroupContext);

  const [payments] = useState<Payment[]>(group.payments);

  return (
    <div className={style.paymentList}>
      <span className={style.paymentList__title}>Gastos</span>
      {payments.map((payment) => (
        <PaymentItem key={payment.name} payment={payment} />
      ))}
    </div>
  );
}
