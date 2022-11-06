import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const List = ({ children, className }: Props) => {
  return <ul className={clsx(className)}>{children}</ul>;
};

export default List;
