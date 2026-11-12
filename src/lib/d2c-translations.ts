import type { D2CTranslations } from "./d2c-translations-types";
import { enIN, enUS, enGB, enAE } from "./d2c-translations-en";
import { de } from "./d2c-translations-de";
import { nl } from "./d2c-translations-nl";
import { fr } from "./d2c-translations-fr";
import { pt } from "./d2c-translations-pt";
import { hi } from "./d2c-translations-hi";

export type { D2CTranslations };
export { enIN, enUS, enGB, enAE, de, nl, fr, pt, hi };

export const translations: Record<string, D2CTranslations> = {
  "en-in": enIN,
  "en-us": enUS,
  "en-gb": enGB,
  "en-ae": enAE,
  hi,
  de,
  nl,
  fr,
  pt,
};
