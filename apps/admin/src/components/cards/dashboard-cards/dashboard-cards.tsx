import { Button } from '@aibox/ui';
import clsx from 'clsx';
import { FC, PropsWithChildren } from 'react';

const CardHeader: FC<PropsWithChildren> = ({ children }) => {
  return <div>{children}</div>;
};

const CardBody: FC<
  PropsWithChildren<{ className?: HTMLElement['className'] }>
> = ({ children, className }) => {
  return <div className={clsx('', className)}>{children}</div>;
};

const CardFooter: FC<
  PropsWithChildren<{ className?: HTMLElement['className'] }>
> = ({ children, className }) => {
  return <div className={clsx('w-full', className)}>{children}</div>;
};

const CardContainer: FC<
  PropsWithChildren<{ className?: HTMLElement['className'] }>
> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'shadow-[0px_4px_12px_0px_rgba(0,_0,_0,_0.20)] rounded-xl p-6 flex flex-col gap-10 w-full',
        className
      )}
    >
      {children}
    </div>
  );
};

type CardProps = { title?: string } & (
  | {
      hasFooter?: false;
    }
  | { hasFooter?: true; clickHandler: () => void; buttonLabel: string }
);

const Card: FC<PropsWithChildren<CardProps>> = ({
  children,
  hasFooter = false,
  title,
  ...props
}) => {
  return (
    <CardContainer>
      {title && <CardHeader>{title}</CardHeader>}
      <CardBody>{children}</CardBody>
      {hasFooter ? (
        <CardFooter>
          <Button variant="outline" size="default" onClick={props.clickHandler}>
            {props.buttonLabel}
          </Button>
        </CardFooter>
      ) : null}
    </CardContainer>
  );
};

export { Card, CardHeader, CardContainer, CardFooter, CardBody };
