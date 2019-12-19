import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { IBand } from '../../../model/band.model';
import { IUser } from '../../../model/user.model';
import { Apollo } from 'apollo-angular';

const GET_USER = gql`
  query user($id: String!) {
    user(id: $id) {
      bands
    }
  }
`;

const GET_BAND = gql`
  query band($id: String!) {
    band(id: $id) {
      name,
      songs,
      sets,
      members
    }
  }
`;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public bands!: IBand[];
  public userId: string;

  public constructor(private apollo: Apollo) {
    this.userId = '1afa3f3f-e693-4589-9c13-ac482109550a';
  }

  public async ngOnInit() {
    const user = await this.apollo.query<{user: IUser}>({
      query: GET_USER,
      variables: { id: this.userId }
    }).toPromise().then(r => r.data.user);
    this.bands = await Promise.all((user.bands as string[]).map(bandId => {
      return this.apollo.query<{ band: IBand }>({
        query: GET_BAND,
        variables: { id: bandId }
      }).toPromise().then(r => r.data.band);
    }));
  }
}
