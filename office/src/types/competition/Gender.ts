import { CategoryPart } from "./CategoryPart";

export type GenderId = string;

export type Gender = CategoryPart & {
  id: GenderId;
};
