import { Key } from "./enums/key.enum";
import { Mode } from "./enums/mode.enum";
import { Member } from "./member.model";

export interface SetItem {
  key?: Key;
  mode?: Mode;
  tempo?: number;
  timeSignature?: [number, number];
  leaders?: Member[];
  tags?: string[];
}
