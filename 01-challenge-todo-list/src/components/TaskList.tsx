import { Trash } from 'phosphor-react';
import { Task } from '../App';
import styles from './TaskList.module.css';
import clipboardSvg from '../assets/clipboard.svg';

interface Props {
  tasks: Task[];
}

export const TaskList: React.FC<Props> = ({ tasks }) => {
  const createdTasksTotal = tasks.length;
  const completedTasksTotal = tasks.filter(task => task.isComplete).length;

  return (
    <div className={styles.taskList}>
      <header className={styles.header}>
        <div className={styles.created}>
          <p>Tarefas criadas</p>

          <div className={styles.completionChip}>
            <span>{createdTasksTotal}</span>
          </div>
        </div>

        <div className={styles.completed}>
          <p>Concluídas</p>

          <div className={styles.completionChip}>
            <span>
              {completedTasksTotal} de {createdTasksTotal}
            </span>
          </div>
        </div>
      </header>

      {tasks.length === 0 ? (
        <div className={styles.empty}>
          <img src={clipboardSvg} alt="Clipboard" />

          <p>Você ainda não tem tarefas cadastradas</p>
          <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
      ) : (
        <ul className={styles.list}>
          {tasks.map(task => (
            <li key={task.id} className={styles.listItem}>
              <input type="checkbox" id={`task-${task.id}`} />

              <label htmlFor={`task-${task.id}`}>{task.title}</label>

              <button
                className={styles.deleteButton}
                title="Deletar tarefa"
                type="button"
              >
                <Trash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
