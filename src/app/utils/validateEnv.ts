export function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is missing or empty.`);
  }
  return value;
}

export function requireNumberEnv(key: string): number {
  const value = requireEnv(key);
  const number = Number(value);
  if (isNaN(number)) {
    throw new Error(`Environment variable ${key} must be a valid number.`);
  }
  return number;
}
