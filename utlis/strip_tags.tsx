export const stripTags = (html?: string) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, "");
};