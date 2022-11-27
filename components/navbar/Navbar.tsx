import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TextField from 'components/Input/TextField';
import Section from 'components/Section/Section';
import { FC } from 'react';
import { useConnect } from 'wagmi';

const Navbar: FC = () => {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();

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
      {connectors?.map((connector) => (
        <button
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name}
          {isLoading &&
            pendingConnector?.id === connector.id &&
            ' (connecting)'}
        </button>
      ))}
    </Section>
  );
};

export default Navbar;
