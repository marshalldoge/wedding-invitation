import { ReactElement } from 'react';

type titleProps = {
  className?: string;
  children: ReactElement | string;
};
const Title = ({ children, className = '' }: titleProps) => {
  return (
    <div className={`${className} pb-10 font-noto z-20 px-5 text-center`}>
      {children}
    </div>
  );
};

export default Title;
