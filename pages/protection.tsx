import clsx from 'clsx';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import List from 'components/list/List';
import ListItem from 'components/list/ListItem';
import ListItemIcon from 'components/list/ListItemIcon';
import ListItemText from 'components/list/ListItemText';
import PrimaryButton from 'components/PrimaryButton/PrimaryButton';
import Stack from 'components/stack/Stack';
import Stepper from 'components/Stepper/Stepper';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import menuItems from 'utils/menuItems';

const Protection: NextPage = () => {
  const router = useRouter();
  const [selectedSubItem, setSelectedSubItem] = useState<{
    title: string;
    route: string;
  }>();

  const steps = ['Select Plan', 'Customize Plan', 'Review Plan'];

  return (
    <div>
      <h2 className="h2 text-gradient inline-block pb-7">
        Time to protect our Wealth{' '}
        <span className="text-4xl" role="img" aria-label="peace hand sign">
          ✌️
        </span>
      </h2>
      <div className=" max-w-[1400px] rounded-xl bg-white px-32 py-9 drop-shadow-lg">
        <>
          <Stepper activeStep={0} steps={steps} className="mb-7" />
          <HorizontalRule />
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
          <List className="grid grid-cols-2 gap-x-14 gap-y-12">
            {Object.entries(menuItems.Protection.subMenu)?.map(
              ([, { icon, title, description, alt, route, comingSoon }]) => {
                return (
                  <React.Fragment key={title}>
                    <ListItem
                      classNameInnerDiv="!gap-2 !px-4"
                      onClick={() => setSelectedSubItem({ title, route })}
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
          <div className="mt-12 flex w-full justify-end">
            <PrimaryButton
              text={'Continue'}
              className={'!py-4 !px-14'}
              onClick={() => router.push(selectedSubItem?.route ?? '/')}
            />
          </div>
        </>
      </div>
    </div>
  );
};

export default Protection;
