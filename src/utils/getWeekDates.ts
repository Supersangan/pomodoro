export function getWeekDates(mondayDate: Date): Date[] {
  const d = new Date(mondayDate);
  const date = d.getDate();
  const weekDates = [];

  for (let i = 0; i < 7; i++) {
    weekDates.push(new Date(d.setDate(date + i)));
  }
  
  return weekDates;
}