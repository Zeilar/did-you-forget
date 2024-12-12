export function areReminderArraysEqual(reminder1: string[], reminder2: string[]): boolean {
  if (reminder1.length !== reminder2.length) {
    return false;
  }

  const sortedArr1 = reminder1.slice().sort((a, b) => (a > b ? 1 : -1));
  const sortedArr2 = reminder2.slice().sort((a, b) => (a > b ? 1 : -1));

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) {
      return false;
    }
  }

  return true;
}
