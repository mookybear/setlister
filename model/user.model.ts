import { IItem } from './item.model';

export interface IUser extends IItem {
  bands?: string[] | Set<string>;
}
