'use client';
import Title from '@/components/common/Title';
import ConfirmButton from '@/components/buttons/ConfirmButton';
import { updateGuest } from '@/api/guestApi';
import { useSearchParams } from 'next/navigation';
import { Guest } from '@/types/general';

export type strapiBanner = {
  guest: Guest;
  reloadGuest?: () => void;
};
const Confirm = ({ guest, reloadGuest = () => {} }: strapiBanner) => {
  const searchParams = useSearchParams();
  const updateGuestConfirmation = (answer: string) => {
    updateGuest({ id: searchParams.get('id') as string, confirmation: answer }).then(res => {
      reloadGuest();
    });
  };

  return (
    <div className={'relative grid grid-cols-1 gap-4'}>
      <div className={'basis-full h-full'}>
        <div className={'flex flex-row justify-center items-center h-full'}>
          <Title><h3>Por favor confirma tu asistencia</h3></Title>
        </div>
      </div>
      <div className={'md:flex h-auto md:h-[400px] bg-neutral-100 overflow-hidden'}>
        <div className={'md:basis-1/2 h-full'}>
          <div className={'flex-col h-full py-10 md:py-0'}>
            <div className={'flex flex-row justify-center items-center h-full'}>
              <ConfirmButton text={'SI'} onClick={() => updateGuestConfirmation('Y')}/>
            </div>
          </div>
        </div>
        <div className={'md:basis-1/2 h-full'}>
          <div className={'flex-col h-full py-10 md:py-0'}>
            <div className={'flex flex-row justify-center items-center h-full'}>
              <ConfirmButton text={'NO'} onClick={() => updateGuestConfirmation('N')}/>
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
