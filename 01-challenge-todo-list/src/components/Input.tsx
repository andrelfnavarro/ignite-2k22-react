import { FormEvent, InputHTMLAttributes, useState } from 'react';
import { PlusCircle } from 'phosphor-react';

import styles from './Input.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onAddTask: (task: string) => void;
}

export const Input: React.FC<Props> = ({ onAddTask, ...rest }) => {
  const [newTask, setNewTask] = useState('');

  const handleAddNewTask = (event: FormEvent) => {
    event.preventDefault();
    onAddTask(newTask);

    setNewTask('');
  };

  return (
    <form onSubmit={handleAddNewTask} className={styles.wrapper}>
      <input
        type="text"
        className={styles.input}
        value={newTask}
        placeholder="Adicione uma nova tarefa"
        onChange={e => setNewTask(e.target.value)}
        {...rest}
      />

      <button
        disabled={newTask.trim().length === 0}
        className={styles.button}
        title="Criar tarefa"
        type="submit"
      >
        Criar
        <PlusCircle size={16} />
      </button>
    </form>
  );
};
