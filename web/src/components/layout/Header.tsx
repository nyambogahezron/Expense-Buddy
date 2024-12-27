import styles from '../../styles/Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.logo}>Expense Buddy</h1>
      </div>
      <nav className={styles.nav}>
        <a href='#features'>Features</a>
        <a href='#about'>About Us</a>
        <a href='#how-it-works'>How it Works</a>
      </nav>
      <button className={styles.downloadBtn}>
        Download
      </button>
    </header>
  );
}
