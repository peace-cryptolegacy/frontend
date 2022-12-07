import { ReactNode } from 'react';

type Props = {
  children: string | ReactNode;
};

const GeneralDefaultConnectWalletDescription = ({ children }: Props) => {
  return <p className="max-w-[528px]">{children}</p>;
};

export default GeneralDefaultConnectWalletDescription;
