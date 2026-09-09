import "./styles.css";
import { CanvasInteraction } from "./canvas/interaction";
import { SymbolScene, type ScenePalette } from "./canvas/scene";
import { CHROME_STORE_URL, COPY_TARGET_PER_CYCLE, UI_TEXT } from "./config";
import { copyToClipboard } from "./ui/clipboard";
import { ConversionModal } from "./ui/modal";
import { ThemeController, type Theme } from "./ui/theme";
import { CopyToast } from "./ui/toast";

const SCENE_PALETTES = {
  day: {
    symbol: "#5148e7",
    symbolHover: "#3730a3",
  },
  night: {
    symbol: "#adb1ff",
    symbolHover: "#ffffff",
  },
} as const satisfies Record<Theme, ScenePalette>;

const canvas = requireElement("symbol-canvas", HTMLCanvasElement);
const themeButton = requireElement("theme-toggle", HTMLButtonElement);
const statusElement = requireElement("copy-status", HTMLElement);
const selectionStatus = requireElement("selection-status", HTMLElement);
const dialog = requireElement("conversion-dialog", HTMLDialogElement);
const extensionLink = requireElement("extension-link", HTMLAnchorElement);

extensionLink.href = CHROME_STORE_URL;

let scene: SymbolScene | null = null;
const theme = new ThemeController(themeButton, (activeTheme) => {
  scene?.setPalette(scenePaletteFor(activeTheme));
});
scene = new SymbolScene(canvas, themeButton, scenePaletteFor(theme.current));

const toast = new CopyToast(statusElement);
let copiedInCycle = 0;
let interaction: CanvasInteraction;

const modal = new ConversionModal(
  dialog,
  extensionLink,
  () => {
    toast.hide();
    interaction.setEnabled(false);
    scene?.pause("conversion");
  },
  () => {
    copiedInCycle = 0;
    interaction.setEnabled(true);
    scene?.resume("conversion");
  },
);

interaction = new CanvasInteraction(
  canvas,
  scene,
  async ({ id, symbol }) => {
    try {
      await copyToClipboard(symbol);
      scene?.pulse(id);
      copiedInCycle += 1;
      toast.show(UI_TEXT.copied(symbol));

      if (copiedInCycle === COPY_TARGET_PER_CYCLE) modal.open();
    } catch {
      toast.show(UI_TEXT.copyFailed);
    }
  },
  ({ symbol, name }) => {
    selectionStatus.textContent = UI_TEXT.selected(symbol, name);
  },
);

const handleVisibilityChange = (): void => {
  if (document.hidden) scene?.pause("visibility");
  else scene?.resume("visibility");
};

document.addEventListener("visibilitychange", handleVisibilityChange);
handleVisibilityChange();

window.addEventListener(
  "beforeunload",
  () => {
    document.removeEventListener("visibilitychange", handleVisibilityChange);
    interaction.destroy();
    modal.destroy();
    theme.destroy();
    scene?.destroy();
  },
  { once: true },
);

function scenePaletteFor(theme: Theme): ScenePalette {
  return SCENE_PALETTES[theme];
}

function requireElement<T extends Element>(id: string, constructor: { new (): T }): T {
  const element = document.getElementById(id);
  if (!(element instanceof constructor)) throw new Error(`Missing required element: #${id}`);
  return element;
}
