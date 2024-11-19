export function pluralizeWithS(subject: string, n: number) {
  return `${subject}${n > 1 ? "s" : ""}`;
}
