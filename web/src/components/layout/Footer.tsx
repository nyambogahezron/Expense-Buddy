export function Footer() {
  const links = {
    quickLinks: [
      { href: '#features', label: 'Features' },
      { href: '#about', label: 'About Us' },
      { href: '#how-it-works', label: 'How it Works' },
    ],
    legal: [
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Terms of Service' },
    ],
  };

  return (
    <footer className='bg-[#070b11] text-white py-20 px-8'>
      <div className='grid gap-12 container md:grid-cols-4'>
        <div>
          <h3 className='text-2xl font-bold mb-6'>Expense Buddy</h3>
          <p className='opacity-90'>
            Making financial management simple and accessible for everyone.
          </p>
        </div>
        <div>
          <h4 className='font-semibold mb-4'>Quick Links</h4>
          <ul className='list-none'>
            {links.quickLinks.map((link) => (
              <li className='mb-2' key={link.href}>
                <a
                  href={link.href}
                  className='text-white/90 hover:text-white transition-colors'
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className='font-semibold mb-4'>Legal</h4>
          <ul className='list-none'>
            {links.legal.map((link) => (
              <li className='mb-2' key={link.href}>
                <a
                  href={link.href}
                  className='text-white/90 hover:text-white transition-colors'
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className='font-semibold mb-4'>Download</h4>
          <div className='flex flex-col gap-4'>
            <button className='bg-black text-white py-3 px-6 rounded-full flex items-center gap-2'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
                alt='App Store'
                className='w-5 h-5'
              />
              App Store
            </button>
            <button className='bg-black text-white py-3 px-6 rounded-full flex items-center gap-2'>
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg'
                alt='Play Store'
                className='w-5 h-5'
              />
              Play Store
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
