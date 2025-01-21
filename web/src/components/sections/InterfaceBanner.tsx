
export default function InterfaceBanner() {
  return (
    <div className='flex flex-col items-center justify-around text-center max-w-full max-h-full min-h-[850px] bg-gray-300'>
      <div className='flex flex-col items-center'>
        <h1 className='text-2.6rem font-bold text-[#333] flex flex-col leading-1.3'>
          <span>Enjoy Our </span>{' '}
          <span className='text-orange-500 font-bold'>Beautiful Interface</span>
        </h1>
        <p className='text-1.15rem text-[#333] flex flex-col leading-1.3 max-w-[600px] mt-5'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A provident
          possimus expedita temporibus dicta, sint soluta totam omnis
          repellendus, beatae odit vero sunt consectetur! Cupiditate?
        </p>
      </div>

      <div className='flex flex-col gap-5 p-5 items-center justify-center w-full mt-5'>
        <div className='relative mx-auto border-gray-300 dark:border-gray-800 bg-gray-300 dark:bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]'>
          <div className='h-[32px] w-[3px] bg-gray-300 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg'></div>
          <div className='h-[46px] w-[3px] bg-gray-300 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg'></div>
          <div className='h-[46px] w-[3px] bg-gray-300 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg'></div>
          <div className='h-[64px] w-[3px] bg-gray-300 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg'></div>
          <div className='rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800'>
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
        <span className='text-sm uppercase font-bold text-orange-300'>
          Interface Overview
        </span>
      </div>

      <div className='text-16px items-center mb-5 p-5'>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam,
          dolores!
        </p>
      </div>

      <div className='relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[16px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]'>
        <div className='rounded-xl overflow-hidden h-[140px] md:h-[262px]'>
          <img
            src='https://flowbite.s3.amazonaws.com/docs/device-mockups/screen-image-imac.png'
            className='dark:hidden h-[140px] md:h-[262px] w-full rounded-xl'
            alt=''
          />
          <img
            src='https://flowbite.s3.amazonaws.com/docs/device-mockups/screen-image-imac-dark.png'
            className='hidden dark:block h-[140px] md:h-[262px] w-full rounded-xl'
            alt=''
          />
        </div>
      </div>
      <div className='relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[24px] max-w-[301px] md:h-[42px] md:max-w-[512px]'></div>
      <div className='relative mx-auto bg-gray-800 rounded-b-xl h-[55px] max-w-[83px] md:h-[95px] md:max-w-[142px]'></div>
    </div>
  );
}
