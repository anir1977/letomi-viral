export const SITE_NAME = "CurioSpark";
export const SITE_URL = "https://curiospark.org";
export const SITE_DESCRIPTION = "CurioSpark publishes clear, source-aware articles about psychology, technology, health, nature, and the science behind everyday life.";
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
