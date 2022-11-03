import React from "react";
interface Props {
  icon?: JSX.Element;
  text: string;
  disabled?: boolean;
  className: string;
  onClick?: React.FormEventHandler<HTMLButtonElement>;
}

const PrimaryButton = ({
  icon,
  text,
  disabled = false,
  className,
  onClick,
}: Props) => {
  return (
    <button
      disabled={disabled}
      className={`px-4 py-2 font-bold bg-purple-900 rounded-xl text-white capitalize disabled:opacity-25 ${
        className || ""
      }`}
      onClick={onClick}
    >
      <span className="mr-2">{icon}</span>
      {text}
    </button>
  );
};

export default PrimaryButton;
