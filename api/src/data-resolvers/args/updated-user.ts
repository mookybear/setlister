import { InputType, Field } from 'type-graphql';
import { IUser } from '../../../../model/user.model';

@InputType()
export class UpdatedUserInput implements IUser {
  @Field(type => String)
  id: string;

  @Field(type => [String])
  bands: string[];
}
