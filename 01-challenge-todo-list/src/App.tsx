import './global.css';

import styles from './App.module.css';
import { Header } from './components/Header';
import { Input } from './components/Input';
import { TaskList } from './components/TaskList';
import { useState } from 'react';

export interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (taskTitle: string) => {
    setTasks(state => [
      ...state,
      {
        id: tasks.length + 1,
        title: taskTitle,
        isComplete: false,
      },
    ]);
  };

  const handleCompleteTask = (taskId: number) => {
    setTasks(state =>
      state.map(task => {
        return {
          ...task,
          isComplete: task.id === taskId ? !task.isComplete : task.isComplete,
        };
      })
    );
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(state => state.filter(task => task.id !== taskId));
  };

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Input onAddTask={handleAddTask} />

        <TaskList
          tasks={tasks}
          onCompleteTask={handleCompleteTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </div>
  );
}

export default App;
