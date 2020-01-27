/** Example factorial function */
export default function factorial(n: number): number {
  if (!n) {
    return 1;
  }
  return n * factorial(n - 1);
}
