import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Listbox as HeadlessListbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, {
  Children,
  cloneElement,
  Fragment,
  ReactElement,
  useMemo,
  useState,
} from 'react';

type Props = {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
};

const Listbox = ({ children, className }: Props) => {
  const items = useMemo(
    () =>
      Children.map(children as ReactElement[], (child: ReactElement) =>
        cloneElement(child)
      ),
    [children]
  );

  const [selected, setSelected] = useState(
    (Children.toArray(children)[0] as JSX.Element).props.children
  );

  return (
    <div className={clsx('w-72', className)}>
      <HeadlessListbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <HeadlessListbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <FontAwesomeIcon icon={faChevronDown} size="lg" />
            </span>
          </HeadlessListbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <HeadlessListbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {items}
            </HeadlessListbox.Options>
          </Transition>
        </div>
      </HeadlessListbox>
    </div>
  );
};

export default Listbox;
