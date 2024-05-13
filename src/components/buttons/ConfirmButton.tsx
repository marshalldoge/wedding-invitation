import { ReactElement } from 'react';

interface ConfirmButtonProps {
  onClick?: (e: any) => void;
  backgroundColor?: string;
  children?: ReactElement | ReactElement[]
}
const ConfirmButton = ({ onClick = () => {}, backgroundColor = 'bg-pink-200', children } : ConfirmButtonProps) => {

  return (
    <div className={`md:flex rounded-lg ${backgroundColor} z-30`} onClick={onClick}>
      <div className={'flex justify-center items-center h-[10rem] w-[10rem]'}>
        {children}
      </div>
    </div>
  );
};

export default ConfirmButton;
