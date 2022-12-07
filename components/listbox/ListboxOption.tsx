import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox as HeadlessListbox } from '@headlessui/react';
import clsx from 'clsx';

type Props = {
  className?: string;
  children?: string;
};

const ListboxOption = ({ className, children }: Props) => {
  return (
    <HeadlessListbox.Option
      className={({ active }) =>
        clsx(
          'relative cursor-default select-none py-2 pl-10 pr-4',
          active ? 'bg-purple-100/40 text-blue-dark' : 'text-gray-900',
          className
        )
      }
      value={children}
    >
      {({ selected }) => (
        <>
          <span
            className={`block truncate ${
              selected ? 'font-medium' : 'font-normal'
            }`}
          >
            {children}
          </span>
          {selected ? (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-dark">
              <FontAwesomeIcon icon={faCheck} size="lg" />
            </span>
          ) : null}
        </>
      )}
    </HeadlessListbox.Option>
  );
};

export default ListboxOption;
