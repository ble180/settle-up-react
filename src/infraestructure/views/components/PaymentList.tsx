import { Payment } from '@/domain/models/Payment';
import { PaymentItem } from '@/infraestructure/views/components/PaymentItem';
import { useContext, useState } from 'react';
import { DIContext } from '../providers/DIProvider';
import style from './PaymentList.module.scss';

export function PaymentList() {
  const { group } = useContext(DIContext);

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
