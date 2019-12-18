import {DynamoDbSchema, DynamoDbTable} from '@aws/dynamodb-data-mapper';
import { ISet } from '../../../../model/set.model';
import { DAO } from './dao';

export class SetDAO extends DAO implements ISet {
    bandId?: string;
    name?: string;
    description?: string;
    songs?: string;
    tags?: Set<string>;
}

Object.defineProperties(SetDAO.prototype, {
    [DynamoDbTable]: {
        value: 'Sets',
    },
    [DynamoDbSchema]: {
        value: {
            id: {
                type: 'String',
                keyType: 'HASH',
            },
            bandId: {type: 'String', keyType: 'RANGE'},
            name: {type: 'String'},
            description: {type: 'String'},
            songs: { type: 'String' },
            tags: {
                type: 'Set',
                memberType: 'String',
            },
        },
    },
});
