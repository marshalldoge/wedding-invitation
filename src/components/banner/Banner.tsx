import { ReactElement } from 'react';
import { dancingScript } from '@/app/fonts';

export type strapiBanner = {
  children: ReactElement | ReactElement[]
};
const Banner = (props: strapiBanner) => {
  return (
    <div className={'relative flex flex-col-reverse justify-center sm:justify-normal md:flex-row h-[100vh] md:items-center overflow-hidden'}>
      <div className={`flex-col px-5 md:px-10 py-10 md:py-[40%] font-dancing z-20 ${dancingScript.className}`}>
        {props.children}
      </div>
      <div className={'absolute bottom-[0%] md:bottom-[0%] left-[0%] md:left-[-5%] z-30'}>
        <img src={'/sakuraBranch1Left.png'} alt={'sakura'} className={'w-[16rem] md:w-[24rem] h-[auto]'}/>
      </div>
    </div>
  );
};

export default Banner;
