function leftPad(value: any) {
  if (value >= 10) {
    return value;
  }
  return `0${value}`;
}

function transDateType(val: Date | string): Date {
  if (!(val instanceof Date)) {
    return new Date(val);
  }
  return val;
}

export function formattedTimer(remainSeconds: number): string {
  const minutes: number = Math.floor(remainSeconds / 60);
  const seconds: number = remainSeconds % 60;
  const formattedMinutes: string = minutes.toString().padStart(2, '0');
  const formattedSeconds: string = seconds.toString().padStart(2, '0');
  return `${formattedMinutes}:${formattedSeconds}`;
}

export function formattedDate(data: Date | undefined, delimiter = '.') {
  if (data === undefined) {
    return;
  }
  const dateTime = transDateType(data);
  const year = dateTime.getFullYear();
  const month = leftPad(dateTime.getMonth() + 1);
  const day = leftPad(dateTime.getDate());
  if (delimiter === '년월일') {
    return `${year}년 ${month}월 ${day}일`;
  }
  if (delimiter === '/') {
    return `${year}/${month}/${day}`;
  }
  return [year, month, day].join(delimiter);
}

export function formattedTime(data: Date | undefined) {
  if (data === undefined) {
    return;
  }
  const dateTime = transDateType(data);
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());

  return `${hour < 12 ? '오전' : '오후'} ${
    hour > 12 ? hour - 12 : hour
  }:${minute}`;
}

export function formattedTime2(data: Date | undefined) {
  if (data === undefined) {
    return;
  }
  const dateTime = transDateType(data);
  const hour = leftPad(dateTime.getHours());
  const minute = leftPad(dateTime.getMinutes());
  return `${hour}:${minute}`;
}
