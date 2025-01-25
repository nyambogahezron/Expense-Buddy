import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO at TechCorp',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      content:
        'Working with this team has been an absolute game-changer for our business. Their attention to detail and innovative solutions have helped us grow exponentially.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Marketing Director',
      image:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      content:
        "The level of professionalism and expertise is unmatched. They don't just deliver results; they exceed expectations every single time.",
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Startup Founder',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      content:
        'From concept to execution, they guided us through every step. Their insights and dedication made our project a huge success.',
      rating: 5,
    },
    {
      name: 'David Kim',
      role: 'Product Manager',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80',
      content:
        'Outstanding service and remarkable results. They transformed our vision into reality with precision and creativity.',
      rating: 5,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <h1 className='text-2xl md:text-4xl font-bold text-orange-500 mb-4'>
            What Our Clients Say
          </h1>
          <p className='text-sm md:tex-lg text-gray-600 max-w-2xl mx-auto'>
            Don't just take our word for it. Here's what our valued clients have
            to say about their experiences working with us.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='grid grid-cols-1 md:grid-cols-2 gap-8'
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.name}
              variants={itemVariants}
              className='bg-white rounded-2xl shadow-xl p-8 relative'
            >
              <Quote className='absolute text-blue-100 w-14 h-14 -top-2 -left-2 transform -rotate-12' />

              <div className='relative'>
                <div className='flex items-center mb-6'>
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className='w-16 h-16 rounded-full object-cover mr-4 border-t-4 border-l-4 border-orange-500'
                  />
                  <div>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {testimonial.name}
                    </h3>
                    <p className='text-gray-600'>{testimonial.role}</p>
                    <div className='flex mt-1'>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className='w-4 h-4 text-yellow-400 fill-current'
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <blockquote className='text-gray-700 italic relative'>
                  "{testimonial.content}"
                </blockquote>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
