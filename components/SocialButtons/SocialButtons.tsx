import clsx from 'clsx';
import List from 'components/list/List';
import ListItem from 'components/list/ListItem';
import Image from 'next/image';

type Props = {
  socialIcons: {
    route: string;
    alt: string;
    width?: number;
    height?: number;
  }[];
  className?: string;
};

const SocialButtons = ({ className, socialIcons }: Props) => {
  return (
    <List className={clsx(className, 'flex gap-4')}>
      {socialIcons.map(({ route, alt, width, height }) => {
        return (
          <ListItem
            key={route}
            className="cursor-pointer !gap-2 rounded-xl bg-purple-900 p-1 px-3"
          >
            <Image
              src={route}
              width={width ?? 18}
              height={height ?? 18}
              alt={alt}
              objectFit="contain"
            />
            <span className="text-white">Add</span>
          </ListItem>
        );
      })}
    </List>
  );
};

export default SocialButtons;
