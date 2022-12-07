import clsx from 'clsx';
import { ComponentPropsWithoutRef } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  isSelected?: boolean;
  classNameOuterDiv?: string;
  classNameInnerDiv?: string;
} & ComponentPropsWithoutRef<'li'>;

const ListItem = ({
  children,
  isSelected,
  classNameOuterDiv,
  classNameInnerDiv,
  className,
  ...props
}: Props) => {
  return (
    <li
      {...props}
      className={clsx(!isSelected && 'flex items-center gap-10', className)}
    >
      {isSelected ? (
        <div
          className={clsx(
            isSelected && 'rounded-3xl bg-mainVertical p-1 drop-shadow-xl',
            classNameOuterDiv
          )}
        >
          <div
            className={clsx(
              'flex items-center gap-10 rounded-3xl bg-white px-6 py-2',
              isSelected && 'border-2',
              classNameInnerDiv
            )}
          >
            {children}
          </div>
        </div>
      ) : (
        children
      )}
    </li>
  );
};

export default ListItem;
