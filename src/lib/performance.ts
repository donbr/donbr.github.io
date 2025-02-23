// src/lib/performance.ts
export const measureNetworkLoadTime = (start: number) => {
  const end = performance.now();
  console.debug(`Network loaded in ${end - start}ms`);
};