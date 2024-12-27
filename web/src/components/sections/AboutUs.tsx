
import styles from '../../styles/AboutUs.module.css';

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      {/* Header Section */}
      <section className={styles.aboutHeader}>
        <h4 className={styles.tagline}>INVEST IN YOUR FUTURE</h4>
        <h1>About Pogo Partners</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui id
          lobortis pretium blandit. Mauris interdum enim ullamcorper consequat,
          nec sed.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui id
          lobortis pretium blandit. Mauris interdum enim ullamcorper consequat,
          nec sed.
        </p>
      </section>

      {/* Statistics Section */}
      <section className={styles.statsSection}>
        <div className={styles.stat}>
          <div className={`${styles.circle} ${styles.blueCircle}`}>
            <h2>5k</h2>
            <p>Active Users</p>
          </div>
        </div>
        <div className={styles.stat}>
          <div className={`${styles.circle} ${styles.greenCircle}`}>
            <h2>10k</h2>
            <p>Downloads</p>
          </div>
        </div>
        <div className={styles.stat}>
          <div className={`${styles.circle} ${styles.whiteCircle}`}>
            <h2>12k</h2>
            <p>Reviews</p>
          </div>
        </div>
        <div className={styles.stat}>
          <div className={`${styles.circle} ${styles.greenCircle}`}>
            <h2>09</h2>
            <p>Awards</p>
          </div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className={styles.appPreview}>
        <div className={styles.phones}>
          <img src='/phone1.png' alt='Phone 1' className={styles.phone} />
          <img src='/phone2.png' alt='Phone 2' className={styles.phone} />
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
