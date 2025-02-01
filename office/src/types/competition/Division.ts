import { CategoryPart } from "./CategoryPart";

export type DivisionId = string;

export type Division = CategoryPart & {
  id: DivisionId;
};
