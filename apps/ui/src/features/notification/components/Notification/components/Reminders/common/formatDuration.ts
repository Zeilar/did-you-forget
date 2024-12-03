const units = [
  { unit: "year", seconds: 31536000 },
  { unit: "month", seconds: 2592000 },
  { unit: "day", seconds: 86400 },
  { unit: "hour", seconds: 3600 },
  { unit: "minute", seconds: 60 },
  { unit: "second", seconds: 1 },
];

export function formatDuration(seconds: number, locale = "en-US"): string {
  for (const { unit, seconds: unitSeconds } of units) {
    if (seconds >= unitSeconds) {
      const value = Math.floor(seconds / unitSeconds);
      const formatter = new Intl.NumberFormat(locale, {
        style: "unit",
        unit: unit,
        unitDisplay: "long",
      });

      return formatter.format(value);
    }
  }

  return "0 seconds";
}
