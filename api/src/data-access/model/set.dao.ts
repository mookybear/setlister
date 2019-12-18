import {DynamoDbSchema, DynamoDbTable} from '@aws/dynamodb-data-mapper';
import { ISet } from '../../../../model/set.model';
import { DAO } from './dao';

export class SetDAO extends DAO implements ISet {
    bandId?: string;
    name?: string;
    description?: string;
    songs?: string[];
    tags?: string[];
}

Object.defineProperties(SetDAO.prototype, {
    [DynamoDbTable]: {
        value: 'Sets',
    },
    [DynamoDbSchema]: {
        value: {
            id: {
                type: 'String',
                keyType: 'HASH'
            },
            bandId: {type: 'String'},
            name: {type: 'String'},
            description: {type: 'String'},
            songs: {
                type: 'Set',
                memberType: 'String',
            },
            tags: {
                type: 'Set',
                memberType: 'String',
            },
        },
    },
});
