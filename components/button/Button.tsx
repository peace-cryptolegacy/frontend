import clsx from 'clsx';
import Loading from 'components/UI/Loading';
import { ComponentPropsWithoutRef } from 'react';

type Props = {
  variant?:
    | 'primary'
    | 'secondary'
    | 'basic'
    | 'fancy'
    | 'gradientBorder'
    | 'text';
  size?: 'xs' | 'sm' | 'base' | 'lg';
  icon?: JSX.Element;
  text?: string;
  disabled?: boolean;
  loading?: boolean;
  props?: any;
  className?: string;
  onClick?: Function;
  children?: React.ReactNode | React.ReactNode[];
} & ComponentPropsWithoutRef<'button'>;

const Button = ({
  variant = 'fancy',
  size,
  icon,
  text,
  disabled,
  loading,
  className,
  onClick,
  children,
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
          loading && variant !== 'fancy' && 'py-0.5',
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
              loading ? 'py-1' : 'py-4'
            )}
          >
            {loading ? (
              <Loading
                width={48}
                height={48}
                fill={variant === 'gradientBorder' ? '#5f4dff' : '#fff'}
              />
            ) : (
              <>
                <span className="mr-2">{icon}</span>
                <span
                  className={clsx(
                    variant === 'fancy' ? 'text-white' : 'text-black',
                    'capitalize'
                  )}
                >
                  {text}
                  {children}
                </span>
              </>
            )}
          </div>
        ) : (
          <>
            {icon && <span className="mr-2">{icon}</span>}
            {loading ? (
              <Loading
                width={48}
                height={48}
                fill={variant === 'basic' ? '#5f4dff' : '#fff'}
              />
            ) : (
              <div
                className={clsx(
                  variant === 'primary'
                    ? 'text-white'
                    : variant === 'text'
                    ? 'text-purple-900'
                    : 'text-black',
                  'font-medium capitalize'
                )}
              >
                <span>{text}</span>
                {children}
              </div>
            )}
          </>
        )}
      </button>
    );
  };

  return renderButton();
};

export default Button;
