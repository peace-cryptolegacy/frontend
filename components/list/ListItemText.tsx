import clsx from 'clsx';
import Stack from 'components/stack/Stack';
import Link from 'next/link';
import React from 'react';

type Props = {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  link?: boolean;
  linkHref?: string;
};

const ListItemText = ({
  title,
  titleClassName,
  descriptionClassName,
  description,
  children,
  link,
  linkHref,
  className,
}: Props) => {
  return (
    <Stack className={clsx(className)}>
      {link ? (
        <Link href={linkHref ?? '/'}>
          <div>
            <span className={clsx('h4', titleClassName)}>{title}</span>
            <p className={clsx('text-xs', descriptionClassName)}>
              {description}
            </p>
            {children}
          </div>
        </Link>
      ) : (
        <>
          <span className={clsx('h4', titleClassName)}>{title}</span>
          <p className={clsx('text-xs', descriptionClassName)}>{description}</p>
          {children}
        </>
      )}
    </Stack>
  );
};

export default ListItemText;
