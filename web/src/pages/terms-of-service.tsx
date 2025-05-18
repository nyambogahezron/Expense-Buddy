const TermsOfServices = () => {
  const services = [
    {
      title: 'Privacy And Security Principles',
      description:
        "Since we started WhatsApp, we've built our Services with strong privacy and security principles in mind.",
    },
    {
      title: 'Connecting You With Other People',
      description:
        'We provide, and always strive to improve, ways for you to communicate with other WhatsApp users including through messages, voice and video calls, sending images and video, showing your status, and sharing your location with others when you choose. We may provide a convenient platform that enables you to send and receive money to or from other users across our platform. WhatsApp works with partners, service providers, and affiliated companies to help us provide ways for you to connect with their services.',
    },
    {
      title: 'Ways To Improve Our Services',
      description:
        'We analyze how you make use of WhatsApp, in order to improve our Services, including helping businesses who use WhatsApp measure the effectiveness and distribution of their services and messages. WhatsApp uses the information it has and also works with partners, service providers, and affiliated companies to do this.',
    },
    {
      title: 'Communicating With Businesses',
      description:
        'We provide, and always strive to improve, ways for you and businesses and other organizations, to communicate with each other using our Services, such as through order, transaction, and appointment information, delivery and shipping notifications, product and service updates, and marketing.',
    },
    {
      title: 'Safety, Security, And Integrity',
      description:
        "We work to protect the safety, security, and integrity of our Services. This includes appropriately dealing with abusive people and activity violating our Terms. We work to prohibit misuse of our Services including harmful conduct towards others, violations of our Terms and policies, and address situations where we may be able to help support or protect our community. If we learn of people or activity like this, we will take appropriate action, including by removing such people or activity or contacting law enforcement. Any such removal will be in accordance with the 'Termination' section below.",
    },
    {
      title: 'Enabling Access To Our Services',
      description:
        'To operate our global Services, we need to store and distribute content and information in data centers and systems around the world, including outside your country of residence. The use of this global infrastructure is necessary and essential to provide our Services.',
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50 py-10 px-6'>
      <h1 className='text-3xl font-bold text-teal-600 mb-8'>
        About Our Services
      </h1>
      <ul className='space-y-6'>
        {services.map((service, index) => (
          <li key={index} className='bg-white shadow p-6 rounded-lg'>
            <h2 className='font-bold text-lg text-teal-700'>{service.title}</h2>
            <p className='text-gray-700 mt-2'>{service.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TermsOfServices;
