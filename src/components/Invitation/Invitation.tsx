'use client';
import { ReactElement } from 'react';
import Map from '@/components/map/Map';

export type strapiBanner = {
  children: ReactElement | ReactElement[] | string
};
const Invitation = (props: strapiBanner) => {
  return (
    <div className={'relative md:flex h-auto md:h-[800px] bg-neutral-100 overflow-hidden'}>
      <div className={'md:basis-1/2 h-full'}>
        <div className={'flex-col h-full py-10 md:py-0'}>
          <div className={'flex flex-row justify-center items-center h-full'}>
            <div className={'w-[80%] mb-5 sm:mb-0 font-noto'}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
      <div className={'md:basis-1/2 h-full'}>
        <div className={'flex-col h-full py-10 md:py-0'}>
          <div className={'flex flex-row justify-center items-center h-full'}>
            <div className={'mb-5 sm:mb-0'}>
              <Map/>
            </div>
          </div>
        </div>
      </div>
      <div className={'absolute bottom-[100%] left-[0%]'}>
        <img src={'/sakuraBranch.svg'} alt={'sakura'} className={'w-[400px] h-[200px]'}/>
      </div>
    </div>
  );
};

export default Invitation;
