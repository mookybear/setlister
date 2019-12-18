import { Field, ObjectType } from 'type-graphql';
import { IBand } from '../../../../model/band.model';

@ObjectType()
export class Band implements IBand {
  @Field(id => String!)
  id: string;

  @Field(name => String!)
  name: string;

  @Field(members => [String!]!)
  members: string[];

  @Field(songs => [String!]!)
  songs: string[];

  @Field(tags => [String!]!)
  tags: string[];
}
