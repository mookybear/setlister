import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { IUser } from '../../../../model/user.model';

@Injectable()
export class UserService {
  private userId: string;

  public constructor(private apollo: Apollo) {
    this.userId = '1afa3f3f-e693-4589-9c13-ac482109550a';
  }

  public async getUser(): Promise<IUser> {
    const query = gql`
      query user($id: String!) {
        user(id: $id) {
          id,
          bands
        }
      }
    `;
    const variables = { id: this.userId };
    const queryResult = await this.apollo
      .query<{ user: IUser }>({ query, variables })
      .toPromise();
    return queryResult.data.user;
  }
}
