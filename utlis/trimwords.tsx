export const trimWords = (html?: string, limit = 10): string => {
  if (!html) return "";

  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = text.split(/\s+/);

  return words.length > limit
    ? `${words.slice(0, limit).join(" ")}...`
    : text;
};