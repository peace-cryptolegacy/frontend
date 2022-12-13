import { faCopy } from '@fortawesome/free-regular-svg-icons';
import {
  faCircleInfo,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import clsx from 'clsx';
import Box from 'components/Box/Box';
import Button from 'components/button/Button';
import Chip from 'components/Chip/Chip';
import Stack from 'components/stack/Stack';
import Image from 'next/image';
import tokenSymbolsMappings from 'utils/helpers/tokenMappings';
import CircleProgress from '../circleProgress/CircleProgress';

const History = () => {
  const testament = {
    succeedTimestamp: 0,
    assets: {
      moonbeam: { balance: 40 },
      ether: { balance: 20 },
      matic: { balance: 200 },
      bitcoin: { balance: 3 },
    },
  };

  return (
    <Box className="flex flex-col gap-10">
      <Stack direction="row" className="flex justify-between">
        <Stack direction="row" className="!gap-2">
          <div className="relative h-11 w-11 shrink-0">
            <Image
              src="/icons/inheritance-plan.png"
              alt="inheritance plan"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <span>Inheritance Plan</span>
        </Stack>
        <div>
          <Chip variant="success" text="Claimed" />
        </div>
      </Stack>
      <Stack direction="row" className="!items-start !gap-10">
        <CircleProgress progress={100} className="!w-32 shrink-0">
          <div className="relative h-[83px] w-[83px]">
            <Image
              src="/icons/inheritanceComplete.png"
              alt="inheritance complete"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </CircleProgress>
        <Stack className="mt-3 text-sm text-blue-gray">
          <Stack direction="row" className="!gap-2">
            <span>
              Transaction Hash:{' '}
              <span className="text-black underline">0x6c416170db7468</span>
            </span>
            <FontAwesomeIcon icon={faCopy} style={{ cursor: 'pointer' }} />
            <FontAwesomeIcon
              icon={faUpRightFromSquare}
              style={{ cursor: 'pointer' }}
            />
          </Stack>
          <span>
            Executed: <span className="text-black">3 Nov, 2022 - 8:16 PM</span>
          </span>
          <span>
            Network: <span className="text-black">Moonbase</span>
          </span>
        </Stack>
      </Stack>
      <div
        className={clsx(
          'grid grid-cols-13 text-blue-gray [&>div>span:first-of-type]:mb-3 [&>div>span:first-of-type]:block',
          '[&>div>span:first-of-type]:text-sm [&>div>span:last-of-type]:text-black'
        )}
      >
        <div className="col-span-3">
          <span>Transfer Wealth</span>
          <span>$10,000</span>
        </div>
        <div className="col-span-4">
          <div className="flex gap-2">
            <span className="mb-3 text-sm">Heir address wallet</span>
            <FontAwesomeIcon
              icon={faCircleInfo}
              onClick={() => {}}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <span className="!mb-0">0x47E...0d926</span>
        </div>
        <div className="col-span-2">
          <span>NFTs</span>
          <span>0</span>
        </div>
        <div className="col-span-2">
          <span>Tokens</span>
          <span>4</span>
        </div>
        <div className="col-span-2">
          <Button variant="basic" text="View all" className="!px-4 !py-2" />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-13 [&>span]:text-sm [&>span]:text-blue-gray">
          <span className="col-span-3">Assets</span>
          <span className="col-span-4">Price</span>
          <span className="col-span-2">Balance</span>
          <span className="col-span-2">Value</span>
          <span className="col-span-2"></span>
        </div>
        {Object.entries(testament.assets).map((asset) => {
          const assetName = Object.values(asset)[0] as string;
          const assetMapping =
            tokenSymbolsMappings[
              assetName as keyof typeof tokenSymbolsMappings
            ];
          return (
            <div
              key={assetName}
              className="mt-6 grid grid-cols-13 [&>span]:text-sm [&>span]:text-blue-gray"
            >
              <Stack direction="row" className="col-span-3">
                <div className="relative h-8 w-8">
                  {assetMapping.route && (
                    <Image
                      src={assetMapping.route}
                      alt={assetName}
                      layout="fill"
                      objectFit="contain"
                    />
                  )}
                </div>
                <span className="capitalize">{assetName}</span>
              </Stack>
              <span className="col-span-4">$0.5</span>
              <span className="col-span-2">40 {assetMapping.symbol}</span>
              <span className="col-span-2">${asset[1].balance * 100}</span>
              <span className="col-span-2"></span>
            </div>
          );
        })}
      </div>
    </Box>
  );
};

export default History;
