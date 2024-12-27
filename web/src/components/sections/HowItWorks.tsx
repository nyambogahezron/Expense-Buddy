import { Download, UserPlus, Zap } from 'lucide-react';
import styles from '../../styles/HowItWorks.module.css';

const steps = [
  {
    icon: <Download />,
    title: 'Install Expense Buddy',
    description: 'Download our app from the App Store or Google Play.',
  },
  {
    icon: <UserPlus />,
    title: 'Create your account',
    description: 'Sign up in minutes with our simple verification process.',
  },
  {
    icon: <Zap />,
    title: 'Enjoy the features',
    description: 'Start managing your money.',
  },
];

export function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className='container'>
        <h2 className={styles.title}>
          <span className='text-gray-300'>How it</span>{' '}
          <span className='text-orange-500'>work</span>
        </h2>
        <div className={styles.steps}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.iconWrapper}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
