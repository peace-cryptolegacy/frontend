import clsx from 'clsx';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import ListItem from 'components/list/ListItem';
import React from 'react';

type Props = {
  steps: string[];
  className?: string;
  activeStep: number;
};

const Stepper = ({ steps, className, activeStep }: Props) => {
  return (
    <ol
      className={clsx(
        className,
        'flex w-full items-center justify-between gap-6'
      )}
    >
      {steps.map((step, i) => {
        return (
          <React.Fragment key={step}>
            <ListItem className="!gap-4">
              <div
                className={`flex h-10 w-10 shrink-0 items-center rounded-full ${
                  activeStep === i ? 'bg-purple-900' : 'bg-purple-100'
                }`}
              >
                <span
                  className={`mx-auto text-xl ${
                    activeStep === i ? 'text-white' : 'text-gradient'
                  }`}
                >
                  {i + 1}
                </span>
              </div>
              <h4 className="h4 capitalize xl:whitespace-nowrap">{step}</h4>
            </ListItem>
            {i !== steps.length - 1 && (
              <ListItem className="w-full">
                <HorizontalRule className="h-[2px] bg-mainHorizontal" />
              </ListItem>
            )}
          </React.Fragment>
        );
      })}
    </ol>
  );
};

export default Stepper;
