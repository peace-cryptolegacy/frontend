import { useState } from 'react';
import { Range } from 'react-range';

const RangeSlider = () => {
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
            className="my-4 h-3 w-full rounded-md bg-purple-300 pr-2"
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            className=" h-5 w-5 translate-x-10 rounded-full bg-purple-900 focus:outline-none focus:ring-2 focus:ring-offset-2"
          />
        )}
      />
    </>
  );
};

export default RangeSlider;
