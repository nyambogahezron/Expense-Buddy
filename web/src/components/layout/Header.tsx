import { useEffect, useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [ActiveLink, setActiveLink] = useState('Home');

  const links = [
    {
      id: 1,
      name: 'Features',
      path: '#features',
    },
    {
      id: 2,
      name: 'About Us',
      path: '#about',
    },

    {
      id: 3,
      name: 'How it Works',
      path: '#how-it-works',
    },

    {
      id: 4,
      name: 'Testimonials',
      path: '#testimonials',
    },

    {
      id: 5,
      name: 'Contact Us',
      path: '#contact',
    },
  ];

  const handleActiveLink = () => {
    const currentPath = window.location.hash;
    console.log('active link', currentPath);
    const activeLink = links.find((link) => link.path === currentPath);
    setActiveLink(activeLink ? activeLink.name : 'Home');
  };

  useEffect(() => {
    handleActiveLink();
  }, []);

  return (
    <nav className='bg-white border-gray-200 dark:bg-[#070b11] h-auto overflow-hidden w-screen'>
      <div className='flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4'>
        <a href='#' className='flex items-center'>
          <span className='self-center text-2xl sm:text-lg font-semibold whitespace-nowrap text-orange-500 hidden sm:block'>
            Expense Buddy
          </span>
        </a>
        <div className='flex items-center md:order-2 space-x-1 md:space-x-4 sm:-ml-8'>
          <a
            href='#'
            className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 '
          >
            Login
          </a>
          <a
            href='#'
            className='text-white bg-orange-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5dark:hover:bg-blue-500 focus:outline-none dark:focus:ring-blue-800 transition-all'
          >
            Sign up
          </a>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type='button'
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 '
          >
            {isMenuOpen ? (
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            ) : (
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M4 6h16M4 12h16m-7 6h7'
                />
              </svg>
            )}
          </button>
        </div>
        <div
          className={`${
            isMenuOpen
              ? 'block absolute top-12 left-0 w-full h-full z-50 md:static md:z-auto md:w-auto md:h-auto'
              : 'hidden md:block'
          } items-center justify-between w-full md:flex md:w-auto md:order-1 transition-all`}
        >
          <ul
            className={`flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 ${
              isMenuOpen
                ? 'bg-gray-950 pb-5 px-2 z-[999] md:bg-transparent md:p-0'
                : 'hidden md:flex'
            }`}
          >
            {links.map((link) => {
              return (
                <li key={link.id}>
                  <a
                    onClick={() => {
                      setActiveLink(link.name);
                      setIsMenuOpen(false);
                    }}
                    href={link.path}
                    className={`block py-2 px-3 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700 
                    ${ActiveLink === link.name ? 'text-blue-500' : ''}`}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
