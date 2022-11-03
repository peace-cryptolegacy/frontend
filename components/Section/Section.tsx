import React from "react";

interface Props {
  className?: string;
  children: JSX.Element;
}

const Section = ({ className, children }: Props) => {
  return <div className={`flex  ${className || ""}`}>{children}</div>;
};

export default Section;
