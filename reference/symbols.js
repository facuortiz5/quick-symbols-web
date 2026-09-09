const SYMBOLS = [

  // =========================
  // LETRAS ESPECIALES
  // =========================

  { symbol: "ñ", name: "Eñe", nameEn: "N with tilde", keywords: ["enie", "ene con tilde", "n con tilde"] },
  { symbol: "Ñ", name: "Eñe mayúscula", nameEn: "Capital N with tilde", keywords: ["enie mayuscula", "ene con tilde mayuscula", "n con tilde mayuscula"] },


  // =========================
  // BARRAS, LLAVES Y CORCHETES
  // =========================

  { symbol: "/", name: "Barra", nameEn: "Slash", keywords: ["slash", "barra", "barra diagonal"] },
  { symbol: "\\", name: "Barra invertida", nameEn: "Backslash", keywords: ["backslash", "barra invertida", "contrabarra"] },
  { symbol: "|", name: "Barra vertical", nameEn: "Vertical bar", keywords: ["barra vertical", "pipe", "vertical bar"] },
  { symbol: "{", name: "Llave de apertura", nameEn: "Opening curly brace", keywords: ["llave", "llave apertura", "llave izquierda", "curly bracket", "opening brace"] },
  { symbol: "}", name: "Llave de cierre", nameEn: "Closing curly brace", keywords: ["llave", "llave cierre", "llave derecha", "curly bracket", "closing brace"] },
  { symbol: "[", name: "Corchete de apertura", nameEn: "Opening square bracket", keywords: ["corchete", "corchete apertura", "corchete izquierdo", "square bracket", "opening bracket"] },
  { symbol: "]", name: "Corchete de cierre", nameEn: "Closing square bracket", keywords: ["corchete", "corchete cierre", "corchete derecho", "square bracket", "closing bracket"] },
  { symbol: "_", name: "Guion bajo", nameEn: "Underscore", keywords: ["guion bajo", "underscore", "barra baja"] },


  // =========================
  // SÍMBOLOS GENERALES
  // =========================

  { symbol: "~", name: "Virgulilla", nameEn: "Tilde", keywords: ["virgulilla", "tilde", "tilde symbol", "aproximacion", "aproximación"] },
  { symbol: "©", name: "Copyright", nameEn: "Copyright symbol", keywords: ["copyright", "copy right", "derechos de autor"] },
  { symbol: "°", name: "Grados", nameEn: "Degree symbol", keywords: ["grado", "grados", "temperatura"] },
  { symbol: "™", name: "Marca comercial", nameEn: "Trademark symbol", keywords: ["trademark", "trade mark", "tm", "marca comercial"] },
  { symbol: "®", name: "Marca registrada", nameEn: "Registered trademark symbol", keywords: ["registrado", "registered", "marca registrada"] },
  { symbol: "^", name: "Circunflejo", nameEn: "Caret", keywords: ["circunflejo", "caret", "sombrerito", "caret symbol", "sombrero"] },


  // =========================
  // FLECHAS
  // =========================

  { symbol: "→", name: "Flecha derecha", nameEn: "Right arrow", keywords: ["flecha derecha", "derecha", "arrow right"] },
  { symbol: "←", name: "Flecha izquierda", nameEn: "Left arrow", keywords: ["flecha izquierda", "izquierda", "arrow left"] },
  { symbol: "↑", name: "Flecha arriba", nameEn: "Up arrow", keywords: ["flecha arriba", "arriba", "arrow up", "up arrow"] },
  { symbol: "↓", name: "Flecha abajo", nameEn: "Down arrow", keywords: ["flecha abajo", "abajo", "arrow down", "down arrow"] },


  // =========================
  // MONEDAS
  // =========================

  { symbol: "€", name: "Euro", nameEn: "Euro sign", keywords: ["euro", "euros", "moneda europea"] },
  { symbol: "$", name: "Dólar", nameEn: "Dollar sign", keywords: ["usd", "dollar", "dollars", "dolar", "dólar", "dolares", "dólares"] },
  { symbol: "£", name: "Libra", nameEn: "Pound sign", keywords: ["libra", "libras", "pound", "moneda inglesa"] },
  { symbol: "¥", name: "Yen", nameEn: "Yen sign", keywords: ["yen", "yuan", "moneda japonesa"] },
  { symbol: "¢", name: "Centavo", nameEn: "Cent sign", keywords: ["centavo", "cent", "cents"] },


  // =========================
  // MATEMÁTICA
  // =========================

  { symbol: "<", name: "Menor que", nameEn: "Less-than sign", keywords: ["menor", "menor que", "less than", "less than sign"] },
  { symbol: ">", name: "Mayor que", nameEn: "Greater-than sign", keywords: ["mayor", "mayor que", "greater than", "greater than sign"] },
  { symbol: "≤", name: "Menor o igual", nameEn: "Less than or equal to", keywords: ["menor o igual", "menor igual", "less than"] },
  { symbol: "≥", name: "Mayor o igual", nameEn: "Greater than or equal to", keywords: ["mayor o igual", "mayor igual", "greater than"] },
  { symbol: "≠", name: "Distinto de", nameEn: "Not equal to", keywords: ["igual tachado", "distinto", "no igual", "diferente"] },
  { symbol: "≡", name: "Igual de tres rayas", nameEn: "Triple equals", keywords: ["igual", "tres rayas", "igual de tres rayas", "equivalente", "identidad", "triple equals", "three lines", "equivalent", "identical"] },
  { symbol: "∞", name: "Infinito", nameEn: "Infinity", keywords: ["infinito", "infinity"] },
  { symbol: "≈", name: "Aproximadamente", nameEn: "Approximately equal to", keywords: ["aproximadamente", "aproximado", "casi igual"] },
  { symbol: "±", name: "Más o menos", nameEn: "Plus or minus", keywords: ["mas o menos", "más o menos", "plus minus"] },
  { symbol: "÷", name: "División", nameEn: "Division sign", keywords: ["division", "división", "dividido", "obelus"] },
  { symbol: "√", name: "Raíz cuadrada", nameEn: "Square root", keywords: ["raiz", "raíz", "raiz cuadrada", "square root"] },


  // =========================
  // SUPERÍNDICES
  // =========================

  { symbol: "⁰", name: "Superíndice cero", nameEn: "Superscript zero", keywords: ["superindice", "superíndice", "superindice 0", "superíndice 0", "potencia", "potencia 0", "elevado", "elevado a 0", "superscript", "superscript 0", "power", "power 0", "power zero"] },
  { symbol: "¹", name: "Superíndice uno", nameEn: "Superscript one", keywords: ["superindice", "superíndice", "superindice 1", "superíndice 1", "potencia", "potencia 1", "elevado", "elevado a 1", "superscript", "superscript 1", "power", "power 1", "power one"] },
  { symbol: "²", name: "Superíndice dos", nameEn: "Superscript two", keywords: ["superindice", "superíndice", "superindice 2", "superíndice 2", "potencia", "potencia 2", "elevado", "elevado a 2", "al cuadrado", "cuadrado", "superscript", "superscript 2", "power", "power 2", "power two", "squared"] },
  { symbol: "³", name: "Superíndice tres", nameEn: "Superscript three", keywords: ["superindice", "superíndice", "superindice 3", "superíndice 3", "potencia", "potencia 3", "elevado", "elevado a 3", "al cubo", "cubo", "superscript", "superscript 3", "power", "power 3", "power three", "cubed"] },
  { symbol: "⁴", name: "Superíndice cuatro", nameEn: "Superscript four", keywords: ["superindice", "superíndice", "superindice 4", "superíndice 4", "potencia", "potencia 4", "elevado", "elevado a 4", "superscript", "superscript 4", "power", "power 4", "power four"] },
  { symbol: "⁵", name: "Superíndice cinco", nameEn: "Superscript five", keywords: ["superindice", "superíndice", "superindice 5", "superíndice 5", "potencia", "potencia 5", "elevado", "elevado a 5", "superscript", "superscript 5", "power", "power 5", "power five"] },
  { symbol: "⁶", name: "Superíndice seis", nameEn: "Superscript six", keywords: ["superindice", "superíndice", "superindice 6", "superíndice 6", "potencia", "potencia 6", "elevado", "elevado a 6", "superscript", "superscript 6", "power", "power 6", "power six"] },
  { symbol: "⁷", name: "Superíndice siete", nameEn: "Superscript seven", keywords: ["superindice", "superíndice", "superindice 7", "superíndice 7", "potencia", "potencia 7", "elevado", "elevado a 7", "superscript", "superscript 7", "power", "power 7", "power seven"] },
  { symbol: "⁸", name: "Superíndice ocho", nameEn: "Superscript eight", keywords: ["superindice", "superíndice", "superindice 8", "superíndice 8", "potencia", "potencia 8", "elevado", "elevado a 8", "superscript", "superscript 8", "power", "power 8", "power eight"] },
  { symbol: "⁹", name: "Superíndice nueve", nameEn: "Superscript nine", keywords: ["superindice", "superíndice", "superindice 9", "superíndice 9", "potencia", "potencia 9", "elevado", "elevado a 9", "superscript", "superscript 9", "power", "power 9", "power nine"] },


  // =========================
  // SUBÍNDICES
  // =========================

  { symbol: "₀", name: "Subíndice cero", nameEn: "Subscript zero", keywords: ["subindice", "subíndice", "subindice 0", "subíndice 0", "numero abajo", "número abajo", "subscript", "subscript 0", "subscript zero"] },
  { symbol: "₁", name: "Subíndice uno", nameEn: "Subscript one", keywords: ["subindice", "subíndice", "subindice 1", "subíndice 1", "numero abajo", "número abajo", "subscript", "subscript 1", "subscript one"] },
  { symbol: "₂", name: "Subíndice dos", nameEn: "Subscript two", keywords: ["subindice", "subíndice", "subindice 2", "subíndice 2", "numero abajo", "número abajo", "subscript", "subscript 2", "subscript two"] },
  { symbol: "₃", name: "Subíndice tres", nameEn: "Subscript three", keywords: ["subindice", "subíndice", "subindice 3", "subíndice 3", "numero abajo", "número abajo", "subscript", "subscript 3", "subscript three"] },
  { symbol: "₄", name: "Subíndice cuatro", nameEn: "Subscript four", keywords: ["subindice", "subíndice", "subindice 4", "subíndice 4", "numero abajo", "número abajo", "subscript", "subscript 4", "subscript four"] },
  { symbol: "₅", name: "Subíndice cinco", nameEn: "Subscript five", keywords: ["subindice", "subíndice", "subindice 5", "subíndice 5", "numero abajo", "número abajo", "subscript", "subscript 5", "subscript five"] },
  { symbol: "₆", name: "Subíndice seis", nameEn: "Subscript six", keywords: ["subindice", "subíndice", "subindice 6", "subíndice 6", "numero abajo", "número abajo", "subscript", "subscript 6", "subscript six"] },
  { symbol: "₇", name: "Subíndice siete", nameEn: "Subscript seven", keywords: ["subindice", "subíndice", "subindice 7", "subíndice 7", "numero abajo", "número abajo", "subscript", "subscript 7", "subscript seven"] },
  { symbol: "₈", name: "Subíndice ocho", nameEn: "Subscript eight", keywords: ["subindice", "subíndice", "subindice 8", "subíndice 8", "numero abajo", "número abajo", "subscript", "subscript 8", "subscript eight"] },
  { symbol: "₉", name: "Subíndice nueve", nameEn: "Subscript nine", keywords: ["subindice", "subíndice", "subindice 9", "subíndice 9", "numero abajo", "número abajo", "subscript", "subscript 9", "subscript nine"] },

  // =========================
  // PUNTUACIÓN Y ESCRITURA
  // =========================

  { symbol: "¿", name: "Interrogación de apertura", nameEn: "Inverted question mark", keywords: ["interrogacion", "interrogación", "pregunta apertura", "signo de interrogación de apertura", "signo de interrogacion de apertura"] },
  { symbol: "¡", name: "Exclamación de apertura", nameEn: "Inverted exclamation mark", keywords: ["exclamacion", "exclamación", "admiracion", "admiración", "signo de exclamación de apertura", "signo de exclamacion de apertura"] },
  { symbol: "'", name: "Comilla simple", nameEn: "Single quote", keywords: ["comilla simple", "comilla recta", "apostrofo", "apóstrofo", "single quote", "straight single quote", "apostrophe"] },
  { symbol: "\"", name: "Comilla doble", nameEn: "Double quote", keywords: ["comilla doble", "comillas dobles", "comilla recta doble", "double quote", "straight double quote", "quotation mark"] },
  { symbol: "‹", name: "Comilla angular simple izquierda", nameEn: "Single left angle quote", keywords: ["comilla angular simple", "comilla angular izquierda", "chevron izquierdo", "signo angular izquierdo", "menor pequeño", "single left angle quote", "left angle quote", "left chevron", "single guillemet"] },
  { symbol: "›", name: "Comilla angular simple derecha", nameEn: "Single right angle quote", keywords: ["comilla angular simple", "comilla angular derecha", "chevron derecho", "signo angular derecho", "mayor pequeño", "single right angle quote", "right angle quote", "right chevron", "single guillemet"] },
  { symbol: "«", name: "Comillas angulares de apertura", nameEn: "Left guillemet", keywords: ["comillas", "comillas francesas", "comillas apertura"] },
  { symbol: "»", name: "Comillas angulares de cierre", nameEn: "Right guillemet", keywords: ["comillas", "comillas francesas", "comillas cierre"] },
  { symbol: "#", name: "Hashtag", nameEn: "Number sign", keywords: ["hashtag", "hash", "numeral", "number sign", "gato"] },
  { symbol: "@", name: "Arroba", nameEn: "At sign", keywords: ["arroba", "at", "at sign", "email", "correo"] },
  { symbol: "•", name: "Viñeta", nameEn: "Bullet", keywords: ["viñeta", "vineta", "bullet", "punto de lista", "punto negro"] },


  // =========================
  // ACENTO AGUDO
  // =========================

  { symbol: "á", name: "A con acento agudo", nameEn: "Lowercase A with acute", keywords: ["a con tilde", "a con acento", "a aguda", "a acute", "acute a"] },
  { symbol: "é", name: "E con acento agudo", nameEn: "Lowercase E with acute", keywords: ["e con tilde", "e con acento", "e aguda", "e acute", "acute e"] },
  { symbol: "í", name: "I con acento agudo", nameEn: "Lowercase I with acute", keywords: ["i con tilde", "i con acento", "i aguda", "i acute", "acute i"] },
  { symbol: "ó", name: "O con acento agudo", nameEn: "Lowercase O with acute", keywords: ["o con tilde", "o con acento", "o aguda", "o acute", "acute o"] },
  { symbol: "ú", name: "U con acento agudo", nameEn: "Lowercase U with acute", keywords: ["u con tilde", "u con acento", "u aguda", "u acute", "acute u"] },

  { symbol: "Á", name: "A mayúscula con acento agudo", nameEn: "Capital A with acute", keywords: ["a mayuscula con tilde", "a mayúscula con tilde", "a mayuscula aguda", "uppercase a acute", "capital a acute"] },
  { symbol: "É", name: "E mayúscula con acento agudo", nameEn: "Capital E with acute", keywords: ["e mayuscula con tilde", "e mayúscula con tilde", "e mayuscula aguda", "uppercase e acute", "capital e acute"] },
  { symbol: "Í", name: "I mayúscula con acento agudo", nameEn: "Capital I with acute", keywords: ["i mayuscula con tilde", "i mayúscula con tilde", "i mayuscula aguda", "uppercase i acute", "capital i acute"] },
  { symbol: "Ó", name: "O mayúscula con acento agudo", nameEn: "Capital O with acute", keywords: ["o mayuscula con tilde", "o mayúscula con tilde", "o mayuscula aguda", "uppercase o acute", "capital o acute"] },
  { symbol: "Ú", name: "U mayúscula con acento agudo", nameEn: "Capital U with acute", keywords: ["u mayuscula con tilde", "u mayúscula con tilde", "u mayuscula aguda", "uppercase u acute", "capital u acute"] },


  // =========================
  // ACENTO GRAVE
  // =========================

  { symbol: "à", name: "A con acento grave", nameEn: "Lowercase A with grave", keywords: ["a grave", "a con acento grave", "grave a"] },
  { symbol: "è", name: "E con acento grave", nameEn: "Lowercase E with grave", keywords: ["e grave", "e con acento grave", "grave e"] },
  { symbol: "ì", name: "I con acento grave", nameEn: "Lowercase I with grave", keywords: ["i grave", "i con acento grave", "grave i"] },
  { symbol: "ò", name: "O con acento grave", nameEn: "Lowercase O with grave", keywords: ["o grave", "o con acento grave", "grave o"] },
  { symbol: "ù", name: "U con acento grave", nameEn: "Lowercase U with grave", keywords: ["u grave", "u con acento grave", "grave u"] },

  { symbol: "À", name: "A mayúscula con acento grave", nameEn: "Capital A with grave", keywords: ["a mayuscula grave", "a mayúscula grave", "uppercase a grave", "capital a grave"] },
  { symbol: "È", name: "E mayúscula con acento grave", nameEn: "Capital E with grave", keywords: ["e mayuscula grave", "e mayúscula grave", "uppercase e grave", "capital e grave"] },
  { symbol: "Ì", name: "I mayúscula con acento grave", nameEn: "Capital I with grave", keywords: ["i mayuscula grave", "i mayúscula grave", "uppercase i grave", "capital i grave"] },
  { symbol: "Ò", name: "O mayúscula con acento grave", nameEn: "Capital O with grave", keywords: ["o mayuscula grave", "o mayúscula grave", "uppercase o grave", "capital o grave"] },
  { symbol: "Ù", name: "U mayúscula con acento grave", nameEn: "Capital U with grave", keywords: ["u mayuscula grave", "u mayúscula grave", "uppercase u grave", "capital u grave"] },


  // =========================
  // CIRCUNFLEJO
  // =========================

  { symbol: "â", name: "A con circunflejo", nameEn: "Lowercase A with circumflex", keywords: ["a circunflejo", "a con sombrerito", "a circumflex", "circumflex a"] },
  { symbol: "ê", name: "E con circunflejo", nameEn: "Lowercase E with circumflex", keywords: ["e circunflejo", "e con sombrerito", "e circumflex", "circumflex e"] },
  { symbol: "î", name: "I con circunflejo", nameEn: "Lowercase I with circumflex", keywords: ["i circunflejo", "i con sombrerito", "i circumflex", "circumflex i"] },
  { symbol: "ô", name: "O con circunflejo", nameEn: "Lowercase O with circumflex", keywords: ["o circunflejo", "o con sombrerito", "o circumflex", "circumflex o"] },
  { symbol: "û", name: "U con circunflejo", nameEn: "Lowercase U with circumflex", keywords: ["u circunflejo", "u con sombrerito", "u circumflex", "circumflex u"] },

  { symbol: "Â", name: "A mayúscula con circunflejo", nameEn: "Capital A with circumflex", keywords: ["a mayuscula circunflejo", "a mayúscula circunflejo", "uppercase a circumflex", "capital a circumflex"] },
  { symbol: "Ê", name: "E mayúscula con circunflejo", nameEn: "Capital E with circumflex", keywords: ["e mayuscula circunflejo", "e mayúscula circunflejo", "uppercase e circumflex", "capital e circumflex"] },
  { symbol: "Î", name: "I mayúscula con circunflejo", nameEn: "Capital I with circumflex", keywords: ["i mayuscula circunflejo", "i mayúscula circunflejo", "uppercase i circumflex", "capital i circumflex"] },
  { symbol: "Ô", name: "O mayúscula con circunflejo", nameEn: "Capital O with circumflex", keywords: ["o mayuscula circunflejo", "o mayúscula circunflejo", "uppercase o circumflex", "capital o circumflex"] },
  { symbol: "Û", name: "U mayúscula con circunflejo", nameEn: "Capital U with circumflex", keywords: ["u mayuscula circunflejo", "u mayúscula circunflejo", "uppercase u circumflex", "capital u circumflex"] },


  // =========================
  // DIÉRESIS
  // =========================

  { symbol: "ä", name: "A con diéresis", nameEn: "Lowercase A with diaeresis", keywords: ["a dieresis", "a diéresis", "a umlaut", "umlaut a"] },
  { symbol: "ë", name: "E con diéresis", nameEn: "Lowercase E with diaeresis", keywords: ["e dieresis", "e diéresis", "e umlaut", "umlaut e"] },
  { symbol: "ï", name: "I con diéresis", nameEn: "Lowercase I with diaeresis", keywords: ["i dieresis", "i diéresis", "i umlaut", "umlaut i"] },
  { symbol: "ö", name: "O con diéresis", nameEn: "Lowercase O with diaeresis", keywords: ["o dieresis", "o diéresis", "o umlaut", "umlaut o"] },
  { symbol: "ü", name: "U con diéresis", nameEn: "Lowercase U with diaeresis", keywords: ["u dieresis", "u diéresis", "u umlaut", "umlaut u"] },

  { symbol: "Ä", name: "A mayúscula con diéresis", nameEn: "Capital A with diaeresis", keywords: ["a mayuscula dieresis", "a mayúscula diéresis", "uppercase a umlaut", "capital a umlaut"] },
  { symbol: "Ë", name: "E mayúscula con diéresis", nameEn: "Capital E with diaeresis", keywords: ["e mayuscula dieresis", "e mayúscula diéresis", "uppercase e umlaut", "capital e umlaut"] },
  { symbol: "Ï", name: "I mayúscula con diéresis", nameEn: "Capital I with diaeresis", keywords: ["i mayuscula dieresis", "i mayúscula diéresis", "uppercase i umlaut", "capital i umlaut"] },
  { symbol: "Ö", name: "O mayúscula con diéresis", nameEn: "Capital O with diaeresis", keywords: ["o mayuscula dieresis", "o mayúscula diéresis", "uppercase o umlaut", "capital o umlaut"] },
  { symbol: "Ü", name: "U mayúscula con diéresis", nameEn: "Capital U with diaeresis", keywords: ["u mayuscula dieresis", "u mayúscula diéresis", "uppercase u umlaut", "capital u umlaut"] },


  // =========================
  // VIRGULILLA
  // =========================

  { symbol: "ã", name: "A con virgulilla", nameEn: "Lowercase A with tilde", keywords: ["a virgulilla", "a tilde portuguesa", "a portuguese", "a nasal"] },
  { symbol: "ẽ", name: "E con virgulilla", nameEn: "Lowercase E with tilde", keywords: ["e virgulilla", "e tilde portuguesa", "e portuguese", "e nasal"] },
  { symbol: "ĩ", name: "I con virgulilla", nameEn: "Lowercase I with tilde", keywords: ["i virgulilla", "i tilde portuguesa", "i portuguese", "i nasal"] },
  { symbol: "õ", name: "O con virgulilla", nameEn: "Lowercase O with tilde", keywords: ["o virgulilla", "o tilde portuguesa", "o portuguese", "o nasal"] },
  { symbol: "ũ", name: "U con virgulilla", nameEn: "Lowercase U with tilde", keywords: ["u virgulilla", "u tilde portuguesa", "u portuguese", "u nasal"] },

  { symbol: "Ã", name: "A mayúscula con virgulilla", nameEn: "Capital A with tilde", keywords: ["a mayuscula virgulilla", "a mayúscula virgulilla", "uppercase a tilde", "capital a tilde"] },
  { symbol: "Ẽ", name: "E mayúscula con virgulilla", nameEn: "Capital E with tilde", keywords: ["e mayuscula virgulilla", "e mayúscula virgulilla", "uppercase e tilde", "capital e tilde"] },
  { symbol: "Ĩ", name: "I mayúscula con virgulilla", nameEn: "Capital I with tilde", keywords: ["i mayuscula virgulilla", "i mayúscula virgulilla", "uppercase i tilde", "capital i tilde"] },
  { symbol: "Õ", name: "O mayúscula con virgulilla", nameEn: "Capital O with tilde", keywords: ["o mayuscula virgulilla", "o mayúscula virgulilla", "uppercase o tilde", "capital o tilde"] },
  { symbol: "Ũ", name: "U mayúscula con virgulilla", nameEn: "Capital U with tilde", keywords: ["u mayuscula virgulilla", "u mayúscula virgulilla", "uppercase u tilde", "capital u tilde"] },


  // =========================
  // A CON ANILLO
  // =========================

  { symbol: "å", name: "A con anillo", nameEn: "Lowercase A with ring", keywords: ["a anillo", "a con circulo", "a con círculo", "a ring", "angstrom"] },
  { symbol: "Å", name: "A mayúscula con anillo", nameEn: "Capital A with ring", keywords: ["a mayuscula anillo", "a mayúscula anillo", "uppercase a ring", "capital a ring", "angstrom"] },


  // =========================
  // LIGADURAS
  // =========================

  { symbol: "æ", name: "AE ligada", nameEn: "Lowercase AE ligature", keywords: ["ae", "a e pegadas", "a y e pegadas", "ae ligature", "ash"] },
  { symbol: "Æ", name: "AE ligada mayúscula", nameEn: "Capital AE ligature", keywords: ["ae mayuscula", "ae mayúscula", "a e pegadas mayuscula", "uppercase ae ligature", "capital ae"] },

  { symbol: "œ", name: "OE ligada", nameEn: "Lowercase OE ligature", keywords: ["oe", "o e pegadas", "o y e pegadas", "oe ligature"] },
  { symbol: "Œ", name: "OE ligada mayúscula", nameEn: "Capital OE ligature", keywords: ["oe mayuscula", "oe mayúscula", "o e pegadas mayuscula", "uppercase oe ligature", "capital oe"] },


  // =========================
  // LETRAS BARRADAS
  // =========================

  { symbol: "ø", name: "O barrada", nameEn: "Lowercase O with stroke", keywords: ["o barrada", "o tachada", "o con raya", "o slash", "o stroke"] },
  { symbol: "Ø", name: "O barrada mayúscula", nameEn: "Capital O with stroke", keywords: ["o mayuscula barrada", "o mayúscula barrada", "uppercase o stroke", "capital o stroke"] },


  // =========================
  // CEDILLA
  // =========================

  { symbol: "ç", name: "C con cedilla", nameEn: "Lowercase C with cedilla", keywords: ["c cedilla", "c con cedilla", "cedilla", "frances c", "francés c"] },
  { symbol: "Ç", name: "C mayúscula con cedilla", nameEn: "Capital C with cedilla", keywords: ["c mayuscula cedilla", "c mayúscula cedilla", "uppercase c cedilla", "capital c cedilla"] },

  // =========================
  // ALFABETO GRIEGO
  // =========================

  { symbol: "α", name: "Alfa", nameEn: "Lowercase alpha", keywords: ["alfa", "alpha", "alfa minuscula", "alfa minúscula", "alpha lowercase", "greek alpha", "letra griega alfa", "greek letter alpha", "alfabeto griego", "greek alphabet"] },

  { symbol: "β", name: "Beta", nameEn: "Lowercase beta", keywords: ["beta", "beta minuscula", "beta minúscula", "beta lowercase", "greek beta", "letra griega beta", "greek letter beta", "alfabeto griego", "greek alphabet"] },

  { symbol: "γ", name: "Gamma", nameEn: "Lowercase gamma", keywords: ["gamma", "gama", "gamma minuscula", "gamma minúscula", "gamma lowercase", "greek gamma", "letra griega gamma", "greek letter gamma", "alfabeto griego", "greek alphabet"] },
  { symbol: "Γ", name: "Gamma mayúscula", nameEn: "Capital gamma", keywords: ["gamma mayuscula", "gamma mayúscula", "gama mayuscula", "gamma uppercase", "capital gamma", "greek gamma uppercase", "alfabeto griego", "greek alphabet"] },

  { symbol: "δ", name: "Delta", nameEn: "Lowercase delta", keywords: ["delta", "delta minuscula", "delta minúscula", "delta lowercase", "greek delta", "letra griega delta", "greek letter delta", "alfabeto griego", "greek alphabet"] },
  { symbol: "Δ", name: "Delta mayúscula", nameEn: "Capital delta", keywords: ["delta mayuscula", "delta mayúscula", "delta uppercase", "capital delta", "greek delta uppercase", "letra griega delta mayuscula", "alfabeto griego", "greek alphabet"] },

  { symbol: "ε", name: "Épsilon", nameEn: "Lowercase epsilon", keywords: ["epsilon", "épsilon", "epsilon minuscula", "epsilon minúscula", "epsilon lowercase", "greek epsilon", "letra griega epsilon", "greek letter epsilon", "alfabeto griego", "greek alphabet"] },

  { symbol: "ζ", name: "Zeta", nameEn: "Lowercase zeta", keywords: ["zeta", "zeta minuscula", "zeta minúscula", "zeta lowercase", "greek zeta", "letra griega zeta", "greek letter zeta", "alfabeto griego", "greek alphabet"] },

  { symbol: "η", name: "Eta", nameEn: "Lowercase eta", keywords: ["eta", "eta minuscula", "eta minúscula", "eta lowercase", "greek eta", "letra griega eta", "greek letter eta", "alfabeto griego", "greek alphabet"] },

  { symbol: "θ", name: "Theta", nameEn: "Lowercase theta", keywords: ["theta", "teta", "theta minuscula", "theta minúscula", "theta lowercase", "greek theta", "letra griega theta", "greek letter theta", "alfabeto griego", "greek alphabet"] },
  { symbol: "Θ", name: "Theta mayúscula", nameEn: "Capital theta", keywords: ["theta mayuscula", "theta mayúscula", "teta mayuscula", "theta uppercase", "capital theta", "greek theta uppercase", "alfabeto griego", "greek alphabet"] },

  { symbol: "ι", name: "Iota", nameEn: "Lowercase iota", keywords: ["iota", "iota minuscula", "iota minúscula", "iota lowercase", "greek iota", "letra griega iota", "greek letter iota", "alfabeto griego", "greek alphabet"] },

  { symbol: "κ", name: "Kappa", nameEn: "Lowercase kappa", keywords: ["kappa", "kapa", "kappa minuscula", "kappa minúscula", "kappa lowercase", "greek kappa", "letra griega kappa", "greek letter kappa", "alfabeto griego", "greek alphabet"] },

  { symbol: "λ", name: "Lambda", nameEn: "Lowercase lambda", keywords: ["lambda", "lamda", "lambda minuscula", "lambda minúscula", "lambda lowercase", "greek lambda", "letra griega lambda", "greek letter lambda", "alfabeto griego", "greek alphabet"] },
  { symbol: "Λ", name: "Lambda mayúscula", nameEn: "Capital lambda", keywords: ["lambda mayuscula", "lambda mayúscula", "lamda mayuscula", "lambda uppercase", "capital lambda", "greek lambda uppercase", "alfabeto griego", "greek alphabet"] },

  { symbol: "μ", name: "Mu", nameEn: "Lowercase mu", keywords: ["micro", "my", "mu", "mu griega", "greek mu", "mu minuscula", "mu minúscula", "mu lowercase", "letra griega mu", "greek letter mu", "alfabeto griego", "greek alphabet"] },

  { symbol: "ν", name: "Nu", nameEn: "Lowercase nu", keywords: ["nu", "nu minuscula", "nu minúscula", "nu lowercase", "greek nu", "letra griega nu", "greek letter nu", "alfabeto griego", "greek alphabet"] },

  { symbol: "ξ", name: "Xi", nameEn: "Lowercase xi", keywords: ["xi", "xi minuscula", "xi minúscula", "xi lowercase", "greek xi", "letra griega xi", "greek letter xi", "alfabeto griego", "greek alphabet"] },
  { symbol: "Ξ", name: "Xi mayúscula", nameEn: "Capital xi", keywords: ["xi mayuscula", "xi mayúscula", "xi uppercase", "capital xi", "greek xi uppercase", "letra griega xi mayuscula", "alfabeto griego", "greek alphabet"] },

  { symbol: "π", name: "Pi", nameEn: "Lowercase pi", keywords: ["pi", "numero pi", "número pi", "pi minuscula", "pi minúscula", "letra griega pi", "greek letter pi"] },
  { symbol: "Π", name: "Pi mayúscula", nameEn: "Capital pi", keywords: ["pi mayuscula", "pi mayúscula", "pi uppercase", "capital pi", "greek pi uppercase", "letra griega pi mayuscula", "alfabeto griego", "greek alphabet"] },

  { symbol: "ρ", name: "Rho", nameEn: "Lowercase rho", keywords: ["rho", "ro", "rho minuscula", "rho minúscula", "rho lowercase", "greek rho", "letra griega rho", "greek letter rho", "alfabeto griego", "greek alphabet"] },

  { symbol: "σ", name: "Sigma", nameEn: "Lowercase sigma", keywords: ["sigma", "sigma minuscula", "sigma minúscula", "sigma lowercase", "greek sigma", "letra griega sigma", "greek letter sigma", "alfabeto griego", "greek alphabet"] },
  { symbol: "ς", name: "Sigma final", nameEn: "Final sigma", keywords: ["sigma final", "final sigma", "sigma final griega", "greek final sigma", "sigma minuscula final", "sigma minúscula final", "letra griega sigma final", "alfabeto griego", "greek alphabet"] },
  { symbol: "Σ", name: "Sigma mayúscula", nameEn: "Capital sigma", keywords: ["sigma mayuscula", "sigma mayúscula", "sigma uppercase", "capital sigma", "greek sigma uppercase", "sumatoria", "summation", "letra griega sigma mayuscula", "alfabeto griego", "greek alphabet"] },

  { symbol: "τ", name: "Tau", nameEn: "Lowercase tau", keywords: ["tau", "tau minuscula", "tau minúscula", "tau lowercase", "greek tau", "letra griega tau", "greek letter tau", "alfabeto griego", "greek alphabet"] },

  { symbol: "υ", name: "Ípsilon", nameEn: "Lowercase upsilon", keywords: ["ipsilon", "ípsilon", "upsilon", "ypsilon", "upsilon lowercase", "greek upsilon", "letra griega ipsilon", "greek letter upsilon", "alfabeto griego", "greek alphabet"] },

  { symbol: "φ", name: "Fi", nameEn: "Lowercase phi", keywords: ["fi", "phi", "fi griega", "phi lowercase", "greek phi", "letra griega fi", "greek letter phi", "alfabeto griego", "greek alphabet"] },
  { symbol: "Φ", name: "Fi mayúscula", nameEn: "Capital phi", keywords: ["fi mayuscula", "fi mayúscula", "phi uppercase", "capital phi", "greek phi uppercase", "letra griega fi mayuscula", "alfabeto griego", "greek alphabet"] },

  { symbol: "χ", name: "Ji", nameEn: "Lowercase chi", keywords: ["ji", "chi", "ji griega", "chi lowercase", "greek chi", "letra griega ji", "greek letter chi", "alfabeto griego", "greek alphabet"] },

  { symbol: "ψ", name: "Psi", nameEn: "Lowercase psi", keywords: ["psi", "psi minuscula", "psi minúscula", "psi lowercase", "greek psi", "letra griega psi", "greek letter psi", "alfabeto griego", "greek alphabet"] },
  { symbol: "Ψ", name: "Psi mayúscula", nameEn: "Capital psi", keywords: ["psi mayuscula", "psi mayúscula", "psi uppercase", "capital psi", "greek psi uppercase", "letra griega psi mayuscula", "alfabeto griego", "greek alphabet"] },

  { symbol: "ω", name: "Omega", nameEn: "Lowercase omega", keywords: ["omega", "omega minuscula", "omega minúscula", "omega lowercase", "greek omega", "letra griega omega", "greek letter omega", "alfabeto griego", "greek alphabet"] },
  { symbol: "Ω", name: "Omega mayúscula", nameEn: "Capital omega", keywords: ["omega mayuscula", "omega mayúscula", "omega uppercase", "capital omega", "greek omega uppercase", "ohm", "ohmios", "letra griega omega mayuscula", "alfabeto griego", "greek alphabet"] },

  // =========================
  // MÚSICA
  // =========================

  { symbol: "♪", name: "Corchea", nameEn: "Eighth note", keywords: ["musica", "música", "nota", "nota musical", "corchea", "music", "musical note", "eighth note", "quaver"] },
  { symbol: "♫", name: "Corcheas unidas", nameEn: "Beamed eighth notes", keywords: ["musica", "música", "nota", "notas musicales", "corcheas", "music", "musical notes", "beamed eighth notes", "quavers"] },
  { symbol: "♬", name: "Semicorcheas unidas", nameEn: "Beamed sixteenth notes", keywords: ["musica", "música", "nota", "notas musicales", "semicorcheas", "music", "musical notes", "beamed sixteenth notes", "semiquavers"] },
  { symbol: "♩", name: "Negra musical", nameEn: "Quarter note", keywords: ["musica", "música", "nota", "nota musical", "negra", "music", "musical note", "quarter note", "crotchet"] },

  // =========================
  // ZODÍACO
  // =========================

  { symbol: "♈", name: "Aries", nameEn: "Aries", keywords: ["aries", "zodiaco", "zodíaco", "horoscopo", "horóscopo", "signo zodiacal", "zodiac", "horoscope", "astrology", "ram"] },
  { symbol: "♉", name: "Tauro", nameEn: "Taurus", keywords: ["tauro", "taurus", "zodiaco", "zodíaco", "horoscopo", "horóscopo", "signo zodiacal", "zodiac", "horoscope", "astrology", "bull"] },
  { symbol: "♊", name: "Géminis", nameEn: "Gemini", keywords: ["geminis", "géminis", "gemini", "zodiaco", "zodíaco", "horoscopo", "horóscopo", "signo zodiacal", "zodiac", "horoscope", "astrology", "twins"] },
  { symbol: "♋", name: "Cáncer", nameEn: "Cancer", keywords: ["cancer", "cáncer", "zodiaco", "zodíaco", "horoscopo", "horóscopo", "signo zodiacal", "zodiac", "horoscope", "astrology", "crab"] },
  { symbol: "♌", name: "Leo", nameEn: "Leo", keywords: ["leo", "zodiaco", "zodíaco", "horoscopo", "horóscopo", "signo zodiacal", "zodiac", "horoscope", "astrology", "lion"] },
  { symbol: "♍", name: "Virgo", nameEn: "Virgo", keywords: ["virgo", "zodiaco", "zodíaco", "horoscopo", "horóscopo", "signo zodiacal", "zodiac", "horoscope", "astrology", "maiden"] },
  { symbol: "♎", name: "Libra", nameEn: "Libra", keywords: ["libra", "zodiaco", "zodíaco", "horoscopo", "horóscopo", "signo zodiacal", "zodiac", "horoscope", "astrology", "scales"] },
  { symbol: "♏", name: "Escorpio", nameEn: "Scorpio", keywords: ["escorpio", "scorpio", "zodiaco", "zodíaco", "horoscopo", "horóscopo", "signo zodiacal", "zodiac", "horoscope", "astrology", "scorpion"] },
  { symbol: "♐", name: "Sagitario", nameEn: "Sagittarius", keywords: ["sagitario", "sagittarius", "zodiaco", "zodíaco", "horoscopo", "horóscopo", "signo zodiacal", "zodiac", "horoscope", "astrology", "archer"] },
  { symbol: "♑", name: "Capricornio", nameEn: "Capricorn", keywords: ["capricornio", "capricorn", "zodiaco", "zodíaco", "horoscopo", "horóscopo", "signo zodiacal", "zodiac", "horoscope", "astrology", "goat"] },
  { symbol: "♒", name: "Acuario", nameEn: "Aquarius", keywords: ["acuario", "aquarius", "zodiaco", "zodíaco", "horoscopo", "horóscopo", "signo zodiacal", "zodiac", "horoscope", "astrology", "water bearer"] },
  { symbol: "♓", name: "Piscis", nameEn: "Pisces", keywords: ["piscis", "pisces", "zodiaco", "zodíaco", "horoscopo", "horóscopo", "signo zodiacal", "zodiac", "horoscope", "astrology", "fish"] },

  // =========================
  // FORMAS
  // =========================

  { symbol: "★", name: "Estrella rellena", nameEn: "Filled star", keywords: ["formas", "estrella", "estrella negra", "estrella cinco puntas", "shapes", "star", "filled star", "black star", "five pointed star"] },
  { symbol: "☆", name: "Estrella de contorno", nameEn: "Outline star", keywords: ["formas", "estrella", "estrella vacia", "estrella vacía", "estrella blanca", "shapes", "star", "outline star", "empty star", "white star"] },
  { symbol: "✦", name: "Estrella de cuatro puntas rellena", nameEn: "Filled four-pointed star", keywords: ["formas", "estrella", "estrella cuatro puntas", "destello", "shapes", "star", "four pointed star", "sparkle"] },
  { symbol: "✧", name: "Estrella de cuatro puntas de contorno", nameEn: "Outline four-pointed star", keywords: ["formas", "estrella", "estrella cuatro puntas", "destello", "shapes", "star", "four pointed star", "outline sparkle"] },
  { symbol: "♡", name: "Corazón de contorno", nameEn: "Outline heart", keywords: ["formas", "corazon", "corazón", "corazon vacio", "corazón vacío", "shapes", "heart", "outline heart", "empty heart"] },
  { symbol: "♥", name: "Corazón relleno", nameEn: "Filled heart", keywords: ["formas", "corazon", "corazón", "corazon negro", "corazón negro", "shapes", "heart", "filled heart", "black heart"] },
  { symbol: "●", name: "Círculo relleno", nameEn: "Filled circle", keywords: ["formas", "circulo", "círculo", "circulo negro", "punto", "shapes", "circle", "filled circle", "black circle", "dot"] },
  { symbol: "○", name: "Círculo de contorno", nameEn: "Outline circle", keywords: ["formas", "circulo", "círculo", "circulo vacio", "círculo vacío", "shapes", "circle", "outline circle", "empty circle"] },
  { symbol: "■", name: "Cuadrado relleno", nameEn: "Filled square", keywords: ["formas", "cuadrado", "cuadrado negro", "shapes", "square", "filled square", "black square"] },
  { symbol: "□", name: "Cuadrado de contorno", nameEn: "Outline square", keywords: ["formas", "cuadrado", "cuadrado vacio", "cuadrado vacío", "shapes", "square", "outline square", "empty square"] },
  { symbol: "▲", name: "Triángulo hacia arriba relleno", nameEn: "Filled upward triangle", keywords: ["formas", "triangulo", "triángulo", "triangulo arriba", "shapes", "triangle", "filled triangle", "upward triangle"] },
  { symbol: "△", name: "Triángulo hacia arriba de contorno", nameEn: "Outline upward triangle", keywords: ["formas", "triangulo", "triángulo", "triangulo arriba", "triangulo vacio", "shapes", "triangle", "outline triangle", "upward triangle"] },
  { symbol: "▼", name: "Triángulo hacia abajo relleno", nameEn: "Filled downward triangle", keywords: ["formas", "triangulo", "triángulo", "triangulo abajo", "shapes", "triangle", "filled triangle", "downward triangle"] },
  { symbol: "▽", name: "Triángulo hacia abajo de contorno", nameEn: "Outline downward triangle", keywords: ["formas", "triangulo", "triángulo", "triangulo abajo", "triangulo vacio", "shapes", "triangle", "outline triangle", "downward triangle"] },
  { symbol: "◆", name: "Rombo relleno", nameEn: "Filled diamond", keywords: ["formas", "rombo", "diamante", "rombo negro", "shapes", "diamond", "filled diamond", "black diamond"] },
  { symbol: "◇", name: "Rombo de contorno", nameEn: "Outline diamond", keywords: ["formas", "rombo", "diamante", "rombo vacio", "rombo vacío", "shapes", "diamond", "outline diamond", "empty diamond"] },
];
