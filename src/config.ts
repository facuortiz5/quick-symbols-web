export const CHROME_STORE_URL =
  "https://chromewebstore.google.com/detail/aippaakfdoegjcaggenmndonedgijenb";

export const COPY_TARGET_PER_CYCLE = 3;

export const UI_TEXT = {
  copied: (symbol: string) => `${symbol} copied`,
  selected: (symbol: string, name: string) => `${symbol}, ${name}, selected`,
  copyFailed: "Couldn't copy. Try again.",
  switchToDay: "Switch to day mode",
  switchToNight: "Switch to night mode",
} as const;
