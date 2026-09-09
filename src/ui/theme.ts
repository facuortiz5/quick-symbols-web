export type Theme = "day" | "night";

const STORAGE_KEY = "quick-symbols-theme";

export class ThemeController {
  readonly #button: HTMLButtonElement;
  readonly #themeColor: HTMLMetaElement | null;
  readonly #onChange: (theme: Theme) => void;
  #theme: Theme;

  constructor(button: HTMLButtonElement, onChange: (theme: Theme) => void) {
    this.#button = button;
    this.#onChange = onChange;
    this.#themeColor = document.querySelector('meta[name="theme-color"]');
    this.#theme = readSavedTheme();
    this.#apply(false);
    button.addEventListener("click", this.#toggle);
  }

  destroy(): void {
    this.#button.removeEventListener("click", this.#toggle);
  }

  readonly #toggle = (event: MouseEvent): void => {
    this.#theme = this.#theme === "day" ? "night" : "day";
    this.#apply(true);

    // Pointer activation should not leave a persistent focus ring. Keyboard and
    // assistive-technology activation report detail 0 and retain accessible focus.
    if (event.detail > 0) queueMicrotask(() => this.#button.blur());
  };

  #apply(persist: boolean): void {
    document.documentElement.dataset.theme = this.#theme;
    this.#button.setAttribute(
      "aria-label",
      this.#theme === "day" ? "Switch to night mode" : "Switch to day mode",
    );
    this.#themeColor?.setAttribute("content", this.#theme === "day" ? "#f7f8fc" : "#11142a");

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, this.#theme);
      } catch {
        // Theme persistence is optional when storage is unavailable.
      }
    }

    this.#onChange(this.#theme);
  }
}

function readSavedTheme(): Theme {
  try {
    return localStorage.getItem(STORAGE_KEY) === "night" ? "night" : "day";
  } catch {
    return "day";
  }
}
