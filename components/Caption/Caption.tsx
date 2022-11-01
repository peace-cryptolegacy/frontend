interface Props {
  text: string;
  className?: string;
}

const Caption = ({ text, className }: Props) => {
  return <p className={className}>{text}</p>;
};

export default Caption;
