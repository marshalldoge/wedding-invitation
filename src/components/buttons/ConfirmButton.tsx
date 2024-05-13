
interface ConfirmButtonProps {
  text: string;
  onClick?: (e: any) => void;
  backgroundColor?: string;
}
const ConfirmButton = ({ text, onClick = () => {}, backgroundColor = 'bg-pink-200' } : ConfirmButtonProps) => {

  return (
    <div className={`md:flex rounded-lg ${backgroundColor} z-30`} onClick={onClick}>
      <div className={'m-10'}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ConfirmButton;
