

const ContactUs = () => {
  return (
    <div className='bg-gray-100 min-h-screen flex flex-col justify-center items-center px-6 py-10'>
      {/* Header */}
      <h1 className='text-4xl font-bold text-gray-800 mb-6 animate-fadeInDown'>
        Get In Touch
      </h1>
      <p className='text-lg text-gray-600 mb-12 animate-fadeInUp'>
        We'd love to hear from you! Feel free to reach out using the form below
        or through our social media.
      </p>

      {/* Contact Section */}
      <div className='bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl animate-fadeIn'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          {/* Form */}
          <div className='p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Contact Form</h2>
            <form>
              <div className='mb-4'>
                <label
                  htmlFor='name'
                  className='block text-gray-700 font-medium mb-1'
                >
                  Your Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                  placeholder='Enter your name'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='email'
                  className='block text-gray-700 font-medium mb-1'
                >
                  Your Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                  placeholder='Enter your email'
                />
              </div>
              <div className='mb-4'>
                <label
                  htmlFor='message'
                  className='block text-gray-700 font-medium mb-1'
                >
                  Your Message
                </label>
                <textarea
                  id='message'
                  rows='4'
                  className='w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300'
                  placeholder='Write your message'
                ></textarea>
              </div>
              <button
                type='submit'
                className='w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300'
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className='bg-blue-500 text-white p-6'>
            <h2 className='text-2xl font-semibold mb-4'>Contact Information</h2>
            <p className='mb-4'>Feel free to contact us directly:</p>
            <ul>
              <li className='mb-3'>
                <span className='font-semibold'>Address:</span> 123 Street Name,
                City, Country
              </li>
              <li className='mb-3'>
                <span className='font-semibold'>Phone:</span> +1 234 567 890
              </li>
              <li className='mb-3'>
                <span className='font-semibold'>Email:</span>{' '}
                contact@example.com
              </li>
            </ul>
            <h2 className='text-2xl font-semibold mt-6 mb-4'>
              Follow Us on Social Media
            </h2>
            <div className='flex space-x-4'>
              <a
                href='#'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-white text-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300'
              >
                <i className='fab fa-facebook-f'></i>
              </a>
              <a
                href='#'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-white text-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300'
              >
                <i className='fab fa-twitter'></i>
              </a>
              <a
                href='#'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-white text-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300'
              >
                <i className='fab fa-linkedin-in'></i>
              </a>
              <a
                href='#'
                target='_blank'
                rel='noopener noreferrer'
                className='w-10 h-10 bg-white text-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300'
              >
                <i className='fab fa-instagram'></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
