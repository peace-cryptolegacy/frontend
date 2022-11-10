interface Props {
  text: string;
  className?: string;
}

const Title = ({ text, className }: Props) => {
  return (
    <h1
      className={`text-gradient inline-block pb-7 text-3xl font-bold capitalize ${
        className || ''
      }`}
    >
      {text}
    </h1>
  );
};

export default Title;
