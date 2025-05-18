const HelpPage = () => {
  const topics = [
    {
      title: 'Get Started',
      description: 'Learn how to get started with using WhatsApp.',
      icon: '📞', // Replace with the WhatsApp icon in your project
    },
    {
      title: 'Safety and Security',
      description:
        'Your privacy and security are important. Learn how to stay safe on WhatsApp.',
      icon: '🔒', // Replace with the lock icon in your project
    },
    {
      title: 'Back Up or Restore Chats',
      description: 'Learn how to back up and restore your chat history.',
      icon: '🔄', // Replace with the backup icon
    },
    {
      title: 'Information for Teens',
      description: 'Learn more about information for teens on WhatsApp.',
      icon: '🛡️', // Replace with the shield icon
    },
    {
      title: 'Communities',
      description: 'Learn how to create and participate in communities.',
      icon: '👥', // Replace with the group icon
    },
    {
      title: 'Business Features',
      description:
        "Learn about WhatsApp's business solutions and how to get started.",
      icon: '🏪', // Replace with the business icon
    },
  ];

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center py-10'>
      <h1 className='text-2xl font-bold mb-6'>How can we help you?</h1>
      <input
        type='text'
        placeholder='Search help articles...'
        className='w-11/12 max-w-xl px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-10'
      />
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12 max-w-5xl'>
        {topics.map((topic, index) => (
          <div
            key={index}
            className='flex flex-col items-center p-4 bg-white shadow rounded-lg'
          >
            <div className='text-4xl mb-4'>{topic.icon}</div>
            <h2 className='font-bold text-lg'>{topic.title}</h2>
            <p className='text-sm text-gray-600 text-center mt-2'>
              {topic.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpPage;
