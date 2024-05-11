import { ReactElement } from 'react';

type titleProps = {
  color?: string;
  children: ReactElement;
};
const Title = ({ color = 'text-h1', children }: titleProps) => {
  return (
    <div className={`pb-10 ${color} font-noto`}>
      {children}
    </div>
  );
};

export default Title;
