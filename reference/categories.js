// Solo navegación: los nombres y keywords del buscador siguen en symbols.js.
// El orden de los símbolos de cada categoría es el del catálogo original.
const SYMBOL_CATEGORIES = [
  { id: "favorites", labelKey: "favorites", icon: "★", symbols: [] },
  { id: "all", labelKey: "categoryAll", icon: "▦", symbols: [] },
  {
    id: "greek", labelKey: "categoryGreek", icon: "π",
    symbols: [..."αβγΓδΔεζηθΘικλΛμνξΞπΠρσςΣτυφΦχψΨωΩ"]
  },
  {
    id: "math", labelKey: "categoryMath", icon: "Σ",
    symbols: [..."°<>≤≥≠≡∞≈±÷√⁰¹²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉"]
  },
  { id: "arrows", labelKey: "categoryArrows", icon: "→", symbols: [..."→←↑↓‹›"] },
  { id: "currencies", labelKey: "categoryCurrencies", icon: "$", symbols: [..."€$£¥¢"] },
  {
    id: "letters", labelKey: "categoryLetters", icon: "a",
    symbols: [..."ñÑ~^áéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜãẽĩõũÃẼĨÕŨåÅæÆœŒøØçÇ"]
  },
  {
    id: "punctuation", labelKey: "categoryPunctuation", icon: "…",
    symbols: ["/", "\\", "|", "{", "}", "[", "]", "_", "©", "™", "®", "¿", "¡", "'", "\"", "«", "»", "#", "@", "•"]
  },
  { id: "shapes", labelKey: "categoryShapes", icon: "◇", symbols: [..."★☆✦✧♡♥●○■□▲△▼▽◆◇"] },
  { id: "music", labelKey: "categoryMusic", icon: "♪", symbols: [..."♪♫♬♩"] },
  { id: "zodiac", labelKey: "categoryZodiac", icon: "♈", symbols: [..."♈♉♊♋♌♍♎♏♐♑♒♓"] }
];
