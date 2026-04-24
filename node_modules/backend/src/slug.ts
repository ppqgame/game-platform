export function slugify(input: string) {
  const base = String(input || "")
    .trim()
    .toLowerCase()
    .replaceAll(/['’]/g, "")
    .replaceAll(/[^a-z0-9]+/g, "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/^-|-$/g, "");

  return base || "item";
}
