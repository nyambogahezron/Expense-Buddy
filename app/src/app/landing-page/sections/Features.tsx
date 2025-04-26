import { SendHorizontal, RefreshCw, DollarSign, Wallet } from 'lucide-react';

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

export default function Features() {
  return (
    <section id='features' className='bg-gray-100 w-full max-w-full'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 h-full items-center justify-center'>
        {features.map((feature, index) => (
          <div
            key={index}
            className='flex flex-col items-start gap-2.5 bg-white p-14 transition-shadow duration-300 h-full'
            style={{
              background: ['#ffffff', '#c3ff9d', '#ffffff', '#605cf1'][
                index % 4
              ],
            }}
          >
            <div className='text-primary mb-4'>{feature.icon}</div>
            <h3 className='text-xl font-semibold mb-2'>{feature.title}</h3>
            <p className='text-gray-700'>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
