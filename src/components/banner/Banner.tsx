import { ReactElement } from 'react';

export type strapiBanner = {
  children: ReactElement | ReactElement[]
};
const Banner = (props: strapiBanner) => {
  return (
    <div className={'relative flex flex-col-reverse md:flex-row h-auto md:h-[800px] bg-transparent overflow-hidden'}>
      <div className={'flex-col py-10 md:py-0 z-20'}>
        {props.children}
      </div>
      <div className={'absolute top-[20%] left-[30%] md:bottom-[20%] md:left-[50%] z-10'}>
        <div className={'bg-pink-200 w-[150px] h-[600px] md:w-[400px] md:h-[600px]'}>
          <img src={'/sakuraBranch.svg'} alt={'sakura'}/>
        </div>
      </div>
    </div>
  );
};

export default Banner;
