import { SidebarData } from '@aibox/ui';
import {
  AI_SERVICES_ROUTES,
  API_PLATFORM_ROUTES,
  FINANCE_ROUTES,
  GPU_ROUTES,
  HOME_ROUTES,
  MARKETING_ROUTES,
  MESSAGES_ROUTES,
  NEWS_ROUTES,
  routeNames,
  SUPPORT_ROUTES,
  USERS_ROUTES,
} from '@/routes';
import {
  Cpu,
  Headset,
  House,
  Landmark,
  Mail,
  Megaphone,
  Microchip,
  UserRound,
  Webhook,
  NewspaperIcon,
} from 'lucide-react';
import strings from './strings';

export const sidebarData: SidebarData = [
  {
    title: routeNames[HOME_ROUTES.DASHBOARD],
    url: HOME_ROUTES.DASHBOARD,
    icon: <House height={20} width={20} />,
  },
  {
    title: 'رایانش گرافیکی',
    icon: <Microchip height={20} width={20} />,
    items: [
      {
        title: routeNames[GPU_ROUTES.GPUS],
        url: GPU_ROUTES.GPUS,
      },
      // {
      //   title: routeNames[GPU_ROUTES.DISKS],
      //   url: GPU_ROUTES.DISKS,
      // },
      {
        title: routeNames[GPU_ROUTES.CONFIGURATION],
        url: GPU_ROUTES.CONFIGURATION,
      },
      {
        title: routeNames[GPU_ROUTES.MOTHERBOARDS],
        url: GPU_ROUTES.MOTHERBOARDS,
      },
      {
        title: routeNames[GPU_ROUTES.SERVERS],
        url: GPU_ROUTES.SERVERS,
      },
      {
        title: routeNames[GPU_ROUTES.SOURCE],
        url: GPU_ROUTES.SOURCE,
      },
      {
        title: routeNames[GPU_ROUTES.LOGS],
        url: GPU_ROUTES.LOGS,
      },
    ],
  },
  {
    title: 'سرویس‌های AI',
    icon: <Cpu height={20} width={20} />,
    items: [
      {
        title: routeNames[AI_SERVICES_ROUTES.COLLECTION],
        url: AI_SERVICES_ROUTES.COLLECTION,
      },
      {
        title: routeNames[AI_SERVICES_ROUTES.CATEGORIES],
        url: AI_SERVICES_ROUTES.CATEGORIES,
      },
      {
        title: routeNames[AI_SERVICES_ROUTES.SERVERS],
        url: AI_SERVICES_ROUTES.SERVERS,
      },
      {
        title: routeNames[AI_SERVICES_ROUTES.API_PARK],
        url: AI_SERVICES_ROUTES.API_PARK,
      },
      {
        title: routeNames[AI_SERVICES_ROUTES.LOGS],
        url: AI_SERVICES_ROUTES.LOGS,
      },
    ],
  },
  {
    title: strings.apiPlatform,
    icon: <Webhook height={20} width={20} />,
    items: [
      {
        title: routeNames[API_PLATFORM_ROUTES.APIS],
        url: API_PLATFORM_ROUTES.APIS,
      },
      {
        title: routeNames[API_PLATFORM_ROUTES.SERVERS],
        url: API_PLATFORM_ROUTES.SERVERS,
      },
      {
        title: routeNames[API_PLATFORM_ROUTES.LOGS],
        url: API_PLATFORM_ROUTES.LOGS,
      },
    ],
  },
  {
    title: 'امور مالی',
    icon: <Landmark height={20} width={20} />,
    items: [
      {
        title: routeNames[FINANCE_ROUTES.TRANSACTIONS],
        url: FINANCE_ROUTES.TRANSACTIONS,
      },
      {
        title: routeNames[FINANCE_ROUTES.FACTORS],
        url: FINANCE_ROUTES.FACTORS,
      },

      {
        title: routeNames[FINANCE_ROUTES.GIFT_CODE],
        url: FINANCE_ROUTES.GIFT_CODE,
      },
    ],
  },
  {
    title: 'پشتیبانی',
    icon: <Headset height={20} width={20} />,
    items: [
      {
        title: routeNames[SUPPORT_ROUTES.TICKETING],
        url: SUPPORT_ROUTES.TICKETING,
      },
      {
        title: routeNames[SUPPORT_ROUTES.FAQ],
        url: SUPPORT_ROUTES.FAQ,
      },
      {
        title: routeNames[SUPPORT_ROUTES.TERMS_AND_POLICIES],
        url: SUPPORT_ROUTES.TERMS_AND_POLICIES,
      },
    ],
  },
  {
    title: 'مارکتینگ',
    icon: <Megaphone height={20} width={20} />,
    items: [
      {
        title: routeNames[MARKETING_ROUTES.CAMPAIGN],
        url: MARKETING_ROUTES.CAMPAIGN,
      },
    ],
  },
  {
    title: 'کاربران',
    icon: <UserRound height={20} width={20} />,
    items: [
      {
        title: routeNames[USERS_ROUTES.LIST],
        url: USERS_ROUTES.LIST,
      },
      {
        title: routeNames[USERS_ROUTES.TOKENS],
        url: USERS_ROUTES.TOKENS,
      },
    ],
  },
  {
    title: 'پیام‌ها',
    icon: <Mail height={20} width={20} />,
    items: [
      {
        title: routeNames[MESSAGES_ROUTES.EMAIL],
        url: MESSAGES_ROUTES.EMAIL,
      },
      {
        title: routeNames[MESSAGES_ROUTES.SMS],
        url: MESSAGES_ROUTES.SMS,
      },
      {
        title: routeNames[MESSAGES_ROUTES.NOTIFICAITONS],
        url: MESSAGES_ROUTES.NOTIFICAITONS,
      },
      {
        title: routeNames[MESSAGES_ROUTES.PUBLIC_MESSAGE],
        url: MESSAGES_ROUTES.PUBLIC_MESSAGE,
      },
    ],
  },
  {
    title: 'اخبار',
    icon: <NewspaperIcon height={20} width={20} />,
    url: NEWS_ROUTES.LIST,
  },
];
