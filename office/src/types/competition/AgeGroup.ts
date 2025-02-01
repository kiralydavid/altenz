import { CategoryPart } from "./CategoryPart";

export type AgeGroupId = string;

export type AgeGroup = CategoryPart & {
  id: AgeGroupId;
};
