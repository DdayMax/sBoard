export function normalizeText(input: string): string {
  const trimmedInput = input.trim().replace(/\s+/g, " ");

  const normalizedText =
    trimmedInput.charAt(0).toUpperCase() + trimmedInput.slice(1).toLowerCase();

  return normalizedText;
}
