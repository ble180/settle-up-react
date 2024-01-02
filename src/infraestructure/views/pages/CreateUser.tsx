import { Button } from '@/infraestructure/views/components/common/Button';
import { Input } from '@/infraestructure/views/components/common/Input';
import { DIContext } from '@/infraestructure/views/providers/DIProvider';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import styles from './CreateUser.module.scss';

export function CreateUser() {
  const { createMember } = useContext(DIContext);
  const [name, setName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  async function createUser() {
    const id = uuidv4();

    if (!name) {
      setError('El nombre es obligatorio');
      return;
    }

    await createMember({ id, name });
    navigate('/');
  }

  function handleNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError('');
    setName(e.target.value);
  }

  return (
    <div className={styles.createUser}>
      <h2>Nuevo miembro</h2>
      <Input
        label="Nombre"
        placeholder="Nombre del miembro"
        value={name}
        onChange={handleNameChange}
        required
        error={error}
      />
      <Button label="Añadir" onClick={createUser} />
    </div>
  );
}
