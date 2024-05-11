import { ReactElement } from 'react';

export type strapiBanner = {
  children: ReactElement | ReactElement[]
};
const Invitation = (props: strapiBanner) => {
  return (
    <div className={'relative flex flex-row h-auto md:h-[800px] bg-neutral-100 overflow-hidden'}>
      <div className={'basis-1 md:basis-1/2 h-full'}>
        <div className={'flex-col h-full py-10 md:py-0'}>
          <div className={'flex flex-row justify-start items-center h-full px-4 md:px-12 lg:px-14'}>
            <div className={'mb-5 sm:mb-0'}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
      <div className={'basis-1 md:basis-1/2 h-full'}>
        <div className={'flex-col h-full py-10 md:py-0'}>
          <div className={'flex flex-row justify-start items-center h-full px-4 md:px-12 lg:px-14'}>
            <div className={'mb-5 sm:mb-0'}>
              <h1>MAP</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={'absolute bottom-[20%] left-[50%]'}>
        <div className={'bg-pink-100 w-[400px] h-[600px]'}>
          <img src={'/sakuraBranch.svg'} alt={'sakura'}/>
        </div>
      </div>
    </div>
  );
};

export default Invitation;
