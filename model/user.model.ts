import { ModifiableItem } from "./item.model";
import { Band } from "./band.model";

export interface User extends ModifiableItem {
  bands: Band[]
}
