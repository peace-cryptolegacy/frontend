import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/button/Button';
import TextField from 'components/Input/TextField';
import Stack from 'components/stack/Stack';
import { FC } from 'react';
import { useAccount, useConnect } from 'wagmi';

const Navbar: FC = () => {
  const { address } = useAccount();
  const { connect, connectors } = useConnect();

  const connector = connectors.at(0);

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
          {address ? (
            <span>Connected</span>
          ) : (
            <Button
              variant="basic"
              text="Connect"
              onClick={() => connect({ connector })}
            />
          )}
        </Stack>
      );
    }
    return null;
  };

  return renderComponent();
};

export default Navbar;
