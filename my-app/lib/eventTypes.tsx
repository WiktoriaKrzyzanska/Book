export type EventStatus = 'open' | 'last-places' | 'sold-out';

export interface EventDate {
  day: string;
  month: string;
  weekday: string;
}

export interface EventProps {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  date: EventDate;
  time: string;
  location?: string;
  imageUrl: string;
  type: 'open' | 'members-only';
  status: EventStatus;
  ticketLink: string;
  themeColor?: string;
}