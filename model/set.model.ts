import { IItem } from './item.model';

export interface ISet extends IItem {
  bandId?: string;
  name?: string;
  description?: string;
  songs?: string[];
  tags?: string[];
}
