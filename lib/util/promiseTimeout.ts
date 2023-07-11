export async function promiseTimeout(time: number = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
