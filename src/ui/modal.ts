export class ConversionModal {
  readonly #dialog: HTMLDialogElement;
  readonly #primaryAction: HTMLAnchorElement;
  readonly #onOpen: () => void;
  readonly #onClose: () => void;
  #openedAt = Number.NEGATIVE_INFINITY;
  #dismissedByPointer = false;

  constructor(
    dialog: HTMLDialogElement,
    primaryAction: HTMLAnchorElement,
    onOpen: () => void,
    onClose: () => void,
  ) {
    this.#dialog = dialog;
    this.#primaryAction = primaryAction;
    this.#onOpen = onOpen;
    this.#onClose = onClose;

    dialog.addEventListener("click", this.#handleBackdropClick);
    dialog.addEventListener("close", this.#handleClose);
  }

  open(): void {
    if (this.#dialog.open) return;
    this.#dismissedByPointer = false;
    this.#onOpen();
    this.#openedAt = performance.now();
    this.#dialog.showModal();
    queueMicrotask(() => this.#primaryAction.focus());
  }

  close(): void {
    if (this.#dialog.open) this.#dialog.close();
  }

  destroy(): void {
    this.#dialog.removeEventListener("click", this.#handleBackdropClick);
    this.#dialog.removeEventListener("close", this.#handleClose);
  }

  readonly #handleBackdropClick = (event: MouseEvent): void => {
    const isActivationClickThrough = performance.now() - this.#openedAt < 120;
    if (event.target !== this.#dialog || isActivationClickThrough) return;
    event.preventDefault();
    this.#dismissedByPointer = true;
    this.close();
  };

  readonly #handleClose = (): void => {
    const dismissedByPointer = this.#dismissedByPointer;
    this.#dismissedByPointer = false;
    this.#onClose();

    if (dismissedByPointer) {
      queueMicrotask(() => {
        const activeElement = document.activeElement;
        if (activeElement instanceof HTMLElement && activeElement !== document.body) {
          activeElement.blur();
        }
      });
    }
  };
}
