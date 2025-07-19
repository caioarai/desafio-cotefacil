import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <span className={styles.logo}>
        <NavLink to="/">
          <img src="/cotefacilLogo.png" alt="Logo da Cotefácil" />
        </NavLink>
        <h1>Desafio Cotefácil</h1>
      </span>
      <ul className={styles.linkList}>
        <li>
          <NavLink to="/">TO-DO LIST</NavLink>
        </li>
        <li>
          <NavLink to="/galeria">GALERIA</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">DASHBOARD</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
