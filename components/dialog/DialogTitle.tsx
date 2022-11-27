import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@headlessui/react';
import clsx from 'clsx';

type Props = {
  onClose?: () => void;
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
};

const DialogTitle = ({ onClose, className, children }: Props) => {
  const renderTitle = () => {
    if (onClose) {
      return (
        <>
          <div className="mb-4 flex w-full justify-end">
            <FontAwesomeIcon
              icon={faXmark}
              size="2xl"
              style={{ cursor: 'pointer' }}
              onClick={() => onClose()}
            />
          </div>
          {children && (
            <Dialog.Title as="h3" className="h3 text-center">
              {children}
            </Dialog.Title>
          )}
        </>
      );
    }
    return children ? (
      <Dialog.Title as="h3" className={(clsx('h3 text-center'), className)}>
        {children}
      </Dialog.Title>
    ) : (
      <></>
    );
  };

  return renderTitle();
};

export default DialogTitle;
