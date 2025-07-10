'use client';

import { forwardRef, useImperativeHandle } from 'react';
import clsx from 'clsx';
import { IAutocompleteProps, ISelectAutoRef } from './interface';
import { ClickAwayListener } from './custom-click-away';
import { CheckIcon, ChevronDownIcon, LoaderCircle } from 'lucide-react';
import { Portal } from './portal';
import { DeleteIcon } from '../../icons';
import { useAutocompleteLogic } from './hooks/useAutocompleteLogic/useAutocompleteLogic';

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
      h_size,
      name,
      id,
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
                className="flex items-center outline outline-1 outline-gray-400 space-x-2 text-sm rounded-lg px-2"
              >
                {tagAdornment && <span>{tagAdornment}</span>}
                <span>{opt.label}</span>
              </div>
            ))}
            <div
              key="__dummy_more__"
              className="flex items-center outline outline-1 outline-gray-400 space-x-2 text-sm rounded-lg px-2"
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
              'w-full flex flex-col rounded-[4px] outline outline-1',
              atLimit ? 'outline-red-500' : 'outline-gray-500',
              { 'outline-dashed outline-gray-400': readOnly },
              {
                'cursor-not-allowed text-gray-400 outline-gray-400/30':
                  inputDisabled,
              },
              !readOnly && !disabled && 'hover:outline-zinc-600'
            )}
          >
            <div
              ref={refs.inputRef}
              className={clsx('w-full flex bg-white rounded-2xl', sizeClass, {
                'rounded-b-none': isOpen,
                'cursor-not-allowed': inputDisabled,
              })}
            >
              <div className="flex flex-grow items-center p-2 flex-wrap gap-2">
                {variant === 'multiple' &&
                  visibleTags.map((opt) => (
                    <div
                      key={opt.id}
                      className={clsx(
                        'flex items-center outline outline-1 outline-gray-400 space-x-2 h-6 text-xs rounded-lg px-2',
                        {
                          'bg-black-100/50':
                            opt.id !== highlightedId && mode === 'light',
                          'outline-red-600':
                            opt.id === highlightedId && mode === 'light',
                        }
                      )}
                    >
                      {tagAdornment && <span>{tagAdornment}</span>}
                      <span
                        className={clsx('text-xs font-normal', {
                          'text-zinc-600': opt.id !== highlightedId,
                          'text-red-600': opt.id === highlightedId,
                        })}
                      >
                        {opt.label}
                      </span>
                      <button
                        onClick={() =>
                          !removeDisabled && handlers.removeOption(opt)
                        }
                        disabled={removeDisabled}
                        aria-label={`Remove ${opt.label}`}
                      >
                        <DeleteIcon
                          className={clsx('size-5 text-xs hover:text-red-600', {
                            'text-zinc-600': opt.id !== highlightedId,
                            'text-red-600': opt.id === highlightedId,
                            'cursor-not-allowed text-gray-400': removeDisabled,
                            'cursor-pointer': !removeDisabled,
                          })}
                        />
                      </button>
                    </div>
                  ))}
                {extraCount > 0 && (
                  <div className="flex items-center space-x-2 py-1 text-xs font-normal rounded-lg px-2 text-gray-500">
                    +{extraCount} مورد
                  </div>
                )}

                <input
                  type="text"
                  name={name}
                  id={id}
                  value={inputValue}
                  onChange={handlers.onInputChange}
                  onKeyDown={handlers.onKeyDown}
                  onFocus={() => !inputDisabled && handlers.setIsOpen(true)}
                  disabled={inputDisabled}
                  readOnly={readOnly}
                  placeholder={readOnly ? '' : placeholder}
                  className={clsx(
                    'flex-grow bg-transparent outline-none text-zinc-800 text-sm',
                    { 'placeholder:text-transparent': readOnly },
                    'placeholder:text-gray-500 placeholder:text-sm placeholder:font-normal',
                    'disabled:cursor-not-allowed disabled:text-gray-400 disabled:placeholder:text-gray-400',
                    variant === 'multiple' &&
                      inputDisabled &&
                      'cursor-not-allowed'
                  )}
                  {...rest}
                />
              </div>

              <div
                onClick={handlers.toggleOpen}
                className={clsx(
                  'min-h-[30px] min-w-[30px] flex justify-end items-center',
                  {
                    'cursor-not-allowed text-gray-400': inputDisabled,
                    'cursor-pointer': !inputDisabled,
                  }
                )}
              >
                {isLoading && (
                  <LoaderCircle className="text-gray-500 animate-spin" />
                )}
                <span
                  className={clsx(
                    'ml-2 transform text-zinc-600 transition duration-300 disabled:cursor-not-allowed',
                    { 'rotate-0': !isOpen, 'rotate-180': isOpen }
                  )}
                >
                  <ChevronDownIcon
                    className={clsx({
                      'cursor-not-allowed text-gray-400': inputDisabled,
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
                'fixed shadow-lg rounded-lg bg-white  z-[10000] pointer-events-auto',
                'overflow-y-auto max-h-[200px]',
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
              ) : (
                Array.from(grouped.entries()).map(([grp, opts]) => (
                  <div
                    key={grp || '__ungrouped__'}
                    className="relative z-[10000] pointer-events-auto"
                  >
                    {grp && (
                      <div className="px-4 py-2 text-xs font-normal border-b border-gray-200 text-zinc-700">
                        {grp}
                      </div>
                    )}
                    {opts.map((opt) => {
                      const isSel = selectedOptions.some(
                        (x) => x.id === opt.id
                      );
                      const disableOpt =
                        variant === 'multiple' && atLimit && !isSel;
                      return (
                        <div
                          key={opt.id}
                          onClick={() =>
                            !disableOpt && handlers.pickOption(opt)
                          }
                          className={clsx(
                            'w-full cursor-pointer pointer-events-auto text-sm px-4 py-2 h-10 flex justify-between last:rounded-b-lg',
                            {
                              'text-teal-600 hover:bg-teal-600/25':
                                isSel && mode === 'light',
                              'hover:bg-gray-100 font-normal text-black':
                                !isSel && mode === 'light',
                              'opacity-50 cursor-not-allowed': disableOpt,
                            }
                          )}
                        >
                          <div className="flex items-center space-x-2 pr-2">
                            {opt.startAdornment && (
                              <img
                                src={opt.startAdornment}
                                alt=""
                                className="max-w-6 h-4 rounded-sm object-cover"
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
