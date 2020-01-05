import { DynamoDbSchema, DynamoDbTable } from '@aws/dynamodb-data-mapper';
import { ISet } from '../../../../model/set.model';
import { DAO } from './dao';

export class SetDAO extends DAO implements ISet {
  bandId?: string;
  name?: string;
  description?: string;
  songs?: string;
  tags?: Set<string>;

  public constructor(id?: string) {
    super(id || '');
  }
}

Object.defineProperties(SetDAO.prototype, {
  [DynamoDbTable]: {
    value: 'Sets',
  },
  [DynamoDbSchema]: {
    value: {
      bandId: {
        type: 'String',
        keyType: 'HASH',
      },
      id: {
        type: 'String',
        keyType: 'RANGE',
      },
      name: { type: 'String' },
      description: { type: 'String' },
      songs: { type: 'String' },
      tags: {
        type: 'Set',
        memberType: 'String',
      },
    },
  },
});
