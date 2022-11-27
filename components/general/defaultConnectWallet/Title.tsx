import clsx from 'clsx';

type Props = {
  className?: string;
  children: string;
};

const GeneralDefaultConnectWalletTitle = ({ className, children }: Props) => {
  return <h1 className={clsx('h1 text-gradient', className)}>{children}</h1>;
};

export default GeneralDefaultConnectWalletTitle;
