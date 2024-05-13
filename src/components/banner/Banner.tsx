import { ReactElement } from 'react';

export type strapiBanner = {
  children: ReactElement | ReactElement[]
};
const Banner = (props: strapiBanner) => {
  return (
    <div className={'relative flex flex-col-reverse md:flex-row h-auto md:h-[800px] overflow-hidden'}>
      <div className={'flex-col px-10 py-10 md:py-[40%] z-20'}>
        {props.children}
      </div>
      <div className={'absolute top-[20%] right-[0%] md:bottom-[20%] md:left-[50%] z-10'}>
        <div className={'w-[150px] h-[600px] md:w-[400px] md:h-[600px]'}>

        </div>
      </div>
    </div>
  );
};

export default Banner;
