'use client';
import Title from '@/components/common/Title';
import ConfirmButton from '@/components/buttons/ConfirmButton';

export type strapiBanner = {
};
const Confirm = (props: strapiBanner) => {
  return (
    <div className={'relative grid grid-cols-1 gap-4'}>
      <div className={'basis-full h-full'}>
        <div className={'flex flex-row justify-center items-center h-full'}>
          <Title><h3>Por favor confirma tu asistencia</h3></Title>
        </div>
      </div>
      <div className={'relative md:flex h-auto md:h-[400px] bg-neutral-100 overflow-hidden'}>
        <div className={'md:basis-1/2 h-full'}>
          <div className={'flex-col h-full py-10 md:py-0'}>
            <div className={'flex flex-row justify-center items-center h-full'}>
              <ConfirmButton text={'SI'} onClick={() => {}}/>
            </div>
          </div>
        </div>
        <div className={'md:basis-1/2 h-full'}>
          <div className={'flex-col h-full py-10 md:py-0'}>
            <div className={'flex flex-row justify-center items-center h-full'}>
              <ConfirmButton text={'NO'} onClick={() => {}}/>
            </div>
          </div>
        </div>
        <div className={'absolute bottom-[100%] left-[0%]'}>
          <img src={'/sakuraBranch.svg'} alt={'sakura'} className={'w-[400px] h-[200px]'}/>
        </div>
      </div>
      <div className={'absolute bottom-[100%] left-[0%]'}>
        <img src={'/sakuraBranch.svg'} alt={'sakura'} className={'w-[400px] h-[200px]'}/>
      </div>
    </div>
  );
};

export default Confirm;
