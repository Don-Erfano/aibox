import clsx from 'clsx';
import { Check, MoreVertical } from 'lucide-react';
import { FC, HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../../popover';
import { Button } from '../../form';

const CardHeader: FC<
  PropsWithChildren<{
    hasMoreOptions?: boolean;
    filterLabel?: string;
    options?: { label: string; value: string }[];
    handleOptionClick?: (value: string) => void;
    selectedOption?: string;
  }>
> = ({
  children,
  hasMoreOptions,
  options,
  handleOptionClick,
  selectedOption,
  filterLabel,
}) => {
  return (
    <div
      className="flex items-start justify-between leading-10"
      aria-label="card-header"
    >
      <div className="relative">
        {children}
        <span className="absolute top-9 right-0 w-24 text-xs text-zinc-600">
          {filterLabel}
        </span>
      </div>
      {hasMoreOptions && (
        <Popover>
          <PopoverTrigger asChild>
            <Button size="icon" variant="ghost">
              <MoreVertical />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="flex w-[164px] flex-col px-0 py-1"
            align="end"
          >
            {options?.map((o, i) => (
              <p
                className={clsx(
                  'flex cursor-pointer items-center justify-between px-2 text-xs leading-9 font-normal text-zinc-700 hover:bg-gray-100',
                  {
                    'hover:bg-teal-600/25': selectedOption === o.value,
                  }
                )}
                onClick={() => handleOptionClick?.(o.value)}
                key={i}
              >
                {o.label}
                {selectedOption === o.value ? (
                  <Check className="text-teal-600" />
                ) : null}
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
        'flex w-full flex-col justify-between gap-10 rounded-xl p-6 shadow-[0px_4px_12px_0px_rgba(0,_0,_0,_0.20)]',
        className
      )}
    >
      {children}
    </div>
  );
};

type CardProps = {
  title?: ReactNode;
  className?: HTMLAttributes<HTMLDivElement>['className'];
  hasFooter?: true;
  clickHandler?: () => void;
  buttonLabel?: string;
  hasMoreOptions?: boolean;
  options?: { label: string; value: string }[];
  handleOptionClick?: (value: string) => void;
  loading?: boolean;
  selectedOption?: string;
  filterLabel?: string;
};

const Card: FC<PropsWithChildren<CardProps>> = ({
  children,
  hasFooter = false,
  title,
  className,
  hasMoreOptions,
  loading,
  options,
  handleOptionClick,
  selectedOption,
  filterLabel,
  ...props
}) => {
  return (
    <CardContainer className={className}>
      {title && (
        <CardHeader
          hasMoreOptions={hasMoreOptions}
          handleOptionClick={handleOptionClick}
          options={options}
          selectedOption={selectedOption}
          filterLabel={filterLabel}
        >
          {title}
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
      {hasFooter ? (
        <CardFooter>
          <Button
            variant="outline"
            size="full"
            onClick={props.clickHandler}
            loading={loading}
          >
            {props.buttonLabel}
          </Button>
        </CardFooter>
      ) : null}
    </CardContainer>
  );
};

export { Card, CardHeader, CardContainer, CardFooter, CardBody };
