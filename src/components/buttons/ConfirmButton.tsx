
interface ConfirmButtonProps {
  text: string;
  onClick?: (e: any) => void;
  backgroundColor?: string;
}
const ConfirmButton = ({ text, onClick = () => {}, backgroundColor = 'bg-pink-200' } : ConfirmButtonProps) => {

  return (
    <div className={`md:flex rounded-1 ${backgroundColor}`} onClick={onClick}>
      <div className={'m-10'}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ConfirmButton;
