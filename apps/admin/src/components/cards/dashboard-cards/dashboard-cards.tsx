import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

const CardHeader: FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

const CardBody: FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

const CardFooter: FC<
  PropsWithChildren<{ className?: HTMLElement['className'] }>
> = ({ children, className }) => {
  return <div className={clsx('', className)}>{children}</div>;
};

const CardContainer: FC<
  PropsWithChildren<{ className?: HTMLElement['className'] }>
> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'shadow-[0px_4px_12px_0px_rgba(0,_0,_0,_0.20)] rounded-xl p-6',
        className
      )}
    >
      {children}
    </div>
  );
};

const DashboardCard = {
  Body: CardBody,
  Footer: CardFooter,
  Header: CardHeader,
  Container: CardContainer,
};

export { DashboardCard };
