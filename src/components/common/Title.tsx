import { ReactElement } from 'react';

type titleProps = {
  className?: string;
  children: ReactElement | string;
};
const Title = ({ children, className = '' }: titleProps) => {
  return (
    <div className={`${className} z-20 px-5`}>
      {children}
    </div>
  );
};

export default Title;
