import { DynamoDbSchema, DynamoDbTable } from '@aws/dynamodb-data-mapper';
import { IBand } from '../../../../model/band.model';
import { DAO } from './dao';

export class BandDAO extends DAO implements IBand {
  name?: string;
  songs?: Set<string>;
  members?: Set<string>;
  sets?: Set<string>;

  public constructor(id?: string) {
    super(id || '');
  }
}

Object.defineProperties(BandDAO.prototype, {
  [DynamoDbTable]: {
    value: 'Bands',
  },
  [DynamoDbSchema]: {
    value: {
      id: {
        type: 'String',
        keyType: 'HASH',
      },
      name: { type: 'String' },
      songs: {
        type: 'Set',
        memberType: 'String',
      },
      members: {
        type: 'Set',
        memberType: 'String',
      },
      sets: {
        type: 'Set',
        memberType: 'String',
      },
    },
  },
});
