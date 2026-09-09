import type { SymbolScene } from "./scene";

export interface SymbolActivation {
  id: number;
  symbol: string;
}

export interface SymbolSelection {
  symbol: string;
  name: string;
}

export class CanvasInteraction {
  readonly #canvas: HTMLCanvasElement;
  readonly #scene: SymbolScene;
  readonly #onActivate: (activation: SymbolActivation) => Promise<void>;
  readonly #onSelectionChange: (selection: SymbolSelection) => void;
  readonly #hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  #enabled = true;
  #pressedId: number | null = null;
  #activePointerId: number | null = null;
  #keyboardIndex = 0;
  #activationPending = false;

  constructor(
    canvas: HTMLCanvasElement,
    scene: SymbolScene,
    onActivate: (activation: SymbolActivation) => Promise<void>,
    onSelectionChange: (selection: SymbolSelection) => void,
  ) {
    this.#canvas = canvas;
    this.#scene = scene;
    this.#onActivate = onActivate;
    this.#onSelectionChange = onSelectionChange;

    canvas.addEventListener("pointermove", this.#handlePointerMove);
    canvas.addEventListener("pointerdown", this.#handlePointerDown);
    canvas.addEventListener("pointercancel", this.#handlePointerCancel);
    canvas.addEventListener("pointerleave", this.#handlePointerLeave);
    canvas.addEventListener("pointerup", this.#handlePointerUp);
    canvas.addEventListener("keydown", this.#handleKeyDown);
    canvas.addEventListener("focus", this.#handleFocus);
  }

  setEnabled(enabled: boolean): void {
    this.#enabled = enabled;
    if (!enabled) {
      this.#releaseActivePointer();
      this.#pressedId = null;
      this.#scene.setPressed(null);
      this.#scene.setHovered(null);
      this.#canvas.style.cursor = "default";
    }
  }

  destroy(): void {
    this.#releaseActivePointer();
    this.#canvas.removeEventListener("pointermove", this.#handlePointerMove);
    this.#canvas.removeEventListener("pointerdown", this.#handlePointerDown);
    this.#canvas.removeEventListener("pointercancel", this.#handlePointerCancel);
    this.#canvas.removeEventListener("pointerleave", this.#handlePointerLeave);
    this.#canvas.removeEventListener("pointerup", this.#handlePointerUp);
    this.#canvas.removeEventListener("keydown", this.#handleKeyDown);
    this.#canvas.removeEventListener("focus", this.#handleFocus);
  }

  readonly #handlePointerMove = (event: PointerEvent): void => {
    if (!this.#enabled) return;
    if (!this.#canHover(event)) {
      this.#scene.setHovered(null);
      this.#canvas.style.cursor = "default";
      return;
    }
    const point = this.#toCanvasPoint(event);
    const hitId = point
      ? this.#scene.hitTest(point.x, point.y, event.pointerType)
      : null;
    this.#scene.setHovered(hitId);
    this.#canvas.style.cursor = hitId === null ? "default" : "pointer";
  };

  readonly #handlePointerDown = (event: PointerEvent): void => {
    if (!this.#enabled || !event.isPrimary || event.button !== 0) return;
    const point = this.#toCanvasPoint(event);
    this.#pressedId = point
      ? this.#scene.hitTest(point.x, point.y, event.pointerType)
      : null;
    this.#scene.setHovered(this.#canHover(event) ? this.#pressedId : null);
    this.#scene.setPressed(this.#pressedId);
    if (this.#pressedId === null) return;

    this.#activePointerId = event.pointerId;
    this.#canvas.setPointerCapture(event.pointerId);
    event.preventDefault();
  };

  readonly #handlePointerUp = (event: PointerEvent): void => {
    if (
      !this.#enabled ||
      this.#pressedId === null ||
      event.pointerId !== this.#activePointerId
    ) return;
    event.preventDefault();
    const pressedId = this.#pressedId;
    const point = this.#toCanvasPoint(event);
    const releaseId = point
      ? this.#scene.hitTest(point.x, point.y, event.pointerType)
      : null;
    this.#pressedId = null;
    this.#activePointerId = null;
    this.#scene.setPressed(null);

    if (!this.#canHover(event)) {
      this.#scene.setHovered(null);
      this.#canvas.style.cursor = "default";
    }

    if (this.#canvas.hasPointerCapture(event.pointerId)) {
      this.#canvas.releasePointerCapture(event.pointerId);
    }

    if (releaseId === pressedId) void this.#activate(pressedId);
  };

  readonly #handlePointerCancel = (event: PointerEvent): void => {
    if (this.#activePointerId !== null && event.pointerId !== this.#activePointerId) return;
    this.#pressedId = null;
    this.#activePointerId = null;
    this.#scene.setPressed(null);
    if (!this.#canHover(event)) this.#scene.setHovered(null);
  };

  readonly #handlePointerLeave = (): void => {
    if (this.#pressedId !== null) return;
    this.#scene.setHovered(null);
    this.#canvas.style.cursor = "default";
  };

  readonly #handleKeyDown = (event: KeyboardEvent): void => {
    if (!this.#enabled || this.#scene.particleCount === 0) return;

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      this.#keyboardIndex = (this.#keyboardIndex + 1) % this.#scene.particleCount;
      this.#focusKeyboardParticle();
      return;
    }

    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      this.#keyboardIndex =
        (this.#keyboardIndex - 1 + this.#scene.particleCount) % this.#scene.particleCount;
      this.#focusKeyboardParticle();
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      const id = this.#scene.getParticleIdAt(this.#keyboardIndex);
      if (id !== null) void this.#activate(id);
    }
  };

  readonly #handleFocus = (): void => {
    if (this.#enabled && this.#canvas.matches(":focus-visible")) {
      this.#focusKeyboardParticle();
    }
  };

  #focusKeyboardParticle(): void {
    const id = this.#scene.getParticleIdAt(this.#keyboardIndex);
    this.#scene.setHovered(id);
    if (id === null) return;
    const particle = this.#scene.getParticleById(id);
    if (particle) this.#onSelectionChange({ symbol: particle.symbol, name: particle.name });
  }

  async #activate(id: number): Promise<void> {
    if (this.#activationPending) return;
    const particle = this.#scene.getParticleById(id);
    if (!particle) return;
    this.#activationPending = true;
    try {
      await this.#onActivate({ id: particle.id, symbol: particle.symbol });
    } finally {
      this.#activationPending = false;
    }
  }

  #toCanvasPoint(event: PointerEvent): { x: number; y: number } | null {
    return this.#scene.clientPointToLocal(event.clientX, event.clientY);
  }

  #canHover(event: PointerEvent): boolean {
    return event.pointerType === "mouse" && this.#hoverQuery.matches;
  }

  #releaseActivePointer(): void {
    if (
      this.#activePointerId !== null &&
      this.#canvas.hasPointerCapture(this.#activePointerId)
    ) {
      this.#canvas.releasePointerCapture(this.#activePointerId);
    }
    this.#activePointerId = null;
  }
}
