import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import clsx from 'clsx';
import Box from 'components/Box/Box';
import Button from 'components/button/Button';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import PercentageBar from 'components/percentageBar/PercentageBar';
import Stack from 'components/stack/Stack';
import Tab from 'components/tabs/Tab';
import TabGroup from 'components/tabs/TabGroup';
import TabPanel from 'components/tabs/TabPanel';
import TabPanels from 'components/tabs/TabPanels';
import Tabs from 'components/tabs/Tabs';
import { BigNumber } from 'ethers';
import useSignalLife from 'hooks/useSignalLife';
import Image from 'next/image';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import networkMappings from 'utils/helpers/networkMappings';
import timeSince from 'utils/helpers/timeSince';
import wagmiChainNameMappings from 'utils/helpers/wagmiChainNameMappings';
import { useAccount, useNetwork } from 'wagmi';
import percentageCalculator from '../../../utils/helpers/percentageCalculator';
import tokenMappings from '../../../utils/helpers/tokenMappings';
import { Address, DynamicVault, Testament } from '../../../utils/Types';
import ProtectionActiveDialog from './Dialog';

type Props = {
  dynamicVault: Partial<DynamicVault> | undefined;
  setCanceled: Dispatch<SetStateAction<boolean>>;
};

const ProtectionsActive = ({ dynamicVault, setCanceled }: Props) => {
  const { address } = useAccount();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState<
    'edit assets' | 'edit heirs' | 'edit time'
  >();
  const [inactivityTime, setInactivityTime] = useState(
    BigNumber.from(Date.now())
  );
  const [testament, setTestament] = useState<Testament>();
  const [protectedTokens, setProtectedTokens] = useState<Address[]>();

  const { chain } = useNetwork();

  useEffect(() => {
    setTestament(dynamicVault?.testament);
  }, [dynamicVault?.testament]);

  useEffect(() => {
    const fetchProtectedTokens = async () => {
      // To-do: fix any
      const res: any = await axios.get(
        'http://localhost:3000/api/dynamicvault?dynamicvaultowner=' + address
      );

      setProtectedTokens(res.data.dynamicVault?.testament.protectedTokens);
    };

    fetchProtectedTokens();
  }, [address]);

  const network =
    wagmiChainNameMappings[
      chain?.name as keyof typeof wagmiChainNameMappings
    ] ?? 'moonbeam';
  const networkNativeToken =
    networkMappings[network as keyof typeof networkMappings].token;
  const networkTokenMapping =
    tokenMappings[networkNativeToken as keyof typeof tokenMappings];

  useEffect(() => {
    if (testament?.proofOfLife !== undefined) {
      setInactivityTime(testament?.proofOfLife);
    }
  }, [testament?.proofOfLife]);

  const {
    prepareTransact: prepareVerifyLife,
    transact: verifyLife,
    transaction: verifyLifeTransaction,
  } = useSignalLife();

  useEffect(() => {
    if (verifyLifeTransaction.isSuccess) {
      setInactivityTime(BigNumber.from(Date.now()));
    }
  }, [verifyLifeTransaction]);

  const testamentHistory = [
    {
      action: {
        type: 'Edited',
        description: '2 Beneficiaries Added',
      },
      date: new Date(),
    },
    {
      action: {
        type: 'Created',
        description: '',
      },
      date: new Date(),
    },
  ];

  const handleEditAssets = () => {
    setDialogContent('edit assets');
    setIsDialogOpen(true);
  };

  const handleEditHeirs = () => {
    setDialogContent('edit heirs');
    setIsDialogOpen(true);
  };

  const handleEditTime = () => {
    setDialogContent('edit time');
    setIsDialogOpen(true);
  };

  const handleVerifyLife = () => {
    verifyLife.write?.();
  };

  return (
    <>
      <Stack direction="row">
        <div className="relative h-10 w-10 shrink-0">
          <Image
            src="/icons/folder.png"
            alt="folder"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <h2 className="h2 text-gradient">Dashboard</h2>
      </Stack>
      <TabGroup>
        <Tabs className="mt-12">
          <Tab>Active Protections</Tab>
          <Tab>Eligible Protections</Tab>
        </Tabs>
        <TabPanels>
          <TabPanel>
            <div className="mt-10 grid grid-cols-2 gap-20">
              <div className="space-y-2">
                <h4 className="h4">Manage Plan</h4>
                <Box>
                  <div className="flex justify-between text-sm text-blue-gray">
                    <div className="flex gap-1">
                      <span>Inheritance Plan</span>
                      <FontAwesomeIcon
                        icon={faCircleInfo}
                        size="sm"
                        style={{ cursor: 'pointer' }}
                      />
                    </div>
                    <span>Net Protected</span>
                  </div>
                  <div className="space-y-6">
                    <Stack direction="row" className="mt-3 !gap-2">
                      <div className="relative  h-6 w-6 shrink-0">
                        <Image
                          src={
                            networkTokenMapping
                              ? networkTokenMapping.route
                              : '/'
                          }
                          alt={network}
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                      <span className="capitalize">{network}</span>
                    </Stack>
                    <div
                      className={clsx(
                        'mt-8 flex justify-between gap-4 [&>div>span:first-of-type]:text-sm [&>div>span]:block',
                        '[&>div>span:first-of-type]:text-blue-gray [&>div]:space-y-2'
                      )}
                    >
                      <div>
                        <span>Tokens</span>
                        <span className="block">
                          {protectedTokens?.length ?? 0}
                        </span>
                      </div>
                      <div>
                        <span>Collectibles</span>
                        <span>0</span>
                      </div>
                      <div className="self-end">
                        <Button
                          variant="basic"
                          text="Edit Assets"
                          onClick={() => handleEditAssets()}
                          size="xs"
                          className="whitespace-nowrap py-1.5 text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm text-blue-gray">Protectors</span>
                      <div className="flex justify-between">
                        <span>
                          {testament?.beneficiaries?.length} Beneficiaries
                        </span>
                        <div className="self-end">
                          <Button
                            variant="basic"
                            text="Edit Heirs"
                            onClick={() => handleEditHeirs()}
                            size="xs"
                            className="whitespace-nowrap py-1.5 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <HorizontalRule />
                    <div className="flex justify-between">
                      <div className="space-y-2 xl:w-max">
                        <div className="flex gap-2">
                          <span className="text-sm text-blue-gray xl:w-max">
                            Days since
                            <br className="xl:hidden" /> inactivity
                          </span>
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                            size="sm"
                            style={{ cursor: 'pointer' }}
                          />
                        </div>
                        <span className="block">
                          <span className="font-semibold">
                            {
                              timeSince(
                                ['0', undefined].includes(
                                  testament?.proofOfLife?.toString()
                                )
                                  ? Date.now() / 1000
                                  : (testament?.proofOfLife as BigNumber)
                              ) as number
                            }
                          </span>{' '}
                          of {testament?.inactivityMaximum?.toString()} days
                        </span>
                      </div>
                      <div>
                        <Button
                          variant="basic"
                          text="Edit Time"
                          onClick={() => handleEditTime()}
                          size="xs"
                          className="whitespace-nowrap py-1.5 text-sm"
                        />
                      </div>
                    </div>
                    <PercentageBar
                      percentage={
                        percentageCalculator(
                          testament?.inactivityMaximum ?? BigNumber.from(0),
                          timeSince(
                            inactivityTime,
                            'seconds',
                            'number'
                          ) as BigNumber
                        ) as number
                      }
                      className="[&>div>div:nth-child(2)]:!bg-mainHorizontal"
                    />
                  </div>
                  <Button
                    variant="fancy"
                    text="Verify Life"
                    className="mt-10 w-full"
                    onClick={() =>
                      prepareVerifyLife.isLoading ||
                      verifyLife.isLoading ||
                      verifyLifeTransaction.isLoading
                        ? null
                        : handleVerifyLife()
                    }
                    loading={
                      prepareVerifyLife.isLoading || verifyLife.isLoading
                    }
                  />
                </Box>
              </div>
              <div className="flex flex-col space-y-2">
                <h4 className="h4">History Activity</h4>
                <Box className="flex h-full flex-col">
                  <div className="space-y-8">
                    {testamentHistory.map((history, index) => (
                      <Stack
                        key={index}
                        direction="row"
                        className="justify-between !gap-10"
                      >
                        <Stack direction="row" className="!gap-2">
                          <div className="relative h-12 w-12 shrink-0">
                            <Image
                              src="/icons/inheritance-plan.png"
                              alt="security profile"
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                          <div>
                            <span className="block font-medium">
                              {history?.action?.type}
                            </span>
                            <span className="subtitle">
                              {history?.date?.toDateString()}
                            </span>
                          </div>
                        </Stack>
                        <span>{history?.action?.description}</span>
                      </Stack>
                    ))}
                  </div>
                  <HorizontalRule className="mt-auto" />
                  <Button variant="basic" text="Seel All" className="mt-9" />
                </Box>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <div className="h-6"></div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
      <ProtectionActiveDialog
        protectedTokens={protectedTokens}
        setProtectedTokens={setProtectedTokens}
        dynamicVault={dynamicVault}
        dialogContent={dialogContent}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        testament={testament}
        setTestament={setTestament}
        setCanceled={setCanceled}
      />
    </>
  );
};

export default ProtectionsActive;
