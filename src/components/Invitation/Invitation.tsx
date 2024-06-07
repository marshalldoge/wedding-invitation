'use client';
import { ReactElement } from 'react';
import Map from '@/components/map/Map';

export type strapiBanner = {
  children: ReactElement | ReactElement[] | string
};
const Invitation = (props: strapiBanner) => {
  return (
    <div className={'relative lg:flex h-auto lg:h-[800px] overflow-hidden'}>
      <div className={'lg:basis-1/2 h-full'}>
        <div className={'flex-col h-full py-10 md:py-0'}>
          <div className={'flex flex-row justify-center items-center h-full'}>
            <div className={`md:w-[80%] mb-5 sm:mb-0 font-noto px-5 md:px-10 z-10`}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
      <div className={'lg:basis-1/2 h-full'}>
        <div className={'flex-col h-full py-10 md:py-0'}>
          <div className={'flex flex-row justify-center items-center h-full'}>
            <div className={'mb-5 sm:mb-0 z-10'}>
              <Map/>
              <div className={'width[100%] text-center'}>
                <p>Ubicación del salón - <strong><a href={'https://maps.app.goo.gl/VqiPM5KfgGHAvQ5c8'} target="_blank">Ver en google maps.</a></strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'absolute bottom-[28%] md:bottom-[0%] right-[0%] md:right-[-5%] z-30'}>
        <img src={'/sakuraBranch2Right.png'} alt={'sakura'} className={'w-[16rem] md:w-[24rem] h-[auto]'}/>
      </div>
    </div>
  );
};

export default Invitation;
