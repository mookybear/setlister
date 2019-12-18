import {DynamoDbSchema, DynamoDbTable} from '@aws/dynamodb-data-mapper';
import { IUser } from '../../../../model/user.model';
import { DAO } from './dao';

export class UserDAO extends DAO implements IUser {
  bands?: Set<string>;
}

Object.defineProperties(UserDAO.prototype, {
    [DynamoDbTable]: {
        value: 'Users',
    },
    [DynamoDbSchema]: {
        value: {
            id: {
                type: 'String',
                keyType: 'HASH',
            },
            bands: {
                type: 'Set',
                memberType: 'String',
            },
        },
    },
});
