import { Key } from './enums/key.enum';
import { Mode } from './enums/mode.enum';
import { IItem } from './item.model';

export interface ISetItem extends IItem {
  key?: Key | string;
  mode?: Mode | string;
  tempo?: number;
  timeSignature?: [number, number];
  leaders?: string[] | Set<string>;
  tags?: string[] | Set<string>;
}
