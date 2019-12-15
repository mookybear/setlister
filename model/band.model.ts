import { ModifiableItem } from "./item.model";
import { Song } from "./song.model";
import { Member } from "./member.model";
import { Set } from "./set.model";

export interface Band extends ModifiableItem {
  name: string;
  repertoire: Song[];
  members: Member[];
  sets: Set[];
}
