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
import { useAccount, useEnsName, useNetwork } from 'wagmi';
import assets from '../public/images/assets.png';
import { formatAddress } from '../utils/formatters';

const Assets: NextPage = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const {
    data: ensName,
    isLoading: ensNameLoading,
    isError: ensNameError,
  } = useEnsName({
    address: address,
  });

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
          {/* The className is split into multiple lines to make it easier to read. */}
          <div
            className="
              absolute
              h-full
              max-h-[215px]
              w-full
              mobile-lg:max-h-[270px]
              sm:!top-[calc(50%-63px)]
              sm:max-h-[330px]
              sm:inset-center
              lg:max-h-[445px]
              "
          >
            <Image
              src={assets}
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
        <>
          <Section className="flex-col justify-between gap-8 md:flex-row ">
            <Stack className="self-center capitalize">
              <Stack
                direction="row"
                className="justify-between !gap-16 md:!gap-10"
              >
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
                <span className="text-2xl">
                  {ensNameLoading || ensNameError
                    ? `Astronaut#${address.slice(-4)}`
                    : ensName}
                </span>
                <Stack direction="row" className="cursor-pointer">
                  <span className="text-blue-gray">
                    {formatAddress(address)}
                  </span>
                  <Image
                    src="/icons/copy.png"
                    width={13}
                    height={15}
                    alt="copy"
                    objectFit="contain"
                  />
                </Stack>
                <SocialButtons
                  className="mt-3 justify-between"
                  socialIcons={socialIcons}
                />
              </Stack>
            </Stack>
            <Box className="w-full min-w-[334px] basis-2/6 self-center rounded-lg bg-white p-8 capitalize drop-shadow-lg">
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
            <Tabs className="justify-center mobile-lg:justify-start">
              <Tab>Tokens</Tab>
              <Tab>Collectibles</Tab>
              <Tab>Wallet Activity</Tab>
            </Tabs>
            <TabPanels>
              <TabPanel>
                <div className="mt-12 grid gap-8 md:grid-cols-2">
                  <Box>
                    <TabGroup className="flex flex-col gap-2">
                      <Stack
                        direction="row"
                        className="flex-col justify-between mobile-lg:flex-row"
                      >
                        <div className="text-center mobile-lg:mt-0 mobile-lg:mb-5 mobile-lg:text-left">
                          <h4 className="block capitalize text-blue-gray">
                            Performance
                          </h4>
                          <span className="block text-3xl">$80.00</span>
                        </div>
                        <Tabs className="w-full justify-around !gap-3 text-sm mobile-lg:w-auto mobile-lg:justify-start">
                          <Tab>1D</Tab>
                          <Tab>1W</Tab>
                          <Tab>1M</Tab>
                          <Tab>1Y</Tab>
                        </Tabs>
                      </Stack>
                      <TabPanels>
                        <TabPanel>
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
                    <h5 className="text-center capitalize text-blue-gray mobile-lg:text-left">
                      Network Allocation
                    </h5>
                    <div className="mt-6 grid grid-cols-1 gap-x-10 gap-y-12 mobile-md:grid-cols-2">
                      {tokens.map((token) => {
                        return (
                          <Stack key={token.name} direction="row">
                            <div className="relative h-8 w-8 shrink-0">
                              <Image
                                src={token.icon}
                                layout="fill"
                                alt={token.icon}
                              />
                            </div>
                            <div>
                              <span className="block whitespace-nowrap text-xs text-blue-gray">
                                {token.name}
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
              <Stack
                direction="row"
                className="flex-col mobile-lg:flex-row mobile-lg:justify-between"
              >
                <div className="text-center mobile-lg:text-left">
                  <span className="subtitle block">Wallet</span>
                  <span className="text-3xl">$80.00</span>
                </div>
                <Tabs className="w-full justify-around !gap-3 text-sm mobile-lg:justify-end">
                  <Tab>By Platform</Tab>
                  <Tab>By Position</Tab>
                </Tabs>
              </Stack>
              <div className="mt-8 grid grid-cols-4 gap-1 text-sm text-blue-gray md:grid-cols-5 md:gap-6">
                <span>Asset</span>
                <span>Price</span>
                <span>Balance</span>
                <span>Value</span>
                <span className="hidden md:inline"></span>
              </div>
              <HorizontalRule className="mt-3" />
              <TabPanel>
                <div className="mt-6 grid grid-cols-4 grid-rows-[repeat(8,minmax(0,1fr))] items-center gap-x-1 md:grid-cols-5 md:grid-rows-1 md:gap-6">
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
                          <div className="hidden sm:block">
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
                          className="col-span-4 mx-auto mb-4 w-full !py-2 mobile-lg:max-w-[260px] mobile-lg:!py-3 md:hidden"
                          variant="primary"
                          text={loading ? 'loading...' : 'Protect'}
                          disabled={loading}
                          onClick={() => {
                            loading ? null : {};
                          }}
                        />
                        <Button
                          className="hidden px-2 !py-3.5 md:inline"
                          variant="primary"
                          text={loading ? 'loading...' : 'Protect'}
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
        <div className="fixed inset-0 bg-white/10 backdrop-blur">
          <h1 className="h1 text-gradient absolute text-center !font-black drop-shadow-xl inset-center lg:!left-[calc(50%+125px)]">
            COMING SOON
          </h1>
        </div>
      </>
    );
  };

  return renderPage();
};

export default Assets;
