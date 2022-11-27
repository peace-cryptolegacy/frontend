import GeneralDefaultConnectWallet from 'components/general/defaultConnectWallet/DefaultConnectWallet';
import GeneralDefaultConnectWalletDescription from 'components/general/defaultConnectWallet/Description';
import GeneralDefaultConnectWalletTitle from 'components/general/defaultConnectWallet/Title';
import { NextPage } from 'next';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import invest from '../public/images/invest.png';

const Invest: NextPage = () => {
  const { address } = useAccount();

  const renderPage = () => {
    if (!address) {
      return (
        <GeneralDefaultConnectWallet>
          <Image src={invest} alt="Tokens Vault" objectFit="contain" />
          <GeneralDefaultConnectWalletTitle>
            Manage your assets easy
          </GeneralDefaultConnectWalletTitle>
          <GeneralDefaultConnectWalletDescription>
            Track your crypto portfolio across every wallet you own and{' '}
            <strong>manage your Tokens, NFTs or DeFi activity.</strong>
          </GeneralDefaultConnectWalletDescription>
        </GeneralDefaultConnectWallet>
      );
    }
    return <></>;
  };
  return renderPage();
};

export default Invest;
