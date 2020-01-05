import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ISet } from '../../../../model/set.model';

@Injectable()
export class SetService {

  public constructor(
    private apollo: Apollo
    ) {
  }

  public async getSets(bandId: string): Promise<ISet[]> {
    console.log(bandId);
    const query = gql`
      query setlists($bandId: String!) {
        setlists(bandId: $bandId) {
          id,
          songs
        }
      }
    `;
    const variables = { bandId };
    const queryResult = await this.apollo
      .query<{ setlists: ISet[] }>({ query, variables })
      .toPromise();
    return queryResult.data.setlists;
  }

  public async addSet(set: ISet): Promise<ISet['id']> {
    const mutation = gql`
      mutation {
        addSetlist(setlist: {
          songs: $songs,
          tags: $tags,
          name: $name,
          bandId: $bandId,
          description: $description
        }){
          id
        }
      }`;
    const variables = { ...set };
    const queryResult = await this.apollo
      .mutate<{ id: string }>({ mutation, variables })
      .toPromise();
    return queryResult.data.id;
  }

  public async removeSet(bandId: string, id: string): Promise<ISet['id']> {
    const mutation = gql`mutation {
      removeSetlist(bandId: $bandId, id: $id) {
        id
      }
    }`;
    const variables = { bandId, id };
    const queryResult = await this.apollo
      .mutate<{ id: string }>({ mutation, variables })
      .toPromise();
    return queryResult.data.id;
  }
}
