import { Download, UserPlus, Zap } from 'lucide-react';

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
    <section className='py-20 px-8'>
      <div className='container'>
        <h2 className='text-4xl font-bold text-center mb-16'>
          <span className='text-gray-300'>How it</span>{' '}
          <span className='text-orange-500'>work</span>
        </h2>
        <div className='grid gap-12 grid-cols-1 md:grid-cols-3'>
          {steps.map((step, index) => (
            <div key={index} className='text-center relative'>
              <div className='relative w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-primary'>
                {step.icon}
              </div>
              <h3 className='text-xl font-semibold mb-4'>{step.title}</h3>
              <p className='text-gray-700'>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
