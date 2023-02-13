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
        {/* The className is split into multiple lines to make it easier to read. */}
        <div
          className="
              absolute
              h-full
              max-h-[250px]
              w-full
              mobile-lg:max-h-[320px]
              sm:!top-[calc(50%-30px)]
              sm:max-h-[400px]
              sm:inset-center
              lg:max-h-[550px]
              "
        >
          <Image
            src={tokensVault}
            alt="Tokens Vault"
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* This div is used to create a fix space between the image and the title. */}
        <div
          className="
          relative
          h-[230px]
          mobile-lg:h-[285px]
          sm:h-[400px]
          lg:h-[550px]
          "
        ></div>
        <GeneralDefaultConnectWalletTitle className="-mt-9">
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
