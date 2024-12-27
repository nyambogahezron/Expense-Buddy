import { SendHorizontal, RefreshCw, DollarSign, Wallet } from 'lucide-react';
import styles from '../../styles/Features.module.css';

const features = [
  {
    icon: <SendHorizontal />,
    title: 'Send Money',
    description: 'Transfer money instantly to anyone, anywhere in the world.',
  },
  {
    icon: <RefreshCw />,
    title: 'Received Money',
    description: 'Receive payments securely from clients and friends.',
  },
  {
    icon: <DollarSign />,
    title: 'Money Exchange',
    description: 'Convert currencies at competitive exchange rates.',
  },
  {
    icon: <Wallet />,
    title: 'Multiple Currency',
    description: 'Hold and manage multiple currencies in one account.',
  },
];

export function Features() {
  return (
    <section className={styles.features}>
      <div className={`${styles.grid} `}>
        {features.map((feature, index) => (
          <div
            key={index}
            className={styles.feature}
            style={{
              background: ['#ffffff', '#c3ff9d', '#ffffff', '#605cf1'][
                index % 4
              ],
            }}
          >
            <div className={styles.icon}>{feature.icon}</div>
            <h3 className={styles.title}>{feature.title}</h3>
            <p className={styles.description}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
