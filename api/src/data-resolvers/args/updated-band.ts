import { InputType, Field } from 'type-graphql';
import { IBand } from '../../../../model/band.model';

@InputType()
export class UpdatedBandInput implements IBand {
  @Field(type => String)
  id: string;

  @Field(type => String)
  name: string;

  @Field(type => [String])
  songs: string[];

  @Field(type => [String])
  sets: string[];

  @Field(type => [String])
  members: string[];
}
