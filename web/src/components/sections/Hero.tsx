import HeroImage from '../../images/device.png';
import styles from '../../styles/Hero.module.css';
import IOSImg from '../../images/ios.png';
import AndroidImg from '../../images/android.png';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`${styles.container} container`}>
        <div className={styles.content}>
          <h1 className={styles.semiTitle}>Invest in your future</h1>

          <div className={styles.title}>
            <span
              style={{
                color: 'orange',
              }}
            >
              Saving &
            </span>
            <span>investing are</span>
            <span>
              made <span style={{ color: 'orange' }}>simple</span>
            </span>
          </div>
          <p className={styles.description}>
            Take control of your financial future with our easy-to-use platform
          </p>

          <p className={styles.description2}>DOWNLOAD NOW ON :</p>
          <div className={styles.buttons}>
            <button className={styles.storeButton}>
              <img src={IOSImg} alt='App Store' />
              App Store
            </button>
            <button className={styles.storeButton}>
              <img src={AndroidImg} alt='Play Store' />
              Play Store
            </button>
          </div>
          <div className={styles.ActionBtn}>
            <button className='btn btn-primary'>Login</button>
            <button className='btn btn-secondary'>Register</button>
          </div>
        </div>

        <div className={styles.heroImage}>
          <img src={HeroImage} alt='App Screenshot' className={styles.image} />
        </div>
      </div>
    </section>
  );
}
