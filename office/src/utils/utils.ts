import { customAlphabet } from "nanoid";
import { TranslatedLabel } from "@/types/common/TranslatedLabel";

export function lowercaseFirstLetter(string: string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

const shortAlphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
const longAlphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
export const nanoid12 = customAlphabet(shortAlphabet, 12);
export const nanoid6 = customAlphabet(longAlphabet, 6);

export const range = (start: number, end: number, step = 1) => {
  const output = [];
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};

export const tl = (obj: TranslatedLabel) => obj.en;
