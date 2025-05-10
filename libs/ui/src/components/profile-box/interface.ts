export interface ProfileBoxProps {
  username: string;
  avatarUrl?: string;
  items: MenuItem[];
}
export interface MenuItem {
  label: string;
  href: string;
}
