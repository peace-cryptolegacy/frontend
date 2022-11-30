interface Props {
  text: string | JSX.Element;
  className?: string;
}

const Title = ({ text, className }: Props) => {
  return (
    <div className="w-screen">
      <h1
        className={`text-gradient inline-block  pb-7 text-2xl font-bold capitalize lg:text-3xl ${
          className || ''
        }`}
      >
        {text}
      </h1>
    </div>
  );
};

export default Title;
