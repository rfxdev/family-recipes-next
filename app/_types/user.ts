export interface User {
  created_at: string; // ISO 8601 datetime
  display_name: string;
  email: string;
  id: string;
  is_active: boolean;
  unit_preference: UnitPreference;
}

/**
 * User's preferred unit display format:
 * - 'imperial': Show only imperial units (cups, oz, lb)
 * - 'metric': Show only metric units (ml, g, kg)
 * - 'both': Show both systems e.g. "2 cups (480 ml)"
 * - 'original': Show units as originally entered
 */
export type UnitPreference = 'both' | 'imperial' | 'metric' | 'original';
