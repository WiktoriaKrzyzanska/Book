interface CalendarDetails {
  title: string;
  description: string;
  location?: string;
}

export const generateGoogleCalendarUrl = ({ title, description, location }: CalendarDetails): string => {
  const text = encodeURIComponent(title);
  const details = encodeURIComponent(description);
  const locationText = encodeURIComponent(location || '');
  
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&details=${details}&location=${locationText}`;
};