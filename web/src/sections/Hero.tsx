import IOSImg from '../../images/ios.png';
import AndroidImg from '../../images/android.png';
import MobileMockup from '../MobileMockup';

export function Hero() {
  return (
    <section className='bg-[#070b11] text-white min-h-[95vh] w-screen max-w-full pt-16'>
      <div className='container flex flex-col items-center gap-[2.5rem] md:top-2 md:flex-row  md:justify-between md:text-left md:-mt-12'>
        <div className='relative flex flex-col items-start md:items-start  justify-center text-center h-full -mt-8 md:-mt-20 w-full md:w-1/2 md:text-left '>
          <h1 className='text-[1.2rem] font-extrabold uppercase text-gray-500'>
            Invest in your future
          </h1>

          <div className='sm:text-[3rem] md:text-[4rem] text-[2.5rem] font-bold mb-6 leading-[1.4] flex flex-col text-start'>
            <span className='text-orange-500'>Saving &</span>
            <span>investing are</span>
            <span>
              made <span className='text-orange-500'>simple</span>
            </span>
          </div>
          <p className='text-[1.125rem] mb-8 mt-4 opacity-90 font-semibold'>
            Take control of your financial future with our easy-to-use platform
          </p>

          <p className='text-[1.1rem] mb-3 mt-4 opacity-40 font-semibold text-gray-500'>
            DOWNLOAD NOW ON :
          </p>
          <div className='flex gap-4 flex-col sm:flex-row w-full'>
            <button className='bg-black text-white py-3 px-6 rounded-lg flex items-center gap-2 w-full'>
              <img src={IOSImg} alt='App Store' className='w-full sm:w-5 h-5' />
              App Store
            </button>
            <button className='bg-black text-white py-3 px-6 rounded-lg flex items-center gap-2 w-full'>
              <img src={AndroidImg} alt='Play Store' className='w-5 h-5' />
              Play Store
            </button>
          </div>
        </div>

        <div className='relative h-[80vh] w-full flex flex-col items-center justify-center text-center md:w-1/2'>
          <MobileMockup />
        </div>
      </div>
    </section>
  );
}
