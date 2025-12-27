import { useMemo } from "react";

/**
 * Generates controlled random values that remain consistent for a given seed
 * but can be varied by changing the seed
 */
export const useControlledRandom = (seed: number | string, count: number = 1) => {
  return useMemo(() => {
    // Simple seeded random number generator
    const seededRandom = (seed: number): number => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    // Convert string seed to number
    const numericSeed = typeof seed === "string" 
      ? seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
      : seed;

    const values: number[] = [];
    for (let i = 0; i < count; i++) {
      values.push(seededRandom(numericSeed + i * 1000));
    }

    return count === 1 ? values[0] : values;
  }, [seed, count]);
};

/**
 * Generates a random variation within a controlled range
 */
export const useRandomVariation = (
  base: number,
  variation: number,
  seed: number | string
): number => {
  const random = useControlledRandom(seed);
  return base + (random - 0.5) * 2 * variation;
};

