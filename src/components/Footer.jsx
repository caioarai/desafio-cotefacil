import styles from './Footer.module.css';

const Footer = () => {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <span>
        &copy;{anoAtual} Desafio Cotefácil. Todos os direitos estão reservados
      </span>
    </footer>
  );
};

export default Footer;
