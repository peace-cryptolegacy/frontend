import clsx from 'clsx';
import List from 'components/list/List';
import ListItem from 'components/list/ListItem';
import ListItemIcon from 'components/list/ListItemIcon';
import ListItemText from 'components/list/ListItemText';
import PrimaryButton from 'components/PrimaryButton/PrimaryButton';
import Stack from 'components/stack/Stack';

import { testamentInfoInitialValue } from 'mock/index';
import Image from 'next/image';
import React from 'react';
import { PlanSelection as MenuItemsPlanSelection } from 'utils/constants/PlanSelection';
import networkMappings from 'utils/helpers/networkMappings';
import wagmiChainNameMappings from 'utils/helpers/wagmiChainNameMappings';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';
import menuItems from 'utils/menuItems';
import { useNetwork } from 'wagmi';

interface Props {
  stepperClassName?: string;
  renderStepper: Function;
  onNextStep: Function;
}

const PlanSelection = ({
  stepperClassName,
  renderStepper,
  onNextStep,
}: Props) => {
  const { chain } = useNetwork();
  const { item: testamentInfo, saveItem: setTestamentInfo } = useLocalStorage(
    'TESTAMENT_INFO',
    testamentInfoInitialValue
  );

  const networkName =
    wagmiChainNameMappings[chain?.name as keyof typeof wagmiChainNameMappings];

  const networkMapping =
    networkMappings[networkName as keyof typeof networkMappings];

  async function handleClick() {
    if (testamentInfo.selectedPlan === MenuItemsPlanSelection.INHERITANCE) {
      onNextStep();
    }
  }

  return (
    <>
      <div className={`${stepperClassName || ''}`}>
        {renderStepper()}
        <Stack direction="row" className="mt-8 hidden !gap-9 lg:flex">
          <span className="inline">Select your Network</span>
          <Stack direction="row">
            <Image
              src={networkMapping?.route ?? '/'}
              width={40}
              height={40}
              alt={chain?.name}
            />
            <span className="capitalize">{networkName}</span>
          </Stack>
        </Stack>
        <span className="my-7 inline-block text-sm lg:my-11 lg:text-base">
          Select the protection for your Assets
        </span>
        <List className="grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-2">
          {Object.entries(menuItems.Protection.subMenu)?.map(
            ([, { icon, title, description, alt, comingSoon, planId }]) => {
              return (
                <React.Fragment key={title}>
                  <ListItem
                    isSelected={testamentInfo.selectedPlan === planId}
                    classNameInnerDiv="!gap-2 !px-4"
                    onClick={() => {
                      setTestamentInfo({
                        ...testamentInfo,
                        selectedPlan: planId,
                      });
                    }}
                    className={clsx(
                      testamentInfo.selectedPlan !== planId &&
                        '!gap-2 rounded-3xl border-2 border-gray-200 px-5 py-3',
                      'relative cursor-pointer'
                    )}
                  >
                    <ListItemIcon className="h-14 w-14 shrink-0 lg:h-16 lg:w-16 xl:h-24 xl:w-24">
                      <Image
                        src={icon}
                        width={96}
                        height={96}
                        objectFit="contain"
                        alt={alt}
                      />
                    </ListItemIcon>
                    <ListItemText
                      title={title}
                      description={description}
                      className="!gap-2"
                    />
                    {comingSoon && (
                      <div
                        className={clsx(
                          'absolute top-[-18px] right-3 rounded-lg bg-black py-2.5 px-6 text-[8px]',
                          'font-bold text-white'
                        )}
                      >
                        Coming Soon
                      </div>
                    )}
                  </ListItem>
                </React.Fragment>
              );
            }
          ) ?? ''}
        </List>
        <div className="mt-12 flex w-full justify-center">
          <PrimaryButton
            text={'Continue'}
            disabled={
              testamentInfo.selectedPlan !== MenuItemsPlanSelection.INHERITANCE
            }
            className={'!py-2 !px-10 lg:!py-4 lg:!px-14'}
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
};

export default PlanSelection;
