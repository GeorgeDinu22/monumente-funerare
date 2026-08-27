export function toSlug(text) {
  return text
    .toLocaleLowerCase('ro-RO')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\p{L}\p{N}-]/gu, '')
    .replace(/-+/g, '-');
}
