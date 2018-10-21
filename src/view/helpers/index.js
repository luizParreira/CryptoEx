// @flow

// Generate random string to be used as key to the loops
export const generateKey = (n: number = 36): string => Math.random().toString(n);
