export const getWeekNumber = (d: Date) => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(
    ((d.valueOf() - yearStart.valueOf()) / 86400000 + 1) / 7
  );
  return weekNo;
};

export const isThisWeek = (date: Date) => {
  const current = new Date();
  const weekStart =
    current.getDate() - current.getDay() + (current.getDay() === 0 ? -6 : 1); // adjust when week starts
  const weekEnd = weekStart + 6;
  return date.getDate() >= weekStart && date.getDate() <= weekEnd;
};

export const isThisMonth = (date: Date) => {
  const current = new Date();
  return date.getMonth() === current.getMonth();
};

export const isThisYear = (date: Date) => {
  const current = new Date();
  return date.getFullYear() === current.getFullYear();
};
