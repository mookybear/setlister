import { Field, ObjectType } from 'type-graphql';
import { ISet } from '../../../../model/set.model';

@ObjectType()
export class Set implements ISet {
  @Field(id => String!)
  id: string;

  @Field(bandId => String!)
  bandId: string;

  @Field(name => String!)
  name: string;

  @Field(description => String!)
  description: string;

  @Field(songs => [String!]!)
  songs: string[];

  @Field(tags => [String!]!)
  tags: string[];
}
