import { InputType, Field } from 'type-graphql';
import { ISet } from '../../../../model/set.model';

@InputType()
export class UpdatedSetInput implements ISet {
  @Field(type => String)
  id: string;

  @Field(type => String)
  bandId: string;

  @Field(type => String)
  name: string;

  @Field(type => String)
  description: string;

  @Field(type => [String])
  songs: string[];

  @Field(type => [String])
  tags: string[];
}
