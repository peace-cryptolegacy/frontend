import Box from 'components/Box/Box';
import Button from 'components/button/Button';
import GeneralDefaultConnectWallet from 'components/general/defaultConnectWallet/DefaultConnectWallet';
import GeneralDefaultConnectWalletDescription from 'components/general/defaultConnectWallet/Description';
import GeneralDefaultConnectWalletTitle from 'components/general/defaultConnectWallet/Title';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import PercentageBar from 'components/percentageBar/PercentageBar';
import Section from 'components/Section/Section';
import SocialButtons from 'components/SocialButtons/SocialButtons';
import Stack from 'components/stack/Stack';
import Tab from 'components/tabs/Tab';
import TabGroup from 'components/tabs/TabGroup';
import TabPanel from 'components/tabs/TabPanel';
import TabPanels from 'components/tabs/TabPanels';
import Tabs from 'components/tabs/Tabs';
import useGetBalances from 'hooks/useGetBalances';
import { NextPage } from 'next';
import Image from 'next/image';
import formatBigNumber from 'utils/helpers/formatBigNumber';
import tokenMappings from 'utils/helpers/tokenMappings';
import wagmiChainNameMappings from 'utils/helpers/wagmiChainNameMappings';
import topTokens from 'utils/topTokens';
import { useAccount, useNetwork } from 'wagmi';
import assets from '../public/images/assets.png';

const Assets: NextPage = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const networkName = chain && wagmiChainNameMappings[chain?.name];
  const tokensAddresses = networkName
    ? [
        ...topTokens.map(
          (token) => tokenMappings[token].networks[networkName].address
        ),
      ]
    : [];
  const tokenBalances = useGetBalances(address, tokensAddresses);

  const socialIcons = [
    {
      route: '/icons/twitter-white.png',
      alt: 'twitter',
    },
    {
      route: '/icons/email-white.png',
      alt: 'email',
    },
    {
      route: '/icons/discord-white.png',
      alt: 'discord',
    },
  ];

  const tokens = [
    {
      name: 'Ethereum',
      icon: '/logos/symbols/eth.png',
      amount: 20,
    },
    {
      name: 'Binance',
      icon: '/logos/symbols/bnb.png',
      amount: 20,
    },
    {
      name: 'Avalanche',
      icon: '/logos/symbols/avax.png',
      amount: 20,
    },
    {
      name: 'Moonbeam',
      icon: '/logos/symbols/moonbeam-black.png',
      amount: 20,
    },
  ];

  const prices: { [key: string]: number } = {
    ether: 1220,
    tether: 1,
    sushi: 1.41,
    maker: 500,
  };

  const renderPage = () => {
    if (!address) {
      return (
        <GeneralDefaultConnectWallet>
          <Image src={assets} alt="Tokens Vault" objectFit="contain" />
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
    return (
      <>
        <Section className="justify-between gap-8">
          <Stack className="capitalize">
            <Stack direction="row" className="gap-10">
              <Stack direction="row">
                <div className="relative h-[53px] w-[50px]">
                  <Image
                    src="/icons/portfolio.png"
                    layout="fill"
                    alt="portfolio"
                    objectFit="contain"
                  />
                </div>
                <h3 className="text-gradient h2">Portfolio</h3>
              </Stack>
              <span>All networks</span>
            </Stack>
            <Stack className="!gap-2.5">
              <span className="text-blue-gray">Your profile</span>
              <span className="text-2xl">Juvencrypto</span>
              <Stack direction="row" className="cursor-pointer">
                <span className="text-blue-gray">0x797..31A9b</span>
                <Image
                  src="/icons/copy.png"
                  width={13}
                  height={15}
                  alt="copy"
                  objectFit="contain"
                />
              </Stack>
              <SocialButtons className="mt-3" socialIcons={socialIcons} />
            </Stack>
          </Stack>
          <Box className="min-w-[334px] basis-2/6 rounded-lg bg-white p-8 capitalize drop-shadow-lg">
            <Stack className="!gap-1">
              <h4 className="text-blue-gray">net worth</h4>
              <span className="text-3xl">$80.00</span>
            </Stack>
            <span className="my-4 block text-blue-gray">
              Portfolio Breakdown
            </span>
            <div className="space-y-4">
              <PercentageBar name={'Total Assets'} percentage={100} />
              <PercentageBar name={'On Peace'} percentage={50} />
            </div>
          </Box>
        </Section>
        <TabGroup className="mt-14">
          <Tabs>
            <Tab>Tokens</Tab>
            <Tab>Collectibles</Tab>
            <Tab>Wallet Activity</Tab>
          </Tabs>
          <TabPanels>
            <TabPanel>
              <div className="mt-12 grid grid-cols-2 gap-8">
                <Box>
                  <TabGroup>
                    <Stack direction="row" className="justify-between">
                      <h4 className="block capitalize text-blue-gray">
                        Performance
                      </h4>
                      <Tabs className="!gap-3 text-sm">
                        <Tab>1D</Tab>
                        <Tab>1W</Tab>
                        <Tab>1M</Tab>
                        <Tab>1Y</Tab>
                      </Tabs>
                    </Stack>
                    <TabPanels>
                      <TabPanel>
                        <span className="mb-5 block text-3xl">$80.00</span>
                        <div className="relative h-48 w-full">
                          <Image
                            src="/images/assets-chart.png"
                            layout="fill"
                            alt="chart"
                            objectFit="contain"
                          />
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <></>
                      </TabPanel>
                      <TabPanel>
                        <></>
                      </TabPanel>
                      <TabPanel>
                        <></>
                      </TabPanel>
                    </TabPanels>
                  </TabGroup>
                </Box>
                <Box>
                  <h5 className="capitalize text-blue-gray">
                    Network Allocation
                  </h5>
                  <div className="mt-6 grid grid-cols-2 gap-x-10 gap-y-12">
                    {tokens.map((token) => {
                      return (
                        <Stack key={token.name} direction="row">
                          <div className="relative h-8 w-8 shrink-0">
                            <Image
                              src={token.icon}
                              layout="fill"
                              alt={token.name}
                            />
                          </div>
                          <div>
                            <span className="block whitespace-nowrap text-xs text-blue-gray">
                              Assets on {token.name}
                            </span>
                            <span className="block">${token.amount}</span>
                          </div>
                        </Stack>
                      );
                    })}
                  </div>
                </Box>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
        <Box className="mt-12">
          <TabGroup>
            <Stack direction="row" className="justify-between">
              <div>
                <span className="subtitle block">Wallet</span>
                <span className="text-3xl">$80.00</span>
              </div>
              <Tabs className="!gap-3 text-sm">
                <Tab>By Platform</Tab>
                <Tab>By Position</Tab>
              </Tabs>
            </Stack>
            <div className="mt-8 grid grid-cols-5 text-sm text-blue-gray">
              <span>Assets</span>
              <span>Price</span>
              <span>Balance</span>
              <span>Value</span>
              <span></span>
            </div>
            <HorizontalRule className="mt-3" />
            <TabPanel>
              <div className="mt-6 grid grid-cols-5 items-center gap-6">
                {topTokens.map((token, index) => {
                  const tokenMapping = tokenMappings[token];
                  const address =
                    networkName && tokenMapping.networks[networkName].address;
                  address;
                  const loading = false;
                  return (
                    <>
                      <Stack direction="row">
                        <div className="relative h-6 w-6 shrink-0">
                          <Image
                            src={tokenMapping ? tokenMapping.route : '/'}
                            alt={token}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        <div>
                          <span className="block capitalize">{token}</span>
                          <span className="subtitle">
                            {tokenMapping.symbol}
                          </span>
                        </div>
                      </Stack>
                      <span className="text-sm">${prices[token]}</span>
                      <span className="text-sm">
                        {tokenBalances.data
                          ? formatBigNumber(tokenBalances.data[index], 0)
                          : 'loading...'}
                      </span>
                      <span className="text-sm">
                        $
                        {tokenBalances.data
                          ? prices[token] *
                            +formatBigNumber(tokenBalances.data[index])
                          : 'loading...'}
                      </span>
                      <Button
                        variant="primary"
                        text={loading ? 'loading...' : 'Protect Token'}
                        disabled={loading}
                        onClick={() => {
                          loading ? null : {};
                        }}
                      />
                    </>
                  );
                })}
              </div>
            </TabPanel>
          </TabGroup>
        </Box>
      </>
    );
  };

  return renderPage();
};

export default Assets;
