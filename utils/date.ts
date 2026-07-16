export const dateFromIso = (iso: string) => new Date(`${iso}T12:00:00`);

export function daysUntil(iso: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.ceil((dateFromIso(iso).getTime() - today.getTime()) / 86_400_000);
}

export function expiryLabel(iso: string) {
  const days = daysUntil(iso);
  if (days < 0) return `Expired ${Math.abs(days)}d ago`;
  if (days === 0) return 'Expires today';
  if (days === 1) return 'Expires tomorrow';
  return `Expires in ${days} days`;
}

export const formatDate = (iso: string) => dateFromIso(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
