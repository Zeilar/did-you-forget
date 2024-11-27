export function getTotalSeconds(input: string): string {
  const [h1, h2, m1, m2] = input;
  const hours = parseInt(`${h1}${h2}`);
  const minutes = parseInt(`${m1}${m2}`);
  return `${hours * 60 * 60 + minutes * 60}`;
}
