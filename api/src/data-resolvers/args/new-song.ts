import { InputType, Field } from 'type-graphql';
import { ISong } from '../../../../model/song.model';
import { Key } from '../../../../model/enums/key.enum';
import { Mode } from '../../../../model/enums/mode.enum';

@InputType()
export class NewSongInput implements Partial<ISong> {

  @Field(type => String)
  bandId: string;

  @Field(type => String)
  title: string;

  @Field(type => String)
  artist: string;

  @Field(type => String)
  key: Key;

  @Field(type => String)
  mode: Mode;

  @Field(type => Number)
  tempo: number;

  @Field(type => [Number, Number])
  timeSignature: [number, number];

  @Field(type => [String])
  leaders: string[];

  @Field(type => [String])
  tags: string[];
}
