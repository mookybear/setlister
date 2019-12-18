import { IItem } from './item.model';

export interface IBand extends IItem {
  name?: string;
  songs?: string[] | Set<string>;
  members?: string[] | Set<string>;
  sets?: string[] | Set<string>;
}
