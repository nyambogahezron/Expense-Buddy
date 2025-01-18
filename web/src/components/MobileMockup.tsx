export default function MobileMockup() {
  return (
    <div className='relative mx-auto border-gray-300 dark:border-gray-900 bg-gray-300 dark:bg-gray-900 border-[14px] rounded-[1.5rem] h-[600px] w-[300px]'>
      {/* left btns */}
      <div className='h-[32px] w-[3px] bg-gray-300 dark:bg-gray-900 absolute -start-[17px] top-[72px] rounded-s-lg'></div>
      <div className='h-[46px] w-[3px] bg-gray-300 dark:bg-gray-900 absolute -start-[17px] top-[124px] rounded-s-lg'></div>
      <div className='h-[46px] w-[3px] bg-gray-300 dark:bg-gray-900 absolute -start-[17px] top-[178px] rounded-s-lg'></div>

      {/* right btn */}
      <div className='h-[64px] w-[3px] bg-gray-300 dark:bg-gray-900 absolute -end-[17px] top-[142px] rounded-e-lg'></div>

      {/* camera */}
      <div className='h-[8px] w-[8px] bg-gray-700 absolute left-1/2 -top-2.5 rounded-full'></div>

      {/* body*/}
      <div className='rounded-[1.5rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800'>
        <img
          src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-light.png'
          className='dark:hidden w-[272px] h-[572px]'
          alt=''
        />
        <img
          src='https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/mockup-1-dark.png'
          className='hidden dark:block w-[272px] h-[572px]'
          alt=''
        />
      </div>
    </div>
  );
}
