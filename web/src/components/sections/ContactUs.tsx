import { motion } from 'framer-motion';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

export default function ContactUs() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
      <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        <motion.div
          initial='initial'
          animate='animate'
          variants={fadeIn}
          className='text-center mb-16'
        >
          <h1 className='text-2xl md:text-4xl font-bold text-orange-500 sm:text-5xl'>
            Contact Us
          </h1>
          <p className='mt-4 text-xl text-gray-600'>
            We'd love to hear from you
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='bg-white rounded-2xl shadow-xl p-8'
          >
            <form className='space-y-6'>
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700'
                >
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 px-4 py-2'
                  placeholder='Your name'
                />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 px-4 py-2'
                  placeholder='your@email.com'
                />
              </div>
              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700'
                >
                  Message
                </label>
                <textarea
                  id='message'
                  rows={4}
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-gray-50 px-4 py-2'
                  placeholder='Your message'
                />
              </div>
              <button
                type='submit'
                className='w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors duration-200'
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='space-y-8'
          >
            {/* Address Card */}
            <div className='bg-white rounded-2xl shadow-xl p-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-6'>
                Get in Touch
              </h2>

              <div className='space-y-6'>
                <div className='flex items-start space-x-4'>
                  <MapPin className='w-6 h-6 text-blue-600 mt-1' />
                  <div>
                    <h3 className='font-medium text-gray-900'>Our Office</h3>
                    <p className='text-gray-600'>
                      123 Business Avenue
                      <br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <Phone className='w-6 h-6 text-blue-600 mt-1' />
                  <div>
                    <h3 className='font-medium text-gray-900'>Phone</h3>
                    <p className='text-gray-600'>+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className='flex items-start space-x-4'>
                  <Mail className='w-6 h-6 text-blue-600 mt-1' />
                  <div>
                    <h3 className='font-medium text-gray-900'>Email</h3>
                    <p className='text-gray-600'>contact@company.com</p>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className='mt-8'>
                <h3 className='font-medium text-gray-900 mb-4'>Follow Us</h3>
                <div className='flex space-x-4'>
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target='_blank'
                      rel='noopener noreferrer'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className='bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition-colors duration-200'
                    >
                      <social.icon className='w-5 h-5 text-gray-700' />
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
