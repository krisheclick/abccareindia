export const trimWords = (html?: string | null, limit = 10, suffix = ""): string => {
  if (!html) return "";

  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text || limit <= 0) return "";

  const words = text.split(/\s+/);

  return words.length > limit
    ? `${words.slice(0, limit).join(" ")}${suffix}`
    : text;
};
