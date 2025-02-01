import { TranslatedLabel } from "../common/TranslatedLabel";
import { RulebookId } from "./Rulebook";

export interface CategoryPart {
  id: string;
  code: string;
  name: TranslatedLabel;
  rulebookId?: RulebookId;
}
