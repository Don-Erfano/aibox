'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../../../../../libs/ui/src/components/collapsible';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../../../../libs/ui/src/components/tooltip';
import { AibSidebarProps, SidebarItem, SidebarSubItem } from './type';
import { useSidebarItemsActive } from '../../hooks/useSidebarItemActive';

export const Sidebar = ({ sidebarData, ...props }: AibSidebarProps) => {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const sidebarDataWithActive = useSidebarItemsActive(sidebarData);
  console.log('🚀 ~ Sidebar ~ sidebarDataWithActive:', sidebarDataWithActive);

  return (
    <SidebarShadCn
      {...props}
      side="right"
      collapsible="icon"
      variant="sidebar"
      className="h-[calc(100vh-64px)] relative"
    >
      <SidebarContent className="bg-[#020617] pt-8 h-full w-full">
        <div className="overflow-y-auto h-full pb-16 pr-1">
          {sidebarDataWithActive.map((item: SidebarItem) => (
            <Collapsible
              key={item.title}
              title={item.title}
              className="group/collapsible"
            >
              <SidebarGroup className="p-0 hover:bg-white/7">
                <SidebarGroupLabel
                  asChild
                  className={`text-sm h-11 rounded-none ${
                    item.isActive ? 'text-[#6EE1F8]' : 'text-[#DAECEF]'
                  }`}
                >
                  <CollapsibleTrigger
                    className={`flex items-center w-full pr-[20px] pl-[8px] py-[10px] ${
                      item.isActive ? 'border-r-2 border-[#6EE1F8]' : ''
                    }`}
                  >
                    {!isCollapsed ? (
                      !item.url ? (
                        /** If item has sub-items, allow collapsing */
                        <div className="flex items-center w-full cursor-pointer justify-between">
                          <span className="text-xl shrink-0 ml-2">
                            {item.icon}
                          </span>
                          <span className="">{item.title}</span>
                          <ChevronRight className="ml-0 transition-transform group-data-[collapsible=icon]:rotate-90" />
                        </div>
                      ) : (
                        /** If item has a URL, allow redirection */
                        <Link
                          href={item.url}
                          className="flex items-center w-full cursor-pointer"
                        >
                          <span className="text-xl shrink-0 ml-2">
                            {item.icon}
                          </span>
                          <span className="">{item.title}</span>
                        </Link>
                      )
                    ) : (
                      /** Tooltip when sidebar is collapsed */
                      <Tooltip>
                        <TooltipTrigger
                          asChild
                          className="flex items-center justify-center w-full h-11  cursor-pointer"
                        >
                          <span className="text-xl shrink-0 w-full">
                            {item.icon}
                          </span>
                        </TooltipTrigger>
                        {item?.items?.length && (
                          <TooltipContent side="left" className="p-2">
                            <ul className="space-y-1">
                              {item?.items?.map((sub: SidebarSubItem) => (
                                <li key={sub.title}>
                                  <Link
                                    href={sub.url}
                                    className="flex items-center gap-2 py-1 px-2 rounded cursor-pointer"
                                  >
                                    <span>{sub.title}</span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    )}
                  </CollapsibleTrigger>
                </SidebarGroupLabel>

                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {item?.items?.map((subItem: SidebarSubItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton
                            asChild
                            className="flex items-center gap-2 w-full"
                          >
                            <Link
                              href={subItem.url}
                              className="flex items-center w-full cursor-pointer"
                            >
                              <span className="ml-2">{subItem.title}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        </div>

        <SidebarTrigger className="bg-[#020617] hover:bg-[#020617] absolute bottom-0 left-0 w-full h-11 rounded-none" />
      </SidebarContent>
    </SidebarShadCn>
  );
};
