import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

type Props = {
  variant?: 'primary' | 'secondary' | 'basic' | 'fancy' | 'gradientBorder';
  size?: 'xs' | 'sm' | 'base' | 'lg';
  icon?: JSX.Element;
  text: string;
  disabled?: boolean;
  props?: any;
  className?: string;
  onClick?: Function;
} & ComponentPropsWithoutRef<'button'>;

const Button = ({
  variant = 'fancy',
  size,
  icon,
  text,
  disabled,
  className,
  onClick,
  ...props
}: Props) => {
  const renderButton = () => {
    return (
      <button
        {...props}
        onClick={onClick}
        className={clsx(
          ['fancy', 'gradientBorder'].includes(variant) &&
            'rounded-2xl bg-mainVertical',
          variant === 'fancy' && 'p-1.5',
          variant === 'gradientBorder' && 'p-0.5',
          !['fancy', 'gradientBorder'].includes(variant) && 'rounded-lg py-4',
          variant === 'basic' && 'border-[1px] border-gray-300 bg-white',
          variant === 'primary' && 'bg-purple-900',
          size === 'xs' && 'w-[140px]',
          size === 'sm' && 'w-[200px]',
          size === 'base' && 'w-[260px]',
          size === 'lg' && 'w-[369px]',
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
      >
        {['fancy', 'gradientBorder'].includes(variant) ? (
          <div
            className={clsx(
              variant === 'fancy' ? 'bg-black' : 'bg-white',
              ['fancy', 'gradientBorder'].includes(variant)
                ? 'rounded-2xl'
                : 'rounded-lg',
              'py-4'
            )}
          >
            <span className="mr-2">{icon}</span>
            <span
              className={clsx(
                variant === 'fancy' ? 'text-white' : 'text-black',
                'capitalize'
              )}
            >
              {text}
            </span>
          </div>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            <span
              className={clsx(
                variant === 'primary' ? 'text-white' : 'text-black',
                'font-medium capitalize'
              )}
            >
              {text}
            </span>
          </>
        )}
      </button>
    );
  };

  return renderButton();
};

export default Button;
