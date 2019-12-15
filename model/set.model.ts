import { ModifiableItem } from "./item.model";
import { SetItem } from "./set-item.model";

export interface Set extends ModifiableItem {
  name: string;
  description: string;
  order: SetItem[];
  tags: string[];
}
