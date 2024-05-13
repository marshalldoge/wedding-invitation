interface ConfirmButtonProps {
  text: string;
  onClick?: (e:any) => void;
  disabled?: boolean;
}
const ConfirmButton = ({ text, onClick = () => {}, disabled = false } : ConfirmButtonProps) => (
  <div className={'md:flex rounded-1 bg-pink-200 hover:bg-pink-300 hover:cursor-pointer'} onClick={onClick}>
    <div className={'m-10'}>
      <p>{text}</p>
    </div>
  </div>
);

export default ConfirmButton;
