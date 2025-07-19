import { createContext, useContext } from 'react';
import useTasks from '../hooks/useTasks';

const TasksContext = createContext();

export function TasksProvider({ children }) {
  const taskHook = useTasks();

  return (
    <TasksContext.Provider value={taskHook}>{children}</TasksContext.Provider>
  );
}

export function useTasksContext() {
  return useContext(TasksContext);
}
