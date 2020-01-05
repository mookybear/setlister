import { Injectable } from '@nestjs/common';
import { Repository } from './repository';
import { UserDAO } from '../model/user.dao';

@Injectable()
export class UserRepository extends Repository<UserDAO> {
  public constructor() {
    super();
  }
}
