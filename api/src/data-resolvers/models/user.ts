import { Field, ObjectType } from 'type-graphql';
import { IUser } from '../../../../model/user.model';

@ObjectType()
export class User implements IUser {
  @Field(id => String!)
  id: string;

  @Field(bands => [String!]!)
  bands: string[];
}
