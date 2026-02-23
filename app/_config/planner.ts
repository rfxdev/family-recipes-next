import { routes } from './routes';

export const PLANNER_NAV_LINKS = [
  { href: routes.planner, label: 'Overview' },
  { href: routes.plannerWeek, label: 'Week View' },
  { href: routes.plannerShopping, label: 'Shopping List' },
  { href: routes.plannerTracker, label: 'Tracker' },
] as const;
