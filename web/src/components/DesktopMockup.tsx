export default function DesktopMockup() {
  return (
    <div className='flex flex-col gap-5 p-5 items-center justify-center w-full mt-5'>
      <div className='relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[16px] rounded-t-xl h-[350px] max-w-full md:h-[600px] md:max-w-full mb-10'>
        {/* camera */}

        <div className=' absolute -top-3 left-1/2 flex justify-center items-center w-2 h-2 bg-gray-900 dark:bg-gray-500  rounded-full'></div>

        {/* body  */}
        <div className='rounded-xl overflow-hidden h-[330px] md:h-[600px]'>
          <img
            src='https://flowbite.s3.amazonaws.com/docs/device-mockups/screen-image-imac.png'
            className='dark:hidden h-[320px] md:h-[600px] w-full rounded-xl'
            alt=''
          />
          <img
            src='https://flowbite.s3.amazonaws.com/docs/device-mockups/screen-image-imac-dark.png'
            className='hidden dark:block h-[320px] md:h-[570px] w-full rounded-xl'
            alt=''
          />
        </div>

        {/* bottom */}
        <div className='relative mx-auto bg-gray-900 dark:bg-gray-700 rounded-b-xl h-[24px] max-w-[301px] md:h-[30px] md:max-w-[500px] md:-top-4'></div>
        <div className='relative mx-auto bg-gray-800 rounded-b-xl h-[55px] max-w-[83px] md:h-[50px] md:max-w-[150px] md:-top-4'></div>
      </div>
    </div>
  );
}
