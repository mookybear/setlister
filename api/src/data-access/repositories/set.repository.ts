import { Injectable } from '@nestjs/common';
import { Repository } from './repository';
import { SetDAO } from '../model/set.dao';

@Injectable()
export class SetRepository extends Repository<SetDAO> {

  public constructor() {
    super();
  }

}
