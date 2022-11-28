import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
  direction?: 'row' | 'col';
  justifyItems?: 'start' | 'center' | 'end';
};

const Stack = ({ children, direction, justifyItems, className }: Props) => {
  return (
    <div
      className={clsx(
        'flex gap-4',
        direction === 'row'
          ? justifyItems
            ? 'flex-row' + ''
            : 'flex-row items-center'
          : 'flex-col',
        className
      )}
      style={{ justifyItems: `items-${justifyItems}` }}
    >
      {children}
    </div>
  );
};

export default Stack;
