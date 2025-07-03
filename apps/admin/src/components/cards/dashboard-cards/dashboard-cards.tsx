import { Button, Popover, PopoverContent, PopoverTrigger } from '@aibox/ui';
import clsx from 'clsx';
import { MoreVertical } from 'lucide-react';
import { FC, HTMLAttributes, PropsWithChildren } from 'react';

const CardHeader: FC<
  PropsWithChildren<{
    hasMoreOpt?: boolean;
    opt?: { label: string; value: string }[];
    handleOptClick?: (value: string) => void;
  }>
> = ({ children, hasMoreOpt, opt, handleOptClick }) => {
  return (
    <div className="flex justify-between items-start">
      {children}
      {hasMoreOpt && (
        <Popover>
          <PopoverTrigger>
            <Button size="icon" variant="ghost">
              <MoreVertical />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            {opt?.map((o, i) => (
              <p
                className="px-2 text-zinc-700"
                onClick={() => handleOptClick?.(o.value)}
                key={i}
              >
                {o.label}
              </p>
            ))}
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
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
        'shadow-[0px_4px_12px_0px_rgba(0,_0,_0,_0.20)] rounded-xl p-6 flex flex-col gap-10 w-full justify-between',
        className
      )}
    >
      {children}
    </div>
  );
};

type CardProps = {
  title?: string;
  className?: HTMLAttributes<HTMLDivElement>['className'];
  hasFooter?: true;
  clickHandler?: () => void;
  buttonLabel?: string;
  hasMoreOpt?: boolean;
  opt?: { label: string; value: string }[];
  handleOptClick?: (value: string) => void;
};

const Card: FC<PropsWithChildren<CardProps>> = ({
  children,
  hasFooter = false,
  title,
  className,
  hasMoreOpt,
  opt,
  handleOptClick,
  ...props
}) => {
  return (
    <CardContainer className={className}>
      {title && (
        <CardHeader
          hasMoreOpt={hasMoreOpt}
          handleOptClick={handleOptClick}
          opt={opt}
        >
          {title}
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
      {hasFooter ? (
        <CardFooter>
          <Button variant="outline" size="full" onClick={props.clickHandler}>
            {props.buttonLabel}
          </Button>
        </CardFooter>
      ) : null}
    </CardContainer>
  );
};

export { Card, CardHeader, CardContainer, CardFooter, CardBody };
