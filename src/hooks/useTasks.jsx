import React, { useEffect, useState } from 'react';

const useTasks = () => {
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('');
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [taskList, setTaskList] = useState(() => {
    const tasksSalvas = localStorage.getItem('tasks');
    return tasksSalvas ? JSON.parse(tasksSalvas) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskList));
  }, [taskList]);

  const addTask = (id, info) => {
    if (edit) {
      setTaskList((prev) =>
        prev.map((t) => (t.id === editId ? { ...t, task, status } : t)),
      );

      setEdit(false);
      setEditId(null);
    } else {
      const newTask = {
        id,
        task: info.task,
        status: info.status,
      };
      setTaskList((prev) => [...prev, newTask]);
    }

    setTask('');
    setStatus('');
  };

  const handleDelete = (id) => {
    setTaskList((prev) => prev.filter((task) => task.id !== id));
  };

  const handleEdit = (id) => {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const taskToEdit = tasks.find((task) => task.id == id);

    setEdit(true);
    setTask(taskToEdit.task);
    setStatus(taskToEdit.status);
    setEditId(id);
  };

  const toggleChecked = (id) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task,
      ),
    );
  };

  const handleCancel = () => {
    setTask('');
    setStatus('');
    setEdit(false);
    setEditId(null);
  };

  return {
    taskList,
    task,
    setTask,
    status,
    setStatus,
    edit,
    addTask,
    handleEdit,
    handleDelete,
    toggleChecked,
    handleCancel,
  };
};

export default useTasks;
