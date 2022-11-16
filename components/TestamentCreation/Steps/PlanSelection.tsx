import clsx from 'clsx';
import List from 'components/list/List';
import ListItem from 'components/list/ListItem';
import ListItemIcon from 'components/list/ListItemIcon';
import ListItemText from 'components/list/ListItemText';
import PrimaryButton from 'components/PrimaryButton/PrimaryButton';
import Stack from 'components/stack/Stack';

import Image from 'next/image';
// import { useRouter } from 'next/router';
import React, { useState } from 'react';
import menuItems from 'utils/menuItems';
import { initialValue } from 'mock/index';
import { useLocalStorage } from 'utils/hooks/useLocalStorage';

interface Props {
  stepperClassName?: string;
  renderStepper: Function;
  onNextStep: Function;
}

const Protection = ({ stepperClassName, renderStepper, onNextStep }: Props) => {
  const { item: userData, saveItem: setUserData } = useLocalStorage(
    'TESTAMENT_INFO',
    initialValue
  );

  // const router = useRouter();
  const [selectedSubItem, setSelectedSubItem] = useState<{
    title: string;
    route: string;
  }>();

  // const steps = ['Select Plan', 'Customize Plan', 'Review Plan'];

  async function handleClick() {
    onNextStep();
  }

  return (
    <>
      <div className={`${stepperClassName || ''}`}>
        {renderStepper()}
        <Stack direction="row" className="my-8 !gap-9">
          <span className="inline">Select your Network</span>
          <Stack direction="row">
            <Image
              src="/logos/moonbeam-black.png"
              width={40}
              height={40}
              alt="moonbeam"
            />
            <span>Moonbase</span>
          </Stack>
        </Stack>
        <span className="mb-11 inline-block">
          Select the protection for your Assets
        </span>
        <List className="grid grid-cols-1 gap-x-14 gap-y-12 2xl:grid-cols-2">
          {menuItems[0].subMenu?.map(
            ({ icon, title, description, alt, route, comingSoon, planId }) => {
              return (
                <React.Fragment key={title}>
                  <ListItem
                    isSelected={selectedSubItem?.title === title}
                    classNameInnerDiv="!gap-2 !px-4"
                    onClick={() => {
                      setUserData({
                        ...userData,
                        selectedPlan: planId,
                      });
                      setSelectedSubItem({ title, route });
                    }}
                    className={clsx(
                      selectedSubItem?.title !== title &&
                        '!gap-2 rounded-3xl border-2 border-gray-200 px-5 py-3',
                      'relative cursor-pointer'
                    )}
                  >
                    <ListItemIcon className="h-24 w-24 shrink-0">
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
            className={'!py-4 !px-14'}
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
};

export default Protection;
