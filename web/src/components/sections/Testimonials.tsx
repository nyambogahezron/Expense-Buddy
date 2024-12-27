import { Star } from 'lucide-react';
import styles from '../../styles/Testimonials.module.css';

export function Testimonials() {
  return (
    <section className={styles.testimonials}>
      <div className="container">
        <h2 className={styles.title}>
          Kind words from<br />our lovely customers
        </h2>
        <div className={styles.grid}>
          <div className={styles.testimonial}>
            <div className={styles.header}>
              <img
                src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80"
                alt="Customer"
                className={styles.avatar}
              />
              <div>
                <h4 className={styles.name}>Rhonda Rhodes</h4>
                <p className={styles.role}>User Interface Designer</p>
              </div>
            </div>
            <p className={styles.quote}>
              "Comprehensive reports, data visualizations, and insights to optimize your ecommerce store and help you reach your goals."
            </p>
            <div className={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}