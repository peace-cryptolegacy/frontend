import Button from 'components/button/Button';
import Stack from 'components/stack/Stack';
import Image from 'next/image';
import windowExists from '../../../utils/helpers/windowExsists';
import { web3auth } from './js/Web3AuthConf';

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

const GeneralDefaultConnectWallet = ({ children }: Props) => {
  const handleConnect = async () => {
    if (windowExists() && web3auth) await web3auth.connect();
  };

  return (
    <Stack className="min-h-screen items-center justify-center !gap-9 text-center">
      {children}
      <div className="space-y-3">
        <Button
          onClick={() => handleConnect()}
          variant="fancy"
          text="Connect Wallet"
          size="base"
        />
        <Stack direction="row" className="justify-center">
          <span>Secured by</span>
          <div className="relative h-8 w-24">
            <Image
              src="/logos/web3auth.png"
              alt="Web3Auth"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </Stack>
      </div>
    </Stack>
  );
};

export default GeneralDefaultConnectWallet;
