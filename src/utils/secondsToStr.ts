export enum ESecondsToStrFloor {
  h = 'h',
  m = 'm',
  s = 's',
}

export function secondsToStr(sec: number, floor: ESecondsToStrFloor): string {
  const seconds = sec % 60;
  sec -= seconds;

  const minutes = Math.floor((sec % (60 * 60)) / 60);
  sec -= minutes * 60;

  const hours = Math.floor((sec % (60 * 60 * 60)) / (60 * 60));

  let timeStr = '';

  if (hours) {
    timeStr = `${hours} час `;
    if (floor === 'h') return timeStr.trim(); 
  } 
  
  if (minutes) {
    timeStr += `${minutes} мин `;
    if (floor === 'm') return timeStr.trim(); 
  }
  
  if (seconds) {
    timeStr += `${seconds} сек`;
    if (floor === 's') return timeStr.trim(); 
  }

  return timeStr.trim();
}
