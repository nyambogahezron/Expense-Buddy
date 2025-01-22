import { Star } from 'lucide-react';
import { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Rhonda Rhodes',
    role: 'User Interface Designer',
    quote:
      'Comprehensive reports, data visualizations, and insights to optimize your ecommerce store and help you reach your goals.',
    avatar:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'John Doe',
    role: 'Software Engineer',
    quote:
      'This tool has significantly improved my productivity and workflow. Highly recommended!',
    avatar:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Jane Smith',
    role: 'Product Manager',
    quote: 'A game-changer for our team. The insights we get are invaluable.',
    avatar:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Alice Johnson',
    role: 'Marketing Specialist',
    quote:
      'The best investment we made this year. Our campaigns have never been more effective.',
    avatar:
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  },
  {
    name: 'Bob Brown',
    role: 'Data Analyst',
    quote:
      'The analytics and reporting features are top-notch. It has made my job so much easier.',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 2);
    }
  };

  const handleNext = () => {
    if (currentIndex < testimonials.length - 2) {
      setCurrentIndex(currentIndex + 2);
    }
  };

  return (
    <section id='testimonials' className='py-20 px-8 bg-gray-100'>
      <div className='container mx-auto'>
        {/* header  */}
        <h2 className='text-2xl md:text-4xl font-bold text-center mb-16'>
          Kind words from
          <br />
          <span className='text-orange-500'> our lovely customers</span>
        </h2>

        {/* testimonials */}
        <TransitionGroup className='grid grid-cols-1 md:grid-cols-2 gap-8 w-full'>
          {testimonials
            .slice(currentIndex, currentIndex + 2)
            .map((testimonial, index) => (
              <CSSTransition key={index} timeout={500} classNames='testimonial'>
                <div className='bg-white p-8 rounded-lg shadow-md border'>
                  <div className='flex items-center mb-4'>
                    <img
                      src={testimonial.avatar}
                      alt='Customer'
                      className='w-16 h-16 rounded-full mr-4 '
                    />
                    <div>
                      <h4 className='text-xl font-semibold'>
                        {testimonial.name}
                      </h4>
                      <p className='text-gray-600'>{testimonial.role}</p>
                    </div>
                  </div>
                  <p className='text-gray-700 mb-4'>{testimonial.quote}</p>

                  {/* stars */}
                  <div className='flex'>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className='w-5 h-5 text-yellow-500 ' />
                    ))}
                  </div>
                </div>
              </CSSTransition>
            ))}
        </TransitionGroup>

        {/* action btns */}
        <div className='flex justify-center mt-8'>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`px-4 py-2 mx-2 bg-blue-500 text-white rounded ${
              currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex >= testimonials.length - 2}
            className={`px-4 py-2 mx-2 bg-blue-500 text-white rounded ${
              currentIndex >= testimonials.length - 2
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
}
