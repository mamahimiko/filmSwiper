export const randomNumber = (length: number, count: number = 5) => {
  const uniqueNumbers = new Set<number>();
  const safeCount = Math.min(count, length);
  while (uniqueNumbers.size < safeCount) {
    const num = Math.floor(Math.random() * length);
    uniqueNumbers.add(num);
  }
  return Array.from(uniqueNumbers);
};
