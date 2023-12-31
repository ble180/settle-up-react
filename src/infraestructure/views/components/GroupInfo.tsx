import { DIContext } from '@/infraestructure/views/providers/DIProvider';
import { useContext } from 'react';
import style from './GroupInfo.module.scss';

export function GroupInfo() {
  const { group } = useContext(DIContext);

  return (
    <div className={style.groupInfo}>
      <div className={style.groupInfo__balanceContainer}>
        {Object.entries(group.balance).map(([key, value]) => (
          <span key={key}>
            {key}: {value}
          </span>
        ))}
      </div>
      <div className={style.groupInfo__titleContainer}>
        <h2 className={style.groupInfo__title}>{group.name}</h2>
        <span className={style.groupInfo__info}>
          Transacciones: {group.payments.length}
        </span>
        <span className={style.groupInfo__info}>
          Miembros: {group.members.length}
        </span>
      </div>
    </div>
  );
}
