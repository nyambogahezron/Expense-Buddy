import { Star } from 'lucide-react';

export default function AboutPage() {
  return (
    <div id='about' className='font-sans bg-[#f0ffe7] p-5 w-full'>
      {/* Header Section */}
      <section className='flex flex-wrap justify-around items-center text-center mb-10'>
        <div className='flex flex-col items-start '>
          <h4 className='text-[#90c641] font-bold uppercase mb-2'>
            INVEST IN YOUR FUTURE
          </h4>
          <h1 className='flex flex-col items-start leading-tight text-black font-extrabold text-3xl'>
            About <span className='text-orange-500'>Expense Buddy</span>{' '}
          </h1>
        </div>
        <div className='flex flex-col items-start text-gray-600'>
          <p className='max-w-xl my-2 leading-relaxed text-start'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui id
            lobortis pretium blandit. Mauris interdum enim ullamcorper
            consequat, nec sed.
          </p>
          <p className='max-w-xl my-2 leading-relaxed text-start'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dui id
            lobortis pretium blandit. Mauris interdum enim ullamcorper
            consequat, nec sed. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ex laboriosam vitae aspernatur possimus et.
            Consequuntur saepe, quod numquam itaque dignissimos cupiditate iure
            esse, vel nam officiis enim nisi sit distinctio culpa minima iure.
            eligendi minus voluptatibus! Voluptatem obcaecati eaque voluptatibus
          </p>
        </div>
      </section>

      <hr className='bg-orange-500 h-[1.32px] m-10' />

      {/* Statistics Section */}
      <section className='flex flex-wrap justify-around gap-5 my-10'>
        <div className='relative mt-20 mb-10 p-8 max-w-lg h-full'>
          <div className='flex flex-row justify-between '>
            <div className='text-center p-1'>
              <div className='w-40 h-40 bg-[#635bff] text-white rounded-full flex justify-center items-center flex-col text-sm -mt-24 ml-5 border border-red-100'>
                <h2>5k</h2>
                <p>Active Users</p>
              </div>
            </div>
            <div className='text-center p-1'>
              <div className='w-32 h-32 bg-[#90c641] text-white rounded-full flex justify-center items-center flex-col text-sm'>
                <h2>10k</h2>
                <p>Downloads</p>
              </div>
            </div>
          </div>

          <div className='flex flex-row justify-between '>
            <div className='text-center p-1'>
              <div className='w-28 h-28 bg-white border-2 border-[#90c641] text-gray-800 rounded-full flex justify-center items-center flex-col text-sm mt-5 ml-7'>
                <h2>12k</h2>
                <p>Reviews</p>
              </div>
            </div>
            <div className='text-center p-1'>
              <div className='w-32 h-32 bg-[#90c641] text-white rounded-full flex justify-center items-center flex-col text-sm mt-20 mr-10'>
                <h2>09</h2>
                <p>Awards</p>
              </div>
            </div>
          </div>

          <Star className='text-white w-10 h-24 absolute top-1/3 left-1/2' />
          <Star className='text-blue-400 opacity-10 w-10 h-24 absolute top-0 left-1/2' />
          <Star className='text-blue-700 w-4 h-4 absolute -top-0 right-2' />
          <Star className='text-green-400 w-4 h-4 absolute top-1/2 left-1/4' />
          <Star className='text-green-400 w-8 h-8 absolute left-40' />
        </div>

        {/* App Preview Section */}
        <div className='flex justify-center relative items-center flex-col md:flex-row '>
          <div className='w-[100%] h-1/2 md:h-[100%] bg-orange-300 absolute  rounded-full mx-auto top-20 md:top-0 md:-left-10'></div>
          <div className='relative mx-auto border-gray-300 dark:border-gray-800 bg-gray-300 dark:bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] scale-90 md:z-50 isolate '>
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

          <div className='relative mx-auto border-gray-300 dark:border-gray-800 bg-gray-300 dark:bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] scale-75 md:-translate-x-20 md:translate-y-0 -translate-y-[400px]'>
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
        </div>
      </section>
    </div>
  );
}
