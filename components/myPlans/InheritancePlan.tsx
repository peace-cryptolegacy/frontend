import { faCircleCheck, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Box from 'components/Box/Box';
import Button from 'components/button/Button';
import Chip from 'components/Chip/Chip';
import CircleProgress from 'components/circleProgress/CircleProgress';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import Stack from 'components/stack/Stack';
import Image from 'next/image';
import Link from 'next/link';
import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  claimersSignatures: [number, number];
  // eslint-disable-next-line no-unused-vars
  updateDialogContent: (
    // eslint-disable-next-line no-unused-vars
    caller: 'Complete Multisig' | 'Inheritance Complete'
  ) => void;
  setActiveClaim: Dispatch<
    SetStateAction<'Inheritance Plan' | 'Backup Wallet' | undefined>
  >;
};

const InheritancePlan = ({
  claimersSignatures,
  updateDialogContent,
  setActiveClaim,
}: Props) => {
  return (
    <Box className="w-full">
      <Stack direction="row" className="justify-between">
        <Stack direction="row" className="gap-2">
          <div className="relative h-[96px] w-[86px] shrink-0">
            <Image
              src="/icons/inheritance-plan.png"
              alt="protection"
              objectFit="contain"
              layout="fill"
            />
          </div>
          <div className="space-y-2">
            <h5 className="h4">Inheritance Plan</h5>
            <span className="text-xs text-blue-gray-light">Active</span>
          </div>
        </Stack>
        <div className="space-y-2">
          <span className="text-xs text-blue-gray-light">Network</span>
          <Stack direction="row" className="gap-1">
            <span>LOGO</span>
            <span></span>
            <span>NETWORK</span>
          </Stack>
        </div>
      </Stack>
      <HorizontalRule />
      <Stack className="mt-10 !gap-10">
        <p>
          This Inheritance of Peace plan is the safe way to transfer the assets
          of a loved one who left you. If you are new to Web3, we recommend
          these{' '}
          <Link href={''}>
            <a className="text-purple-700">
              guides and tutorials in our Help Center
            </a>
          </Link>
          , before you begin the process of claiming your funds.
        </p>
        <Stack
          direction="row"
          className={clsx(
            'justify-between [&>div>span:first-of-type]:text-sm',
            '[&>div>span:first-of-type]:text-blue-gray [&>div:first-of-type]:!gap-2',
            '[&>div>span:nth-child(2)]:text-center'
          )}
        >
          <Stack>
            <span>Total Wealth</span>
            <span>$10,000</span>
          </Stack>
          <Stack>
            <div className="flex gap-1">
              <span className="text-sm text-blue-gray">
                Heir address wallet
              </span>
              <FontAwesomeIcon
                icon={faCircleInfo}
                onClick={() => {}}
                style={{ cursor: 'pointer' }}
              />
            </div>
            <span>0x47E...0d926</span>
          </Stack>
          <Stack>
            <span>NFTs</span>
            <span>0</span>
          </Stack>
          <Stack>
            <span>Tokens</span>
            <span>4</span>
          </Stack>
          <Button
            text={'View all'}
            variant="basic"
            className="rounded-md px-4 py-1.5 [&>span]:text-sm"
          />
        </Stack>
        <p>
          Unlock this inheritance plan and transfer the funds to the heirs
          completing the multisig process with the 3 Protectors.
        </p>
        <Stack direction="row" className="!items-start justify-between">
          <CircleProgress
            className="shrink-0"
            progress={(claimersSignatures[0] * 100) / claimersSignatures[1]}
          >
            <div className="relative h-[91px] w-[91px] shrink-0 ">
              <Image
                src="/icons/vault.png"
                alt="vault"
                layout="fill"
                objectFit="contain"
              />
            </div>
            <span className="text-sm">Multisig Protection</span>
            <span className="text-sm text-purple-900">3 Protectors</span>
          </CircleProgress>
          <div>
            <div>
              <span className="text-purple-900">
                {claimersSignatures[0] ?? '---'}/
                {claimersSignatures[1] ?? '---'} Protectors already sign!
              </span>
              <Stack direction="row" className="mt-4 flex-wrap">
                {[...Array(claimersSignatures[1])].map((_, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div className="relative">
                        <Box
                          gradient={i + 1 > claimersSignatures[0]}
                          className={clsx(
                            'flex h-[75px] w-[75px] items-center justify-center rounded-full drop-shadow-none',
                            '[&>div]:rounded-full [&>div]:p-0'
                          )}
                        >
                          <div
                            className={clsx(
                              'flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white'
                            )}
                          >
                            <div className="relative h-16 w-16 shrink-0 rounded-full">
                              <Image
                                src="/images/astronaut.png"
                                layout="fill"
                                alt="astronaut"
                              />
                            </div>
                          </div>
                        </Box>
                        {i + 1 > claimersSignatures[0] ? (
                          <div className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-gray-400"></div>
                        ) : (
                          <span className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-white">
                            <FontAwesomeIcon
                              icon={faCircleCheck}
                              size="xl"
                              style={{
                                color: '#009900',
                              }}
                            />
                          </span>
                        )}
                      </div>
                    </React.Fragment>
                  );
                })}
              </Stack>
            </div>
          </div>
          {claimersSignatures[0] === claimersSignatures[1] ? (
            <Chip variant="success" text="Approved" className="mt-12" />
          ) : (
            <Button
              text={'Complete Multisig'}
              variant={'basic'}
              size="sm"
              className="mt-12"
              disabled={claimersSignatures[0] === claimersSignatures[1]}
              onClick={() =>
                claimersSignatures[0] === claimersSignatures[1]
                  ? null
                  : updateDialogContent('Complete Multisig')
              }
            />
          )}
        </Stack>
        <Stack direction="row" className="justify-center">
          <Button
            text="Back"
            variant="gradientBorder"
            size="sm"
            className="!p-0.5"
            onClick={() => setActiveClaim(undefined)}
          />
          <Button
            disabled={claimersSignatures[0] !== claimersSignatures[1]}
            text="Claim Now"
            variant="fancy"
            size="sm"
            className="!p-1"
            onClick={() =>
              claimersSignatures[0] !== claimersSignatures[1]
                ? null
                : updateDialogContent('Inheritance Complete')
            }
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default InheritancePlan;
