import { ReactElement } from 'react';
import { lora } from '@/app/fonts';
import Title from '@/components/common/Title';

export type strapiBanner = {
  title: string;
  children: ReactElement | ReactElement[]
};
const Banner = (props: strapiBanner) => {
  return (
    <div className={`relative flex flex-row justify-center items-center h-[100vh] overflow-hidden ${lora.className}`}>
      <div className={'flex flex-col justify-center w-auto grid-cols-3 lg:basis-1/2'}>
        <Title className={'text-6xl lg:text-7xl text-brown-300 tracking-wider text-center'}>
          {props.title}
        </Title>
        <div className={`flex flex-row px-5 justify-center md:px-10 py-5 z-20`}>
          {props.children}
        </div>
      </div>
      <div className={'lg:basis-1/2'}></div>
      <div className={'absolute bottom-[0%] md:bottom-[0%] left-[0%] md:left-[-5%] z-30'}>
        <img src={'/sakuraBranch1Left.png'} alt={'sakura'} className={'w-[16rem] md:w-[24rem] h-[auto]'}/>
      </div>
    </div>
  );
};

export default Banner;
