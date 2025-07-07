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
import { useSidebarItemsActive } from '../../hooks/useSidebarItemActive';
import { AiBoxIcon } from '../icons';
import { Tooltip, TooltipContent, TooltipTrigger } from '../tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../collapsible';

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
      className="fixed h-[100vh] top-[64px] z-10"
    >
      {isMobile && (
        <SidebarHeader className="bg-teal-950 flex flex-row justify-between items-center w-full text-slate-200 pt-2 px-3 pb-6">
          <AiBoxIcon className="w-12 h-12" />
          <X onClick={toggleSidebar} />
        </SidebarHeader>
      )}
      <SidebarContent
        className={clsx('bg-teal-950 relative', { 'pt-8': !isMobile })}
      >
        <div
          className={clsx(
            'flex flex-col overflow-y-auto overflow-x-hidden pb-16 scrollbar',
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
                      'flex items-center justify-center w-full h-11 cursor-pointer',
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
                      className="w-[180px] rounded-[4px] p-0 bg-white shadow-[0px_4px_4px_0px_#00000040]"
                    >
                      <ul className="space-y-1 pb-2">
                        <div className="bg-teal-600 font-medium text-[14px] rounded-tl-[4px] rounded-tr-[4px] leading-[24px] tracking-normal text-right text-white p-2 mb-2">
                          {item.title}
                        </div>
                        {item.items?.map((sub: SidebarSubItem) => (
                          <li key={sub.title}>
                            <Link
                              href={sub.url}
                              className="flex items-center gap-0.5 p-2 rounded cursor-pointer text-teal-600/70 hover:bg-black/10 font-normal text-[14px] leading-[20px] tracking-[0%] text-right"
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
                        'text-sm rounded-none hover:bg-white/10',
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
                          'flex items-center w-full pr-[20px] pl-[8px] py-[10px]',
                          {
                            'border-r-2 border-cyan-300': item.isActive,
                          }
                        )}
                      >
                        <div className="flex items-center w-full justify-between cursor-pointer">
                          <div className="flex items-center w-full justify-start gap-2">
                            <span className="text-xl shrink-0">
                              {item.icon}
                            </span>
                            <span className="font-normal text-[14px] leading-[20px] tracking-[0%] text-right">
                              {item.title}
                            </span>
                          </div>

                          <div className="flex items-center justify-center w-6 h-6">
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
                            'border-r-1 border-teal-600/85 mr-[30px]':
                              !isMobile,
                          })}
                        >
                          {item.items?.map((subItem: SidebarSubItem) => (
                            <SidebarMenuItem key={subItem.url}>
                              <SidebarMenuButton
                                asChild
                                className={clsx(
                                  'flex items-center w-full h-9 hover:bg-white/10 hover:rounded-none active:bg-white/10',
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
                                  className="flex items-center w-full cursor-pointer"
                                >
                                  <span className="pr-5 py-1.5 font-normal text-[14px] leading-[20px] tracking-[0%] text-right">
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
              <SidebarGroup key={item.title} className="p-0 justify-start">
                <SidebarGroupLabel
                  asChild
                  className={clsx('text-sm rounded-none hover:bg-white/10', {
                    'h-14 border-b-1 border-teal-600/32': isMobile,
                    'h-11': !isMobile,
                    'text-cyan-300': item.isActive,
                    'text-slate-200': !item.isActive,
                  })}
                >
                  <Link
                    href={item.url || '#'}
                    className={clsx(
                      'flex items-center justify-start w-full pr-[20px] pl-[8px] py-[10px] gap-2',
                      {
                        'border-r-2 border-cyan-300': item.isActive,
                      }
                    )}
                  >
                    <span className="text-xl shrink-0">{item.icon}</span>
                    <span className="font-normal text-[14px] leading-[20px] tracking-[0%] text-right">
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
            className="flex items-center justify-start gap-1 pr-5 bg-teal-950 hover:bg-white/10 text-slate-200 hover:text-slate-200 border-t-1 border-t-teal-600/70 absolute bottom-[64px] right-0 w-full cursor-pointer h-11 rounded-none"
          >
            <ChevronsRight
              width={20}
              height={20}
              className={clsx('transition-transform duration-300 ease-linear', {
                'rotate-180': isCollapsed,
              })}
            />
            {!isCollapsed && (
              <span className="font-normal text-sm leading-5 tracking-normal text-right">
                جمع شدن منو
              </span>
            )}
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
};
