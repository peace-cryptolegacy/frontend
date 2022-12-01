interface Props {
  text: string | JSX.Element;
  className?: string;
}

const Title = ({ text, className }: Props) => {
  return (
    <div className="w-screen">
      <h1
        className={`text-gradient ml-2 inline-block pb-7 text-base font-bold capitalize lg:text-2xl xl:text-3xl ${
          className || ''
        }`}
      >
        {text}
      </h1>
    </div>
  );
};

export default Title;
