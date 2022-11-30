import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from 'components/Input/TextField';
import Section from 'components/Section/Section';
import { FC } from 'react';
import { useAccount } from 'wagmi';

const Navbar: FC = () => {
  const { address } = useAccount();

  const renderComponent = () => {
    if (address) {
      return (
        <Section className="mt-6 mb-12">
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
        </Section>
      );
    }
    return null;
  };

  return renderComponent();
};

export default Navbar;
