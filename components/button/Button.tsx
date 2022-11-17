import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

type Props = {
  variant?: 'primary' | 'secondary' | 'fancy';
  size?: 'sm' | 'base' | 'lg';
  icon?: JSX.Element;
  text: string;
  props?: any;
  className?: string;
} & ComponentPropsWithoutRef<'button'>;

const Button = ({
  variant = 'fancy',
  size,
  icon,
  text,
  className,
  props,
}: Props) => {
  const renderButton = () => {
    if (variant === 'fancy') {
      return (
        <button
          {...props}
          className={clsx(
            'rounded-2xl bg-mainVertical p-1.5',
            size === 'sm' && 'w-[1px]',
            size === 'base' && 'w-[1px]',
            size === 'lg' && 'w-[369px]',
            className
          )}
        >
          <div className=" rounded-2xl bg-black py-4">
            <span className="mr-2">{icon}</span>
            <span className="h3 capitalize !text-white">{text}</span>
          </div>
        </button>
      );
    }
    return null;
  };

  return renderButton();
};

export default Button;
