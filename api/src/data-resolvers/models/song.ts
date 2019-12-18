import { Field, ObjectType } from 'type-graphql';
import { ISong } from '../../../../model/song.model';
import { Key } from '../../../../model/enums/key.enum';
import { Mode } from '../../../../model/enums/mode.enum';

@ObjectType()
export class Song implements ISong {
  @Field(id => String!)
  id: string;

  @Field(bandId => String!)
  bandId: string;

  @Field(title => String!)
  title: string;

  @Field(artist => String!)
  artist: string;

  @Field(key => String!)
  key: Key;

  @Field(mode => String!)
  mode: Mode;

  @Field(tempo => Number!)
  tempo: number;

  @Field(timeSignature => [Number, Number]!)
  timeSignature: [number, number];

  @Field(leaders => [String!]!)
  leaders: string[];

  @Field(tags => [String!]!)
  tags: string[];
}
