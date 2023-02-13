interface Props {
  text?: string;
  className?: string;
  children?: React.ReactNode;
}

const Caption = ({ text, children, className }: Props) => {
  return (
    <p className={className}>
      {text}
      {children}
    </p>
  );
};

export default Caption;
