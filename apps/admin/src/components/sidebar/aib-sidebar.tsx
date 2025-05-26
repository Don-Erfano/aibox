'use client';
import Link from 'next/link';
import { ChevronDown, ChevronsRight, X } from 'lucide-react';
import {
  Sidebar as SidebarShadCn,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarHeader,
} from '../../../../../libs/ui/src/components/sidebar';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../../../../libs/ui/src/components/tooltip';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../../../libs/ui/src/components/collapsible';

import { AibSidebarProps, SidebarItem, SidebarSubItem } from './type';
import { useSidebarItemsActive } from '../../hooks/useSidebarItemActive';

export const Sidebar = ({ sidebarData, ...props }: AibSidebarProps) => {
  const { state, isMobile, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';
  const sidebarDataWithActive = useSidebarItemsActive(sidebarData);

  return (
    <SidebarShadCn
      {...props}
      side="right"
      collapsible="icon"
      variant="sidebar"
      className="fixed h-[100vh] top-[64px] z-10"
    >
      {isMobile && (
        <SidebarHeader
          className={`bg-teal-950 flex items-end w-full text-[#DAECEF] p-2`}
        >
          <X onClick={toggleSidebar} />
        </SidebarHeader>
      )}
      <SidebarContent className={`bg-teal-950 ${!isMobile && 'pt-8'} relative`}>
        <div
          className={`flex flex-col overflow-y-auto overflow-x-hidden ${
            !isMobile ? 'h-[calc(100vh-140px)]' : 'h-100vh'
          }  pb-16 gap-3 scrollbar`}
        >
          {sidebarDataWithActive.map((item: SidebarItem) => {
            const hasSubItems = item.items && item.items.length > 0;

            if (isCollapsed && !isMobile) {
              return (
                <Tooltip key={item.title}>
                  <TooltipTrigger
                    asChild
                    className={`flex items-center justify-center w-full h-11 cursor-pointer ${
                      item.isActive ? 'text-[#6EE1F8]' : 'text-[#DAECEF]'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                  </TooltipTrigger>
                  {hasSubItems ? (
                    <TooltipContent side="left" className="p-2">
                      <ul className="space-y-1">
                        {item.items?.map((sub: SidebarSubItem) => (
                          <li key={sub.title}>
                            <Link
                              href={sub.url}
                              className="flex items-center gap-2 py-1 px-2 rounded cursor-pointer hover:bg-white/7"
                            >
                              <span className="font-normal text-[14px] leading-[20px] tracking-[0%] text-right">
                                {sub.title}
                              </span>
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
                  <SidebarGroup className="p-0">
                    <SidebarGroupLabel
                      asChild
                      className={`text-sm h-11 rounded-none hover:bg-white/7 ${
                        item.isActive ? 'text-[#6EE1F8]' : 'text-[#DAECEF]'
                      }`}
                    >
                      <CollapsibleTrigger
                        className={`flex items-center w-full pr-[20px] pl-[8px] py-[10px] ${
                          item.isActive ? 'border-r-2 border-[#6EE1F8]' : ''
                        }`}
                      >
                        <div className="flex items-center w-full justify-between cursor-pointer">
                          <div className="flex items-center w-full justify-start gap-1">
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
                          className={`gap-2  ${
                            !isMobile &&
                            'border-r-1 border-[#0F766E52] mr-[30px]'
                          }`}
                        >
                          {item.items?.map((subItem: SidebarSubItem) => (
                            <SidebarMenuItem key={subItem.title}>
                              <SidebarMenuButton
                                asChild
                                className={`flex items-center w-full hover:bg-white/7 active:bg-white/7 ${
                                  item.isActive
                                    ? 'text-[#6EE1F8] hover:text-[#6EE1F8] active:text-[#6EE1F8]'
                                    : 'text-[#DAECEF] hover:text-[#DAECEF] active:text-[#DAECEF]'
                                }`}
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
              <SidebarGroup key={item.title} className="p-0 justify-start ">
                <SidebarGroupLabel
                  asChild
                  className={`text-sm h-11 rounded-none hover:bg-white/7 ${
                    item.isActive ? 'text-[#6EE1F8]' : 'text-[#DAECEF]'
                  }`}
                >
                  <Link
                    href={item.url || '#'}
                    className={`flex items-center justify-start w-full pr-[20px] pl-[8px] py-[10px] ${
                      item.isActive ? 'border-r-2 border-[#6EE1F8]' : ''
                    }`}
                  >
                    <span className="text-xl shrink-0 ml-1">{item.icon}</span>
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
            className="flex items-center justify-start gap-1 pr-5 bg-teal-950 hover:bg-white/7 text-[#DAECEF] hover:text-[#DAECEF] border-t-1 border-t-[#0F766EB2] absolute bottom-[64px] right-0 w-full cursor-pointer h-11 rounded-none"
          >
            <ChevronsRight />
            {!isCollapsed && (
              <span className="font-normal text-sm leading-5 tracking-normal text-right">
                جمع شدن منو
              </span>
            )}
          </div>
        )}
      </SidebarContent>
    </SidebarShadCn>
  );
};
