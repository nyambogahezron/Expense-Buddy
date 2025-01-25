import DesktopMockup from '../../../components/DesktopMockup';

export default function InterfaceBanner() {
  return (
    <div className='flex flex-col items-center justify-around text-center max-w-full max-h-full min-h-[900px] bg-gray-300'>
      <div className='flex flex-col items-center'>
        <h1 className='text-[2.6rem] font-bold text-[#333] flex flex-col leading-[1.3] mt-8'>
          <span>Enjoy Our </span>{' '}
          <span className='text-orange-500 font-bold'>Beautiful Interface</span>
        </h1>
        <p className='text-1.15rem text-[#333] flex flex-col leading-1.3 max-w-[600px] mt-5'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. A provident
          possimus expedita temporibus dicta, sint soluta totam omnis
          repellendus, beatae odit vero sunt consectetur! Cupiditate?
        </p>
      </div>

      <DesktopMockup />

      <div className='text-16px items-center mb-5 p-5 mt-8'>
        <span className='text-sm uppercase font-bold text-orange-300'>
          Interface Overview
        </span>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam,
          dolores!
        </p>
      </div>
    </div>
  );
}
