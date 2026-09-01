export const decodeHtmlEntities = (value: string): string => {
  const namedEntities: Record<string, string> = {
    amp: "&",
    apos: "'",
    bull: "•",
    copy: "©",
    hellip: "…",
    gt: ">",
    laquo: "«",
    ldquo: "“",
    lsquo: "‘",
    lt: "<",
    mdash: "—",
    nbsp: " ",
    ndash: "–",
    raquo: "»",
    rdquo: "”",
    reg: "®",
    rsquo: "’",
    quot: '"',
  };

  return value.replace(/&(#(\d+)|#x([\da-f]+)|[a-z]+);/gi, (entity, _code, decimal, hex) => {
    if (decimal) {
      const codePoint = Number(decimal);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : entity;
    }

    if (hex) {
      const codePoint = parseInt(hex, 16);
      return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : entity;
    }

    return namedEntities[entity.slice(1, -1).toLowerCase()] ?? entity;
  });
};

export const trimWords = (html?: string | null, limit = 10, suffix = ""): string => {
  if (!html) return "";

  const text = decodeHtmlEntities(html)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!text || limit <= 0) return "";

  const words = text.split(/\s+/);

  return words.length > limit
    ? `${words.slice(0, limit).join(" ")}${suffix}`
    : text;
};
