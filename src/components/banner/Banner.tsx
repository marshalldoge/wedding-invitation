import { ReactElement } from 'react';

export type strapiBanner = {
  children: ReactElement | ReactElement[]
};
const Banner = (props: strapiBanner) => {
  return (
    <div className={'relative flex flex-col-reverse md:flex-row h-auto md:h-[800px] bg-neutral-100 overflow-hidden'}>
      <div className={'md:basis-4/6 lg:basis-3/6 xl:basis-2/6 h-full'}>
        <div className={'flex-col h-full py-10 md:py-0'}>
          <div className={'flex flex-row justify-start items-center h-full px-4 md:px-12 lg:px-14'}>
            <div className={'mb-5 sm:mb-0'}>
              {props.children}
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

export default Banner;
