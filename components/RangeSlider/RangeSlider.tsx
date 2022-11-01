import Section from "components/Section/Section";
import React, { useState } from "react";
import { Range } from "react-range";

interface Props {
  className?: string;
}

const RangeSlider = ({ className }: Props) => {
  const [values, setValues] = useState([59]);

  return (
    <>
      <Range
        step={1}
        min={0}
        max={75}
        values={values}
        onChange={(values) => {
          setValues(values);
        }}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            className="w-full h-3 pr-2 my-4 bg-purple-300 rounded-md"
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className="w-5 h-5 transform translate-x-10 bg-purple-900 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          />
        )}
      />
    </>
  );
};

export default RangeSlider;
