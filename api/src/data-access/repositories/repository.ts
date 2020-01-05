import { DataMapper } from '@aws/dynamodb-data-mapper';
import DynamoDB = require('aws-sdk/clients/dynamodb');
import { DAO } from '../model/dao';

export abstract class Repository<T extends DAO> {
  public client: DynamoDB;
  public mapper: DataMapper;
  public region: string;

  public constructor() {
    this.region = 'us-east-1';
    this.client = new DynamoDB({ region: this.region });
    this.mapper = new DataMapper({ client: this.client });
  }

  public get(dao: T): Promise<T> {
    return this.mapper.get(dao);
  }

  public async getMultiple(daoClass: new () => T, partitionKey: {[key: string]: string}): Promise<T[]> {
    const keyName = Object.keys(partitionKey)[0];
    const keyCondition = { [keyName]: partitionKey[keyName] };
    const iterator: AsyncIterableIterator<T> = this.mapper.query(daoClass, keyCondition);
    const items: T[] = [];
    for await (const item of iterator) {
      items.push(item);
    }
    return items;
  }

  public put(dao: T): Promise<T> {
    return this.mapper.put(dao);
  }

  public update(dao: T): Promise<T> {
    return this.mapper.update(dao);
  }

  public delete(dao: T): Promise<T> {
    return this.mapper.delete(dao);
  }
}
