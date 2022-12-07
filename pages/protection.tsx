import { default as GeneralDefaultConnectWallet } from 'components/general/defaultConnectWallet/DefaultConnectWallet';
import GeneralDefaultConnectWalletDescription from 'components/general/defaultConnectWallet/Description';
import GeneralDefaultConnectWalletTitle from 'components/general/defaultConnectWallet/Title';
import TestamentCreation from 'components/TestamentCreation';
import { NextPage } from 'next';
import Image from 'next/image';
import tokensVault from 'public/images/tokensVault.png';
import { useAccount } from 'wagmi';

const Protection: NextPage = () => {
  const { address } = useAccount();

  const renderPage = () => {
    if (address) {
      return <TestamentCreation />;
    }
    return (
      <GeneralDefaultConnectWallet>
        <Image src={tokensVault} alt="Tokens Vault" objectFit="contain" />
        <GeneralDefaultConnectWalletTitle>
          Protect your Wealth on Web3
        </GeneralDefaultConnectWalletTitle>
        <GeneralDefaultConnectWalletDescription>
          Use our multichain protocol, a non custodial solution to{' '}
          <strong>
            recover your assets in case of emergency, error or death.
          </strong>
        </GeneralDefaultConnectWalletDescription>
      </GeneralDefaultConnectWallet>
    );
  };

  return renderPage();
};

export default Protection;
