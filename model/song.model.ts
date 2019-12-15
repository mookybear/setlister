import { SetItem } from "./set-item.model";
import { Key } from "./enums/key.enum";
import { Mode } from "./enums/mode.enum";
import { Member } from "./member.model";
import { ModifiableItem } from "./item.model";

export interface Song extends SetItem, ModifiableItem {
  title: string;
  artist: string;
  key: Key;
  mode: Mode;
  tempo: number;
  timeSignature: [number, number];
  leaders?: Member[];
  tags?: string[];
}
