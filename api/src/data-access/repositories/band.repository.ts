import { Injectable } from '@nestjs/common';
import { Repository } from './repository';
import { BandDAO } from '../model/band.dao';

@Injectable()
export class BandRepository extends Repository<BandDAO> {

  public constructor() {
    super();
  }

}
