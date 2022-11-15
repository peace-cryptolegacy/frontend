import clsx from 'clsx';
import List from 'components/list/List';
import ListItem from 'components/list/ListItem';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  tabs: string[];
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  className?: string;
  underline?: boolean;
};

const Tabs = ({
  tabs,
  value,
  setValue,
  className,
  underline = true,
}: Props) => {
  const handleTabChange = (key: number) => setValue(key);

  return (
    <List
      className={clsx(
        'flex !gap-8 capitalize child:cursor-pointer child:text-blue-gray-light',
        className
      )}
    >
      {tabs.map((tab, key) => {
        if (value === key) {
          return (
            <ListItem
              key={tab}
              className="relative block"
              onClick={() => handleTabChange(key)}
            >
              <span className="text-gradient">{tab}</span>
              {underline && (
                <div className="absolute mt-3 h-[3px] w-full bg-mainHorizontal"></div>
              )}
            </ListItem>
          );
        }
        return (
          <ListItem key={tab} onClick={() => handleTabChange(key)}>
            {tab}
          </ListItem>
        );
      })}
    </List>
  );
};

export default Tabs;
