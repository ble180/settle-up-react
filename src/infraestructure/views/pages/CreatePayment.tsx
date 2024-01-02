import { Payment, formatQuantity } from '@/domain/models/Payment';
import { User } from '@/domain/models/User';
import { Button } from '@/infraestructure/views/components/common/Button';
import { Checkbox } from '@/infraestructure/views/components/common/Checkbox';
import { Input } from '@/infraestructure/views/components/common/Input';
import {
  Select,
  SelectOption
} from '@/infraestructure/views/components/common/Select';
import { DIContext } from '@/infraestructure/views/providers/DIProvider';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from './CreatePayment.module.scss';

type PaymentMember = {
  user: User;
  amount: string;
  added: boolean;
};

export function CreatePayment() {
  const { getGroup, addPayment } = useContext(DIContext);
  const navigate = useNavigate();

  const [paymentUsersOptions, setPaymentUsersOptions] = useState<
    SelectOption[]
  >([]);
  const [members, setMembers] = useState<PaymentMember[]>([]);
  const [concept, setConcept] = useState('');
  const [paymenUser, setPaymentUser] = useState<User>();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    (async () => {
      const group = await getGroup();
      setPaymentUsersOptions(
        group.members.map((m) => ({ value: m.id, label: m.name }))
      );
      setMembers(
        group.members.map((m) => ({ user: m, added: false, amount: '0,00 €' }))
      );
      setPaymentUser(group.members[0]);
    })();
  }, [getGroup]);

  const validForm = useMemo(() => {
    const addedMembers = members.filter((m) => m.added).length;
    return (
      concept != '' && amount > 0 && paymenUser != null && addedMembers > 0
    );
  }, [concept, amount, members, paymenUser]);

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(event.target.value));
  }

  function handleConceptChange(event: React.ChangeEvent<HTMLInputElement>) {
    setConcept(event.target.value);
  }

  function handlePaymentUserChange(option: SelectOption) {
    const user = members.find((m) => m.user.id === option.value)?.user;
    setPaymentUser(user);
  }

  function handleToggleAdded(id: string) {
    const newMembers = members.map((member) => {
      if (member.user.id === id) {
        const memberUpdated = { ...member, added: !member.added };
        return memberUpdated;
      }
      return member;
    });

    const totalAddedMembers = newMembers.filter((m) => m.added).length;
    newMembers.forEach((member) => {
      let memberAmount = 0;
      if (member.added) {
        memberAmount = amount / totalAddedMembers;
      }
      member.amount = formatQuantity(memberAmount);
    });

    setMembers(newMembers);
  }

  async function createPayment() {
    const payment: Payment = {
      id: uuidv4(),
      name: concept,
      operationDate: new Date(),
      quantity: amount,
      members: members.filter((m) => m.added).map((m) => m.user),
      user: paymenUser as User
    };

    await addPayment(payment);
    navigate('/');
  }

  return (
    <div className={styles.createPayment}>
      <div className={styles.createPayment__container}>
        <h2 className={styles.createPayment__title}>Nuevo pago</h2>

        <div className={styles.createPayment__whoPayContainer}>
          <h4 className={styles.createPayment__subtitle}>
            Información del pago
          </h4>
          <Input
            label="Concepto"
            placeholder="Introduzca un concepto"
            required
            value={concept}
            onChange={handleConceptChange}
          />
          <Select
            label="Quién pago"
            options={paymentUsersOptions}
            onChange={handlePaymentUserChange}
          />
          <div className={styles.createPayment__amount}>
            <input
              className={styles.createPayment__amountInput}
              type="number"
              value={amount}
              onChange={handleAmountChange}
            />
            <span className={styles.createPayment__amountCurrency}>€</span>
          </div>
        </div>
        <div className={styles.createPayment__forWhoContainer}>
          <h4 className={styles.createPayment__subtitle}>Para quién</h4>
          {members.map((member) => (
            <div className={styles.createPayment__member} key={member.user.id}>
              <div className={styles.createPayment__memberInfo}>
                <span className={styles.createPayment__memberName}>
                  {member.user.name}
                </span>
                <span className={styles.createPayment__memberAmount}>
                  {member.amount}
                </span>
              </div>
              <Checkbox
                value={member.added}
                onChange={() => handleToggleAdded(member.user.id)}
              />
            </div>
          ))}
        </div>
        <Button label="Guardar" onClick={createPayment} disabled={!validForm} />
      </div>
    </div>
  );
}
