'use client';

import Image from 'next/image';
import { forwardRef, useImperativeHandle } from 'react';
import clsx from 'clsx';
import { IAutocompleteProps, ISelectAutoRef } from './interface';
import { ClickAwayListener } from './custom-click-away';
import { CheckIcon, ChevronDownIcon, LoaderCircle, X } from 'lucide-react';
import { Portal } from './portal';
import { useAutocompleteLogic } from './hooks/useAutocompleteLogic/useAutocompleteLogic';
import { DeleteIcon } from '../../icons';

const AibAutocomplete = forwardRef<ISelectAutoRef, IAutocompleteProps>(
  (
    {
      options,
      onSelect,
      mode,
      variant,
      value,
      onChange: propOnChange,
      disabled,
      readOnly,
      placeholder,
      tagAdornment,
      limited_tag,
      isLoading = false,
      h_size = 'sm',
      name,
      id,
      error,
      ...rest
    },
    ref
  ) => {
    const {
      inputValue,
      selectedOptions,
      isOpen,
      offsets,
      highlightedId,
      extraCount,
      visibleTags,
      sizeClass,
      atLimit,
      removeDisabled,
      inputDisabled,
      grouped,
      handlers,
      refs,
    } = useAutocompleteLogic({
      options,
      onSelect,
      mode,
      variant,
      value,
      onChange: propOnChange,
      disabled,
      readOnly,
      limited_tag,
      isLoading,
      h_size,
    });

    useImperativeHandle(ref, () => ({
      focus: () => {
        refs.inputRef.current?.focus();
      },
    }));

    const showSingleValue =
      variant === 'single' &&
      selectedOptions.length > 0 &&
      !isOpen &&
      !inputValue;
    const singleSelectedOption = selectedOptions[0];

    return (
      <>
        {variant === 'multiple' && (
          <div
            ref={refs.measureRef}
            style={{
              position: 'fixed',
              top: -9999,
              left: -9999,
              width: offsets.width,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              padding: '0.5rem',
              visibility: 'hidden',
              pointerEvents: 'none',
            }}
          >
            {selectedOptions.map((opt) => (
              <div
                key={opt.id}
                className={clsx(
                  'flex items-center rounded-lg px-2 text-sm outline-1 outline-gray-400',
                  {
                    'space-x-2': !disabled && !readOnly,
                  }
                )}
              >
                {tagAdornment && <span>{tagAdornment}</span>}
                <span>{opt.label}</span>
              </div>
            ))}
            <div
              key="__dummy_more__"
              className="flex items-center space-x-2 rounded-lg px-2 text-sm outline-1 outline-gray-400"
            >
              +{selectedOptions.length} more
            </div>
          </div>
        )}

        <ClickAwayListener
          onClickAway={() => {
            if (refs.ignoreClickAwayRef.current) {
              refs.ignoreClickAwayRef.current = false;
              return;
            }
            handlers.setIsOpen(false);
          }}
        >
          <div
            className={clsx(
              'flex w-full flex-col rounded-[4px] outline-1',
              atLimit ? 'outline-red-500' : 'outline-gray-500',
              {
                'hover:outline-zinc-600': !readOnly && !disabled,
                'outline-gray-400 outline-dashed': readOnly,
                '!outline-red-600': error,
                'text-gray-400 !outline-gray-400': disabled,
              }
            )}
          >
            <div
              ref={refs.inputRef}
              className={clsx('flex w-full rounded-2xl bg-white', sizeClass, {
                'rounded-b-none': isOpen,
              })}
            >
              <div className="flex flex-grow flex-wrap items-center gap-2 px-2">
                {variant === 'multiple' &&
                  visibleTags.map((opt) => (
                    <div
                      key={opt.id}
                      className={clsx(
                        'flex h-6 items-center rounded-lg px-2 text-xs outline-1 outline-gray-400',
                        {
                          'bg-black-100/50':
                            opt.id !== highlightedId && mode === 'light',
                          'outline-red-600':
                            opt.id === highlightedId && mode === 'light',
                          'space-x-2': !disabled && !readOnly,
                        }
                      )}
                    >
                      {tagAdornment && <span>{tagAdornment}</span>}
                      <span
                        className={clsx('text-xs font-normal', {
                          'text-zinc-600': opt.id !== highlightedId,
                          'text-red-600': opt.id === highlightedId,
                          '!text-gray-500': disabled,
                        })}
                      >
                        {opt.label}
                      </span>
                      {!readOnly && (
                        <button
                          onClick={() =>
                            !removeDisabled && handlers.removeOption(opt)
                          }
                          disabled={removeDisabled}
                          aria-label={`Remove ${opt.label}`}
                        >
                          <DeleteIcon
                            className={clsx(
                              'size-5 text-xs hover:text-red-600',
                              {
                                'text-zinc-600': opt.id !== highlightedId,
                                'text-red-600': opt.id === highlightedId,
                                'hidden text-gray-400': removeDisabled,
                                'cursor-pointer': !removeDisabled,
                              }
                            )}
                          />
                        </button>
                      )}
                    </div>
                  ))}
                {extraCount > 0 && (
                  <div className="flex items-center space-x-2 rounded-lg px-2 py-1 text-xs font-normal text-gray-500">
                    +{extraCount} مورد
                  </div>
                )}

                {showSingleValue && singleSelectedOption && (
                  <div className="flex flex-grow items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {singleSelectedOption.startAdornment && (
                        <Image
                          src={singleSelectedOption.startAdornment}
                          alt=""
                          className="h-4 max-w-6 rounded-sm object-cover"
                        />
                      )}
                      <span
                        className={clsx('text-sm', {
                          'text-gray-500': readOnly || disabled,
                          'text-zinc-800': !readOnly && !disabled && !error,
                          'text-red-600': error,
                        })}
                      >
                        {singleSelectedOption.label}
                      </span>
                    </div>
                    {!readOnly && !disabled && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlers.removeOption(singleSelectedOption);
                        }}
                        className="ml-2 text-gray-400 hover:text-gray-600"
                        aria-label="Clear selection"
                      >
                        <X
                          className={clsx('h-4 w-4', {
                            'text-red-600': error,
                          })}
                        />
                      </button>
                    )}
                  </div>
                )}

                {(variant === 'multiple' || !showSingleValue) && (
                  <input
                    type="text"
                    name={name}
                    id={id}
                    value={inputValue}
                    onChange={handlers.onInputChange}
                    onKeyDown={handlers.onKeyDown}
                    onFocus={() =>
                      !disabled && !readOnly && handlers.setIsOpen(true)
                    }
                    disabled={disabled}
                    readOnly={readOnly}
                    placeholder={readOnly ? '' : placeholder}
                    className={clsx(
                      'flex-grow bg-transparent text-sm text-zinc-800 outline-none',
                      {
                        'cursor-default text-gray-500 placeholder:text-transparent':
                          readOnly,
                        '!text-gray-500': disabled,
                      },
                      'placeholder:text-xs placeholder:font-normal placeholder:text-gray-400',
                      'disabled:text-gray-400 disabled:placeholder:text-gray-400',
                      {
                        '!text-red-600 placeholder:text-red-600 focus:!text-zinc-800':
                          error,
                      }
                    )}
                    {...rest}
                  />
                )}
              </div>

              <div
                onClick={handlers.toggleOpen}
                className={clsx(
                  'flex min-h-[30px] min-w-[30px] items-center justify-end',
                  {
                    'text-gray-400': disabled,
                    'cursor-pointer': !disabled,
                  }
                )}
              >
                {isLoading && (
                  <LoaderCircle className="animate-spin text-gray-500" />
                )}
                <span
                  className={clsx(
                    'ml-2 transform text-zinc-600 transition duration-300',
                    { 'rotate-0': !isOpen, 'rotate-180': isOpen }
                  )}
                >
                  <ChevronDownIcon
                    className={clsx({
                      'text-gray-400': disabled || readOnly,
                      'text-red-600': error,
                      'cursor-default': readOnly,
                    })}
                  />
                </span>
              </div>
            </div>
          </div>
        </ClickAwayListener>

        {isOpen && (
          <Portal>
            <div
              ref={refs.portalRef}
              className={clsx(
                'pointer-events-auto fixed z-[10000] rounded-lg bg-white shadow-lg',
                'max-h-[200px] overflow-y-auto',
                // Firefox
                '[scrollbar-width:thin]',
                '[scrollbar-color:rgba(0,0,0,0.2)_transparent]',
                // WebKit
                '[&::-webkit-scrollbar]:w-[2px]',
                '[&::-webkit-scrollbar-track]:bg-transparent',
                '[&::-webkit-scrollbar-thumb]:bg-[rgba(0,0,0,0.2)]',
                '[&::-webkit-scrollbar-thumb]:rounded-[8px]'
              )}
              style={{
                left: offsets.left - 2,
                top: offsets.top,
                width: offsets.width + 4,
              }}
            >
              {isLoading ? (
                <div className="px-4 py-2 text-center text-xs text-zinc-600">
                  در حال دریافت اطلاعات...
                </div>
              ) : grouped.size === 0 ? (
                <div className="px-4 py-2 text-center text-xs text-zinc-600">
                  نتیجه‌ای یافت نشد
                </div>
              ) : (
                Array.from(grouped.entries()).map(([grp, opts]) => (
                  <div
                    key={grp || '__ungrouped__'}
                    className="pointer-events-auto relative z-[10000]"
                  >
                    {grp && (
                      <div className="border-b border-gray-200 px-4 py-2 text-xs font-normal text-zinc-700">
                        {grp}
                      </div>
                    )}
                    {opts.map((opt) => {
                      const isSel = selectedOptions.some(
                        (x) => x.id === opt.id
                      );
                      const disableOpt =
                        (variant === 'multiple' && atLimit && !isSel) ||
                        opt.disabled;
                      return (
                        <div
                          key={opt.id}
                          onClick={() =>
                            !disableOpt && handlers.pickOption(opt)
                          }
                          className={clsx(
                            'pointer-events-auto flex h-10 w-full cursor-pointer justify-between px-4 py-2 text-sm last:rounded-b-lg',
                            {
                              'text-teal-600 hover:bg-teal-600/25':
                                isSel && mode === 'light',
                              'font-normal text-black hover:bg-gray-100':
                                !isSel && mode === 'light',
                              'pointer-events-none cursor-not-allowed opacity-50':
                                disableOpt,
                            }
                          )}
                        >
                          <div className="flex items-center space-x-2 pr-2">
                            {opt.startAdornment && (
                              <Image
                                src={opt.startAdornment}
                                alt=""
                                className="h-4 max-w-6 rounded-sm object-cover"
                              />
                            )}
                            <span>{opt.label}</span>
                          </div>
                          {isSel && (
                            <CheckIcon className="size-5 text-teal-600" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
          </Portal>
        )}
      </>
    );
  }
);

AibAutocomplete.displayName = 'AibAutocomplete';
export default AibAutocomplete;
