'use client';
import Link from 'next/link';
import { ChevronDown, ChevronRight } from 'lucide-react';
import {
  Sidebar as SidebarShadCn,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
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
  const { state } = useSidebar();
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
      <SidebarContent className="bg-[#020617] pt-8  relative">
        <div className="overflow-y-auto overflow-x-hidden h-[calc(100vh-140px)] pb-16">
          {sidebarDataWithActive.map((item: SidebarItem) => {
            const hasSubItems = item.items && item.items.length > 0;

            if (isCollapsed) {
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
                          <span className="text-xl shrink-0 ml-2">
                            {item.icon}
                          </span>
                          <span className="font-normal text-[14px] leading-[20px] tracking-[0%] text-right">
                            {item.title}
                          </span>
                          <div className="flex items-center justify-center w-6 h-6">
                            <ChevronDown
                              className="transition-transform duration-200 ease-linear group-data-[state=open]/collapsible:rotate-180"
                              width={20}
                              height={20}
                            />
                          </div>
                        </div>
                      </CollapsibleTrigger>
                    </SidebarGroupLabel>
                    <CollapsibleContent>
                      <SidebarGroupContent>
                        <SidebarMenu className=" mr-[30px]  border-r-1 border-[#0F766E52]">
                          {item.items?.map((subItem: SidebarSubItem) => (
                            <SidebarMenuItem key={subItem.title}>
                              <SidebarMenuButton
                                asChild
                                className={`flex items-center gap-2 w-full hover:bg-white/7 ${
                                  item.isActive
                                    ? 'text-[#6EE1F8] hover:text-[#6EE1F8]'
                                    : 'text-[#DAECEF] hover:text-[#DAECEF]'
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
                    <span className="text-xl shrink-0 ml-2">{item.icon}</span>
                    <span className="font-normal text-[14px] leading-[20px] tracking-[0%] text-right">
                      {item.title}
                    </span>
                  </Link>
                </SidebarGroupLabel>
              </SidebarGroup>
            );
          })}
        </div>
        <SidebarTrigger className="bg-[#020617] hover:bg-white/7 text-[#DAECEF] hover:text-[#DAECEF] border-t-1 border-[#0F766EB2] absolute bottom-[64px] right-0 w-full cursor-pointer h-11 rounded-none" />
      </SidebarContent>
    </SidebarShadCn>
  );
};
