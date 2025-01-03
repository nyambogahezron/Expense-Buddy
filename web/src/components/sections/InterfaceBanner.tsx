import styles from '../../styles/InterfaceBanner.module.css';
import bannerImg from '../../images/Untitled.png';

export default function InterfaceBanner() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          <span>Enjoy Our </span>{' '}
          <span className='text-orange-500 font-bold'>
            Beautiful Interface
          </span>
        </h1>
        <p className={styles.desc}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A provident
          possimus expedita temporibus dicta, sint soluta totam omnis
          repellendus, beatae odit vero sunt consectetur! Cupiditate?
        </p>
      </div>

      <div className={styles.img}>
        <img src={bannerImg} alt='interface banner' />
        <span className='text-sm uppercase font-bold text-orange-300'>Interface Overview</span>
      </div>

      <div className={styles.footer}>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam,
          dolores!
        </p>
      </div>
    </div>
  );
}
