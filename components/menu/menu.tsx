import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import HorizontalRule from 'components/horizontal-rule/HorizontalRule';
import List from 'components/list/List';
import ListItem from 'components/list/ListItem';
import ListItemIcon from 'components/list/ListItemIcon';
import Section from 'components/Section/Section';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';
import menuItems from 'utils/menuItems';
import socialItems from 'utils/socialItems';
import logo from '../../public/logos/logo.png';

const Menu: FC = () => {
  const router = useRouter();

  return (
    <menu className="fixed top-0 z-10 flex  h-screen min-w-[250px] flex-col items-center rounded-r-3xl bg-white">
      <div className="flex py-10">
        <Link href="/">
          <Image
            src={logo}
            alt="Peace Logo"
            width={156}
            height={42}
            objectFit="contain"
            className="cursor-pointer"
          />
        </Link>
      </div>
      <div className="mb-20 w-full px-8">
        <HorizontalRule />
      </div>

      <div className="flex h-full w-full">
        <List className="flex h-full w-full flex-col space-y-14">
          {menuItems.map(({ title, icon, route, alt }, key) => {
            return (
              <ListItem
                key={key}
                className={clsx(
                  key === menuItems.length - 1 && '!mt-auto pb-10',
                  router.route === route && 'relative w-full',
                  'cursor-pointer pl-12 pr-4'
                )}
              >
                <Section className="gap-10">
                  <ListItemIcon>
                    <Image src={icon} alt={alt} width={24} height={23} />
                  </ListItemIcon>
                  <Link href={route}>
                    <span
                      className={clsx('h4', {
                        'text-gray-500': router.route !== route,
                      })}
                    >
                      {title}
                    </span>
                  </Link>
                </Section>
                <div
                  className={clsx(
                    router.route !== route && 'hidden',
                    'absolute right-0 h-8 w-[5px] rounded-l-xl bg-mainVertical'
                  )}
                ></div>
              </ListItem>
            );
          })}
        </List>
      </div>

      <div className="w-full px-8">
        <HorizontalRule />
      </div>
      <Section className="my-7 w-full justify-evenly">
        {Object.entries(socialItems).map(([key, { alt }]) => (
          <FontAwesomeIcon key={key} icon={['fab', alt]} size="lg" />
        ))}
      </Section>
    </menu>
  );
};

export default Menu;
