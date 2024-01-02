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
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreatePayment.module.scss';

type PaymentMember = {
  user: User;
  amount: string;
  added: boolean;
};

export function CreatePayment() {
  const { getGroup, addPayment } = useContext(DIContext);
  const navigate = useNavigate();

  const [members, setMembers] = useState<PaymentMember[]>([]);
  const [users, setUsers] = useState<SelectOption[]>([]);
  const [concept, setConcept] = useState('');
  const [conceptError, setConceptError] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    (async () => {
      const group = await getGroup();
      setUsers(group.members.map((m) => ({ value: m.id, label: m.name })));
      setMembers(
        group.members.map((m) => ({ user: m, added: false, amount: '0,00 €' }))
      );
    })();
  }, [getGroup]);

  function handleAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAmount(Number(event.target.value));
  }

  function handleConceptChange(event: React.ChangeEvent<HTMLInputElement>) {
    setConceptError('');
    setConcept(event.target.value);
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
    if (!concept) {
      setConceptError('El concepto es obligatorio');
      return;
    }

    if (amount == 0) {
      return;
    }

    // TODO Validations
    const totalAddedMembers = members.filter((m) => m.added).length;
    if (totalAddedMembers == 0) {
      return;
    }

    // TODO
    const payment: Payment = {
      name: concept,
      operationDate: new Date(),
      quantity: amount,
      members: members.map((m) => m.user),
      user: members[0].user
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
            error={conceptError}
          />
          <Select label="Quién pago" options={users} />
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
        <Button label="Guardar" onClick={createPayment} />
      </div>
    </div>
  );
}
