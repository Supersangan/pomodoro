export function secondsToTime(sec: number): string {
  const seconds = sec % 60;
  sec -= seconds;

  const minutes = Math.floor(sec / 60);

  const timeStr = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);

  return timeStr.trim();
}
