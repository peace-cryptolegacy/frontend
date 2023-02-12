import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import List from 'components/list/List';
import ListItem from 'components/list/ListItem';
import ListItemIcon from 'components/list/ListItemIcon';
import PeaceLogo from 'components/PeaceLogo/PeaceLogo';
import Section from 'components/Section/Section';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import menuItems from 'utils/menuItems';
import socialItems from 'utils/socialItems';

const Menu: FC = () => {
  const router = useRouter();

  return (
    <>
      <menu className="fixed inset-0 z-10 hidden h-screen max-w-[250px] flex-col items-center rounded-r-3xl bg-white lg:flex">
        <PeaceLogo className="flex py-10" />
        <div className="mb-20 w-full px-8">
          <HorizontalRule />
        </div>

        <div className="flex h-full w-full">
          <List className="flex h-full w-full flex-col space-y-14">
            {Object.entries(menuItems).map(
              ([, { title, icon, route, alt }], key) => {
                return (
                  <ListItem
                    key={key}
                    className={clsx(
                      key === Object.keys(menuItems).length - 1 &&
                        '!mt-auto pb-10',
                      router.route === route && 'relative w-full',
                      'pl-12 pr-4'
                    )}
                  >
                    <Section
                      className="cursor-pointer gap-10"
                      onClick={() => router.push(route)}
                    >
                      {/* Do not remove the onClick event. It is used to
                       propagate the parent's onClick event */}
                      <ListItemIcon onClick={() => {}}>
                        <Image src={icon} alt={alt} width={24} height={23} />
                      </ListItemIcon>
                      <span
                        className={clsx('h4', {
                          'text-gray-500': router.route !== route,
                        })}
                      >
                        {title}
                      </span>
                    </Section>
                    <div
                      className={clsx(
                        router.route !== route && 'hidden',
                        'absolute right-0 h-8 w-[5px] rounded-xl bg-mainVertical'
                      )}
                    ></div>
                  </ListItem>
                );
              }
            )}
          </List>
        </div>

        <div className="w-full px-8">
          <HorizontalRule />
        </div>
        <Section className="my-7 w-full justify-evenly">
          {Object.entries(socialItems).map(([key, { alt, link }]) => (
            <FontAwesomeIcon
              key={key}
              icon={['fab', alt as IconName]}
              size="lg"
              onClick={() => (link === '' ? null : window.open(link, '_blank'))}
              className="cursor-pointer"
            />
          ))}
        </Section>
      </menu>

      <menu className="fixed inset-x-0 bottom-0 z-50 h-full max-h-[80px] rounded-2xl rounded-b-none border-t-2 bg-gray-peace text-center text-3xl text-white sm:block lg:hidden">
        <List className="mt-4 flex flex-row justify-around">
          {Object.entries(menuItems).map(
            ([, { title, icon, route, alt }], key) => {
              return (
                <ListItem
                  key={key}
                  className={clsx(
                    key === Object.keys(menuItems).length - 1 && 'hidden',
                    router.route === route && 'relative',
                    'cursor-pointer '
                  )}
                >
                  <Section
                    className="flex flex-col gap-3"
                    onClick={() => router.push(route)}
                  >
                    {/* Do not remove the onClick event. It is used to 
                    propagate the parent's onClick event */}
                    <ListItemIcon onClick={() => {}}>
                      <Image src={icon} alt={alt} width={24} height={24} />
                    </ListItemIcon>
                    <span
                      className={clsx('h4 hidden mobile-lg:inline', {
                        'text-gray-500': router.route !== route,
                      })}
                    >
                      {title}
                    </span>
                    <span
                      className={clsx('h5 mobile-lg:hidden ', {
                        'text-gray-500': router.route !== route,
                      })}
                    >
                      {title}
                    </span>
                  </Section>
                  <div
                    className={clsx(
                      router.route !== route && 'hidden',
                      'absolute -top-4 mb-16 h-2 w-14 rounded-b-xl bg-mainHorizontal'
                    )}
                  ></div>
                </ListItem>
              );
            }
          )}
        </List>
      </menu>
    </>
  );
};

export default Menu;
