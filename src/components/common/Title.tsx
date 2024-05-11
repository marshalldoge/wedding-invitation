type titleProps = {
  title: string;
  color?: string;
};
const Title = ({ title, color = 'text-h1' }: titleProps) => {
  if (!title || title.length === 0) return null;
  return (
    <div className={`pb-10 ${color}`}>
      <h1>{title}</h1>
    </div>
  );
};

export default Title;
