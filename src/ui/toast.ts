export class CopyToast {
  readonly #element: HTMLElement;
  #hideTimer: number | null = null;

  constructor(element: HTMLElement) {
    this.#element = element;
  }

  show(message: string): void {
    if (this.#hideTimer !== null) window.clearTimeout(this.#hideTimer);
    this.#element.textContent = message;
    this.#element.classList.add("is-visible");
    this.#hideTimer = window.setTimeout(() => this.hide(), 1100);
  }

  hide(): void {
    if (this.#hideTimer !== null) window.clearTimeout(this.#hideTimer);
    this.#hideTimer = null;
    this.#element.classList.remove("is-visible");
  }
}
