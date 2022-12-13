import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/button/Button';
import TextField from 'components/Input/TextField';
import Stack from 'components/stack/Stack';
import Loading from 'components/UI/Loading';
import { ConnectKitButton } from 'connectkit';
import { FC } from 'react';
import { useAccount } from 'wagmi';

const Navbar: FC = () => {
  const { address } = useAccount();

  const renderComponent = () => {
    if (address) {
      return (
        <Stack direction="row" className="mt-6 mb-12 justify-between">
          <div className="min-w-[440px]">
            <TextField
              startAdornment={
                <FontAwesomeIcon
                  icon={'fa-solid fa-magnifying-glass' as IconProp}
                />
              }
              placeHolder="Search by asset, address, domain or protocol"
            />
          </div>
          <ConnectKitButton.Custom>
            {({ isConnecting, show, isConnected, truncatedAddress }) => {
              return (
                <Button onClick={show} variant="gradientBorder" size="sm">
                  {isConnected ? (
                    truncatedAddress
                  ) : isConnecting ? (
                    <Loading />
                  ) : (
                    'Connect Wallet'
                  )}
                </Button>
              );
            }}
          </ConnectKitButton.Custom>
        </Stack>
      );
    }
    return null;
  };

  return renderComponent();
};

export default Navbar;
