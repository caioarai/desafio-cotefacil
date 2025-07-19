import { AiOutlineClockCircle } from 'react-icons/ai';
import { MdOutlineConstruction } from 'react-icons/md';
import { IoArrowUndoSharp, IoCheckmarkDoneOutline } from 'react-icons/io5';
import { useTasksContext } from '../../context/TasksContext';
import styles from './Dashboard.module.css';
import { useState } from 'react';

const Dashboard = () => {
  const { taskList } = useTasksContext();
  const [filter, setFilter] = useState(null);

  const pendentes = taskList.filter((t) => t.status == 'Pendente');
  const emProgresso = taskList.filter((t) => t.status === 'Em Progresso');
  const concluidas = taskList.filter((t) => t.status === 'Concluída');

  const renderLista = (lista) => (
    <div className={styles.statusGroup}>
      {lista.length === 0 ? (
        <p>Nenhuma tarefa</p>
      ) : (
        lista.map((task) => (
          <div key={task.id} className="task">
            <h3>{task.task}</h3>
          </div>
        ))
      )}
    </div>
  );

  return (
    <section className={styles.dashboard}>
      <p>Clique em uma das caixas para filtrar a tarefa!</p>
      <div className={styles.grafico}>
        <span className={styles.box} onClick={() => setFilter('Pendente')}>
          <h3>Pendente</h3>
          <p>{pendentes.length}</p>
        </span>
        <span className={styles.box} onClick={() => setFilter('Em Progresso')}>
          <h3>Em progresso</h3>
          <p>{emProgresso.length}</p>
        </span>
        <span className={styles.box} onClick={() => setFilter('Concluída')}>
          <h3>Concluída</h3>
          <p>{concluidas.length}</p>
        </span>
      </div>

      {filter != null && (
        <span className={styles.backArrow} onClick={() => setFilter(null)}>
          <IoArrowUndoSharp /> Voltar
        </span>
      )}

      {(filter == 'Pendente' || filter == null) && (
        <>
          <span className={styles.title}>
            <AiOutlineClockCircle color="blue" size={30} />
            <h2>Pendente</h2>
          </span>
          {renderLista(pendentes)}
        </>
      )}

      {(filter == 'Em Progresso' || filter == null) && (
        <>
          <span className={styles.title}>
            <MdOutlineConstruction size={30} />
            <h2>Em Progresso</h2>
          </span>
          {renderLista(emProgresso)}
        </>
      )}

      {(filter == 'Concluída' || filter == null) && (
        <>
          <span className={styles.title}>
            <IoCheckmarkDoneOutline color="green" size={30} />
            <h2>Concluída</h2>
          </span>
          {renderLista(concluidas)}
        </>
      )}
    </section>
  );
};

export default Dashboard;
