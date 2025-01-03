import styles from '../../styles/AboutUs.module.css';
import { Star } from 'lucide-react';
import phoneImg from '../../images/Untitled.png';

const AboutPage = () => {
  return (
    <div className={styles.aboutPage}>
      {/* Header Section */}
      <section className={styles.aboutHeader}>
        <div className={styles.title}>
          <h4 className={styles.tagline}>INVEST IN YOUR FUTURE</h4>
          <h1 className={styles.headerTitle}>
            About <span className='text-orange-500'>Expense Buddy</span>{' '}
          </h1>
        </div>
        <div className={styles.desc}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui id
            lobortis pretium blandit. Mauris interdum enim ullamcorper
            consequat, nec sed.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui id
            lobortis pretium blandit. Mauris interdum enim ullamcorper
            consequat, nec sed. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ex laboriosam vitae aspernatur possimus et.
            Consequuntur saepe, quod numquam itaque dignissimos cupiditate iure
            esse, vel nam officiis enim nisi sit distinctio culpa minima iure.
            eligendi minus voluptatibus! Voluptatem obcaecati eaque voluptatibus
          </p>
        </div>
      </section>

      <hr className='bg-orange-500 h-[1.32px] m-10' />

      {/* Statistics Section */}
      <section className={styles.statsSection}>
        <div className={styles.statWrapper}>
          <div className='flex flex-row justify-between '>
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
          </div>

          <div className='flex flex-row justify-between '>
            <div className={styles.stat}>
              <div className={`${styles.circle} ${styles.whiteCircle}`}>
                <h2>12k</h2>
                <p>Reviews</p>
              </div>
            </div>
            <div className={styles.stat}>
              <div
                className={`${styles.circle} ${styles.greenCircle} mt-20 mr-10`}
              >
                <h2>09</h2>
                <p>Awards</p>
              </div>
            </div>
          </div>

          <Star className='text-white w-10 h-24 absolute top-1/2 left-1/2' />

          <Star className='text-blue-700 opacity-10 w-10 h-24 absolute top-0 left-1/2' />
          <Star className='text-blue-700 w-4 h-4 absolute -top-0 right-2' />
          <Star className='text-green-700 w-4 h-4 absolute top-1/2 left-1' />

          <Star className='text-green-700 w-8 h-8 absolute  left-10' />
        </div>

        {/* App Preview Section */}
        <div className={styles.appPreview}>
          <div className={styles.phones}>
            <img src={phoneImg} alt='Phone 1' className={styles.phone} />

          </div>
            {/* <div className='absolute w-80 h-80 bg-green-500 rounded-full top-1/2'></div> */}
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
