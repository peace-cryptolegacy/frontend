import clsx from 'clsx';

type Props = {
  className?: string;
};

const HorizontalRule = ({ className }: Props) => {
  return <hr className={clsx(className, 'w-full border-[1px]')} />;
};

export default HorizontalRule;
