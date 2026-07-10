export interface NavigationItem {
  href: string;
  label: string;
}

export const primaryNavigation: NavigationItem[] = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/work",
    label: "Work",
  },
  {
    href: "/studio",
    label: "Studio",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];
