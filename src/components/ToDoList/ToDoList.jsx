import useTasks from '../../hooks/useTasks';
import styles from './ToDoList.module.css';
import { IoClose, IoPencil } from 'react-icons/io5';

const ToDoList = () => {
  const {
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
  } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    const gerarId = Math.floor(Math.random() * 9000) + 1000;
    addTask(gerarId, { id: gerarId, task, status });
  };

  return (
    <section className={styles.sectionList}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label htmlFor="task">Tarefa:</label>
        <input
          type="text"
          value={task}
          name="task"
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <label htmlFor="selectEstado">Estado da tarefa:</label>
        <select
          name="selectEstado"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="">-- Selecione --</option>
          <option value="Pendente">Pendente</option>
          <option value="Em Progresso">Em progresso</option>
          <option value="Cocluída">Concluída</option>
        </select>
        <button type="submit" className="btn btn-primary">
          {edit ? 'Editar' : 'Salvar'}
        </button>
        {edit && (
          <button
            type="button"
            className="btn btn-danger"
            onClick={handleCancel}
          >
            Cancelar
          </button>
        )}
      </form>

      <div className={styles.taskList}>
        {taskList.length == 0 ? (
          <p style={{ textAlign: 'center ' }}>Nenhuma tarefa</p>
        ) : (
          taskList.map((task) => (
            <div key={task.id} className={styles.task}>
              <span>
                <label htmlFor={`task-${task.id}`}>
                  <input
                    type="checkbox"
                    name="task"
                    id={`task-${task.id}`}
                    checked={task.checked}
                    onChange={() => toggleChecked(task.id)}
                  />{' '}
                  {task.task}
                </label>
                <p>({task.status})</p>
              </span>
              <span>
                <IoClose
                  size={30}
                  color="red"
                  onClick={() => handleDelete(task.id)}
                />
                <IoPencil
                  size={25}
                  color="blue"
                  onClick={() => handleEdit(task.id)}
                />
              </span>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default ToDoList;
