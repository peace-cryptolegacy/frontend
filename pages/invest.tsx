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
          {/* The className is split into multiple lines to make it easier to read. */}
          <div
            className="
              absolute
              h-full
              max-h-[235px]
              w-full
              mobile-lg:max-h-[305px]
              sm:!top-[calc(50%-58px)]
              sm:max-h-[390px]
              sm:inset-center
              lg:max-h-[535px]
              "
          >
            <Image
              src={invest}
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
            Grow Your Capital Safe
          </GeneralDefaultConnectWalletTitle>
          <GeneralDefaultConnectWalletDescription>
            Track your crypto portfolio across every wallet you own and{' '}
            <strong>manage your Tokens, NFTs or DeFi activity.</strong>
          </GeneralDefaultConnectWalletDescription>
        </GeneralDefaultConnectWallet>
      );
    }
    return (
      <h1 className="h1 text-gradient absolute top-[50%] left-[50%] !font-extrabold">
        COMING SOON
      </h1>
    );
  };
  return renderPage();
};

export default Invest;
