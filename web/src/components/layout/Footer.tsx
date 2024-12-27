import styles from '../../styles/Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.grid} container`}>
        <div>
          <h3 className={styles.logo}>Expense Buddy</h3>
          <p className={styles.description}>
            Making financial management simple and accessible for everyone.
          </p>
        </div>
        <div>
          <h4 className={styles.title}>Quick Links</h4>
          <ul className={styles.list}> 
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#how-it-works">How it Works</a></li>
          </ul>
        </div>
        <div>
          <h4 className={styles.title}>Legal</h4>
          <ul className={styles.list}>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className={styles.title}>Download</h4>
          <div className={styles.downloadButtons}>
            <button className={styles.storeButton}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="App Store" />
              App Store
            </button>
            <button className={styles.storeButton}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg" alt="Play Store" />
              Play Store
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}