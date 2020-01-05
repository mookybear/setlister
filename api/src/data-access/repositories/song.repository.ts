import { Injectable } from '@nestjs/common';
import { Repository } from './repository';
import { SongDAO } from '../model/song.dao';

@Injectable()
export class SongRepository extends Repository<SongDAO> {
  public constructor() {
    super();
  }
}
