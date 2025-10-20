'use client';

import Link from 'next/link';
import { ChevronDown, ChevronsRight, X } from 'lucide-react';
import clsx from 'clsx';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from './sidebar';

import { AibSidebarProps, SidebarItem, SidebarSubItem } from './type';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../collapsible/collapsible';
import { useSidebarItemsActive } from '../../hooks/useSidebarItemActive';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import { AiBoxIcon } from '../icons';

export const AIBSidebar = ({ sidebarData, ...props }: AibSidebarProps) => {
  const { state, isMobile, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const sidebarDataWithActive = useSidebarItemsActive(sidebarData);

  return (
    <Sidebar
      {...props}
      side="right"
      collapsible="icon"
      variant="sidebar"
      className="fixed top-[64px] z-10 h-[100vh]"
    >
      {isMobile && (
        <SidebarHeader className="flex w-full flex-row items-center justify-between bg-teal-950 px-3 pt-2 pb-6 text-slate-200">
          <AiBoxIcon className="h-12 w-12" />
          <X onClick={toggleSidebar} />
        </SidebarHeader>
      )}
      <SidebarContent
        className={clsx('relative bg-teal-950', { 'pt-8': !isMobile })}
      >
        <div
          className={clsx(
            'scrollbar flex flex-col overflow-x-hidden overflow-y-auto pb-16',
            {
              'h-[calc(100vh-140px)] gap-3': !isMobile,
              'h-100vh': isMobile,
            }
          )}
        >
          {sidebarDataWithActive.map((item: SidebarItem) => {
            const hasSubItems = item.items && item.items.length > 0;

            if (isCollapsed && !isMobile) {
              return (
                <Tooltip key={item.title}>
                  <TooltipTrigger
                    asChild
                    className={clsx(
                      'flex h-11 w-full cursor-pointer items-center justify-center',
                      {
                        'text-cyan-300': item.isActive,
                        'text-slate-200': !item.isActive,
                      }
                    )}
                  >
                    <span className="text-xl">{item.icon}</span>
                  </TooltipTrigger>
                  {hasSubItems ? (
                    <TooltipContent
                      side="left"
                      sideOffset={8}
                      className="w-[180px] rounded-[4px] bg-white p-0 shadow-[0px_4px_4px_0px_#00000040]"
                    >
                      <ul className="space-y-1 pb-2">
                        <div className="mb-2 rounded-tl-[4px] rounded-tr-[4px] bg-teal-600 p-2 text-right text-[14px] leading-[24px] font-medium tracking-normal text-white">
                          {item.title}
                        </div>
                        {item.items?.map((sub: SidebarSubItem) => (
                          <li key={sub.title}>
                            <Link
                              href={sub.url}
                              className="flex cursor-pointer items-center gap-0.5 rounded p-2 text-right text-[14px] leading-[20px] font-normal tracking-[0%] text-teal-600/70 hover:bg-black/10"
                              onClick={toggleSidebar}
                            >
                              <span>{sub.title}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </TooltipContent>
                  ) : (
                    <TooltipContent side="left" className="p-2">
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            }

            if (hasSubItems) {
              return (
                <Collapsible
                  key={item.title}
                  title={item.title}
                  className="group/collapsible"
                >
                  <SidebarGroup
                    className={clsx('p-0', {
                      'border-b-1 border-teal-600/32': isMobile,
                    })}
                  >
                    <SidebarGroupLabel
                      asChild
                      className={clsx(
                        'rounded-none text-sm hover:bg-white/10',
                        {
                          'h-14': isMobile,
                          'h-11': !isMobile,
                          'text-cyan-300': item.isActive,
                          'text-slate-200': !item.isActive,
                        }
                      )}
                    >
                      <CollapsibleTrigger
                        className={clsx(
                          'flex w-full items-center py-[10px] pr-[20px] pl-[8px]',
                          {
                            'border-r-2 border-cyan-300': item.isActive,
                          }
                        )}
                      >
                        <div className="flex w-full cursor-pointer items-center justify-between">
                          <div className="flex w-full items-center justify-start gap-2">
                            <span className="shrink-0 text-xl">
                              {item.icon}
                            </span>
                            <span className="text-right text-[14px] leading-[20px] font-normal tracking-[0%]">
                              {item.title}
                            </span>
                          </div>

                          <div className="flex h-6 w-6 items-center justify-center">
                            <ChevronDown
                              className="transition-transform duration-200 ease-linear group-data-[state=open]/collapsible:rotate-180"
                              width={16}
                              height={16}
                            />
                          </div>
                        </div>
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenu
                          className={clsx('gap-2 py-2', {
                            'mr-[30px] border-r-1 border-teal-600/85':
                              !isMobile,
                          })}
                        >
                          {item.items?.map((subItem: SidebarSubItem) => (
                            <SidebarMenuItem key={subItem.url}>
                              <SidebarMenuButton
                                asChild
                                className={clsx(
                                  'flex h-9 w-full items-center hover:rounded-none hover:bg-white/10 active:bg-white/10',
                                  {
                                    'text-cyan-300 hover:text-cyan-300 active:text-cyan-300':
                                      subItem.isActive,
                                    'text-slate-200 hover:text-slate-200 active:text-slate-200':
                                      !subItem.isActive,
                                    'h-9': !isMobile,
                                    'h-12': isMobile,
                                  }
                                )}
                              >
                                <Link
                                  href={subItem.url}
                                  className="flex w-full cursor-pointer items-center"
                                >
                                  <span className="py-1.5 pr-5 text-right text-[14px] leading-[20px] font-normal tracking-[0%]">
                                    {subItem.title}
                                  </span>
                                </Link>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </CollapsibleContent>
                  </SidebarGroup>
                </Collapsible>
              );
            }

            return (
              <SidebarGroup key={item.title} className="justify-start p-0">
                <SidebarGroupLabel
                  asChild
                  className={clsx('rounded-none text-sm hover:bg-white/10', {
                    'h-14 border-b-1 border-teal-600/32': isMobile,
                    'h-11': !isMobile,
                    'text-cyan-300': item.isActive,
                    'text-slate-200': !item.isActive,
                  })}
                >
                  <Link
                    href={item.url || '#'}
                    className={clsx(
                      'flex w-full items-center justify-start gap-2 py-[10px] pr-[20px] pl-[8px]',
                      {
                        'border-r-2 border-cyan-300': item.isActive,
                      }
                    )}
                  >
                    <span className="shrink-0 text-xl">{item.icon}</span>
                    <span className="text-right text-[14px] leading-[20px] font-normal tracking-[0%]">
                      {item.title}
                    </span>
                  </Link>
                </SidebarGroupLabel>
              </SidebarGroup>
            );
          })}
        </div>
        {!isMobile && (
          <div
            onClick={toggleSidebar}
            className="absolute right-0 bottom-[64px] flex h-11 w-full cursor-pointer items-center justify-start gap-1 rounded-none border-t-1 border-t-teal-600/70 bg-teal-950 pr-5 text-slate-200 hover:bg-white/10 hover:text-slate-200"
          >
            <ChevronsRight
              width={20}
              height={20}
              className={clsx('transition-transform duration-300 ease-linear', {
                'rotate-180': isCollapsed,
              })}
            />
            <span
              className={clsx(
                'truncate text-right text-sm leading-5 font-normal tracking-normal transition-transform duration-300',
                {
                  '!w-0': isCollapsed,
                }
              )}
            >
              جمع شدن منو
            </span>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};
