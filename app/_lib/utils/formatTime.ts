/**
 * Format time in minutes to human-readable string
 * Examples: 30 -> "30 mins", 90 -> "1 hr 30 mins", 120 -> "2 hrs"
 */
export function formatTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? 'min' : 'mins'}`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hourStr = `${hours} ${hours === 1 ? 'hr' : 'hrs'}`;

  if (remainingMinutes === 0) {
    return hourStr;
  }

  const minStr = `${remainingMinutes} ${remainingMinutes === 1 ? 'min' : 'mins'}`;
  return `${hourStr} ${minStr}`;
}
