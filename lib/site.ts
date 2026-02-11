export const SITE_NAME = "CurioSpark";
export const SITE_URL = "https://curiospark.org";
export const SITE_DESCRIPTION = "Discover fascinating facts about psychology, science, human behavior, and life. Feed your curiosity with bite-sized knowledge.";
export const SITE_LOGO_PATH = "/icon.svg";

export function toAbsoluteUrl(path: string) {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  if (path.startsWith("/")) {
    return `${SITE_URL}${path}`;
  }
  return `${SITE_URL}/${path}`;
}
