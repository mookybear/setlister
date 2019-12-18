import {DynamoDbSchema, DynamoDbTable} from '@aws/dynamodb-data-mapper';
import { ISong } from '../../../../model/song.model'; 
import { Key } from '../../../../model/enums/key.enum';
import { Mode } from '../../../../model/enums/mode.enum';
import { DAO } from './dao';

export class SongDAO extends DAO implements ISong {
    bandId?: string;
    title?: string;
    artist?: string;
    key?: Key;
    mode?: Mode;
    tempo?: number;
    timeSignature?: [number, number];
    leaders?: Set<string>;
    tags?: Set<string>;
}

Object.defineProperties(SongDAO.prototype, {
    [DynamoDbTable]: {
        value: 'Songs',
    },
    [DynamoDbSchema]: {
        value: {
            id: {
                type: 'String', keyType: 'HASH',
            },
            bandId: { type: 'String', keyType: 'RANGE' },
            title: { type: 'String' },
            artist: { type: 'String' },
            key: { type: 'String' },
            mode: { type: 'String' },
            tempo: { type: 'Number' },
            timeSignature: {
                type: 'Tuple',
                members: [
                    {type: 'Number'},
                    {type: 'Number'},
                ],
            },
            leaders: {
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
