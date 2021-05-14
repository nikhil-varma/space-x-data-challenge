const MIN_TO_MS = 60000;
const HOURS_TO_MS = MIN_TO_MS * 60;

export function getGMTOffset(timestamp) {
  const offsetFromString = timestamp.substr(19, 6);
  const hours = parseInt(offsetFromString.substr(1, 2));
  const minutes = parseInt(offsetFromString.substr(4, 2));
  const isBehind = offsetFromString[0] !== "-";
  const offset = hours + minutes / 60;
  return offset * (isBehind || -1);
}

export function getFormattedTimeZoneDate(timestamp, offset) {
  const date = new Date(timestamp);
  const timezoneOffsetInMilliseconds = date.getTimezoneOffset() * MIN_TO_MS;
  const utcTime = date.getTime() + timezoneOffsetInMilliseconds;
  if (offset === "") {
    return new Date(utcTime + getGMTOffset(timestamp) * HOURS_TO_MS);
  }
  return new Date(utcTime + offset * 3600000);
}
