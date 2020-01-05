import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { IBand } from '../../../../model/band.model';
import { UserService } from './user.service';

@Injectable()
export class BandService {

  public constructor(private apollo: Apollo) {
  }

  public async getBand(bandId: string): Promise<IBand> {
    const query = gql`
      query band($id: String!) {
        band(id: $id) {
          id,
          name,
          songs,
          sets,
          members
        }
      }
    `;
    const variables = { id: bandId };
    const queryResult = await this.apollo.query<{ band: IBand }>({ query, variables }).toPromise();
    return queryResult.data.band;
  }
}
