import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
import Image from 'next/image';
import tokenMappings from '../../../utils/helpers/tokenMappings';

const ActiveProtections = () => {
  const network = 'moonbeam';
  const tokenMapping = tokenMappings[network as keyof typeof tokenMappings];

  const testamentHistory = [
    {
      action: {
        type: 'Edited',
        description: '2 Beneficiaries Added',
      },
      // new date now
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
                          src={tokenMapping ? tokenMapping.route : ''}
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
                        <span className="block">0</span>
                      </div>
                      <div>
                        <span>Collectibles</span>
                        <span>0</span>
                      </div>
                      <div className="self-end">
                        <Button
                          variant="basic"
                          text="Edit Assets"
                          onClick={() => {}}
                          size="xs"
                          className="whitespace-nowrap py-1.5 text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="text-sm text-blue-gray">Protectors</span>
                      <div className="flex justify-between">
                        <span>2 Beneficiaries</span>
                        <div className="self-end">
                          <Button
                            variant="basic"
                            text="Edit Heirs"
                            onClick={() => {}}
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
                          <span className="font-semibold">60</span> of 365 days
                        </span>
                      </div>
                      <div>
                        <Button
                          variant="basic"
                          text="Edit Time"
                          onClick={() => {}}
                          size="xs"
                          className="whitespace-nowrap py-1.5 text-sm"
                        />
                      </div>
                    </div>
                    <PercentageBar
                      percentage={30}
                      className="[&>div>div:nth-child(2)]:!bg-mainHorizontal"
                    />
                  </div>
                  <Button
                    variant="fancy"
                    text="Verify Life"
                    className="mt-10 w-full"
                    onClick={() => {}}
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
                        <span>{history.action.description}</span>
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
    </>
  );
};

export default ActiveProtections;
