import { getFormattedTimeZoneDate } from "./date-calc";

const DATE_FORMAT_CONFIG = Object.freeze({
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});

const DATE_TIME_FORMAT_CONFIG = Object.freeze({
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

export function formatDate(timestamp) {
  return new Intl.DateTimeFormat("en-US", DATE_FORMAT_CONFIG).format(
    new Date(timestamp)
  );
}

export function formatDateTime(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    ...DATE_TIME_FORMAT_CONFIG,
    timeZoneName: "short",
  }).format(new Date(timestamp));
}

export function formatDateToTargetLocale(timestamp, offset = "") {
  return new Intl.DateTimeFormat("en-US", DATE_FORMAT_CONFIG).format(
    getFormattedTimeZoneDate(timestamp, offset)
  );
}

export function formatDateTimeToTargetLocale(timestamp, offset = "") {
  return new Intl.DateTimeFormat("en-US", DATE_TIME_FORMAT_CONFIG).format(
    getFormattedTimeZoneDate(timestamp, offset)
  );
}
