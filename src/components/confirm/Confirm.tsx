'use client';
import Title from '@/components/common/Title';
import ConfirmButton from '@/components/buttons/ConfirmButton';
import { updateGuest } from '@/api/guestApi';
import { Guest, InvitationConfirmation } from '@/types/general';

export type strapiBanner = {
  guest: Guest;
  reloadGuest?: any;
  setLocalGuest?: any;
};
const Confirm = ({ guest, reloadGuest = () => Promise.resolve(), setLocalGuest = () => Promise.resolve() }: strapiBanner) => {
  const updateGuestConfirmation = (answer: InvitationConfirmation) => {
    if(guest && !guest.locked) {
      const newGuest = { ...guest, confirmation: answer };
      setLocalGuest(newGuest);
      updateGuest(newGuest).then(res => {
        reloadGuest(newGuest);
      });
    }
  };

  let yesBackgroundColor = 'bg-pink-200';
  let noBackgroundColor = 'bg-pink-200';

  if(guest) {
    if(guest.locked) {
      yesBackgroundColor = guest.confirmation  === 'Y' ? 'bg-yellow-100' : 'bg-neutral-400';
      noBackgroundColor = guest.confirmation === 'N' ? 'bg-yellow-100' : 'bg-neutral-400';
      yesBackgroundColor += ' hover:cursor-not-allowed ';
      noBackgroundColor += ' hover:cursor-not-allowed';
    } else {
      yesBackgroundColor = guest.confirmation  === 'Y' ? 'bg-yellow-100' : 'bg-pink-100';
      noBackgroundColor = guest.confirmation === 'N' ? 'bg-yellow-100' : 'bg-pink-100';
      yesBackgroundColor += ' hover:cursor-pointer';
      noBackgroundColor += ' hover:cursor-pointer';
    }
  }


  return (
    <div className={'relative grid grid-cols-1 gap-4'}>
      <div className={'basis-full h-full'}>
        <div className={'flex flex-row justify-center items-center h-full'}>
          <Title><h3>Por favor confirma tu asistencia</h3></Title>
        </div>
      </div>
      <div className={'md:flex h-auto md:h-[400px] bg-neutral-100 overflow-hidden'}>
        <div className={'md:basis-1/2'}>
          <div className={'flex-col py-10 md:py-0'}>
            <div className={'flex flex-row justify-center items-center h-full'}>
              <ConfirmButton text={'SI'} onClick={() => updateGuestConfirmation('Y')} backgroundColor={yesBackgroundColor}/>
            </div>
          </div>
        </div>
        <div className={'md:basis-1/2'}>
          <div className={'flex-col py-10 md:py-0'}>
            <div className={'flex flex-row justify-center items-center h-full'}>
              <ConfirmButton text={'NO'} onClick={() => updateGuestConfirmation('N')} backgroundColor={noBackgroundColor}/>
            </div>
          </div>
        </div>
      </div>
      <div className={'absolute bottom-[0%] right-[0%] z-10'}>
        <img src={'/sakuraBranch.svg'} alt={'sakura'} className={'w-[400px] h-[300px]'}/>
      </div>
    </div>
  );
};

export default Confirm;
