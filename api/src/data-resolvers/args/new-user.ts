import { InputType, Field } from 'type-graphql';
import { IUser } from '../../../../model/user.model';

@InputType()
export class NewUserInput implements Partial<IUser> {
  @Field(type => [String])
  bands: string[];
}
