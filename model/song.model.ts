import { ISetItem } from './set-item.model';
import { Key } from './enums/key.enum';
import { Mode } from './enums/mode.enum';

export interface ISong extends ISetItem {
  bandId?: string;
  title?: string;
  artist?: string;
  key?: Key | string;
  mode?: Mode | string;
  tempo?: number;
  timeSignature?: [number, number];
  leaders?: string[] | Set<string>;
  tags?: string[] | Set<string>;
}
