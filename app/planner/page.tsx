import { CalendarDays, Clock, ShoppingBasket } from 'lucide-react';
import Link from 'next/link';

import { routes } from '@/_config/routes';

const features = [
  {
    description:
      'Assign recipes to meal slots across the week. Build a plan and know exactly what you are cooking each day.',
    href: routes.plannerWeek,
    icon: CalendarDays,
    title: 'Week View',
  },
  {
    description:
      'Generate a shopping list from your weekly plan. Ingredients are grouped and ready to take to the shops.',
    href: routes.plannerShopping,
    icon: ShoppingBasket,
    title: 'Shopping List',
  },
  {
    description:
      'See what you have cooked over time. Spot favourites, find gaps, and get prompted to try something new.',
    href: routes.plannerTracker,
    icon: Clock,
    title: 'Tracker',
  },
];

export default function PlannerPage() {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-foreground mb-2 text-3xl font-bold">Planner</h1>
        <p className="text-muted-foreground max-w-prose">
          Plan your meals for the week, build shopping lists from your plan, and
          track what you have been cooking.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {features.map(({ description, href, icon: Icon, title }) => (
          <Link
            className="border-border hover:border-accent-foreground/30 hover:bg-accent/50 group bg-card flex flex-col gap-3 rounded-xl border p-6 transition-colors"
            href={href}
            key={href}
          >
            <div className="bg-accent text-accent-foreground flex size-10 items-center justify-center rounded-lg">
              <Icon className="size-5" />
            </div>
            <div>
              <h2 className="text-foreground group-hover:text-accent-foreground mb-1 font-semibold transition-colors">
                {title}
              </h2>
              <p className="text-muted-foreground text-sm">{description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
