import { Timestamped } from "./timestamped.model";

export interface ModifiableItem extends Timestamped {
  id: string;
}
