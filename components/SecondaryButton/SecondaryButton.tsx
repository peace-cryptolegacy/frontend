import React from "react";
interface Props {
  text: string;
  className: string;
  onClick?: React.FormEventHandler<HTMLButtonElement>;
}

const SecondaryButton = ({ text, className, onClick }: Props) => {
  return (
    <button
      className={`px-4 py-2 text-purple-900 ${className || ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default SecondaryButton;
