import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ISong } from '../../../../model/song.model';

@Injectable()
export class SongService {

  public constructor(private apollo: Apollo) {

  }

  public async getSongs(bandId: string): Promise<ISong[]> {
    const query = gql`
    query songs($bandId: String!) {
      songs(bandId: $bandId) {
        id,
        title,
        tempo,
        timeSignature,
        key,
        mode,
        artist,
        leaders,
      }
    }
    `;
    const variables = { bandId };
    const queryResult = await this.apollo
      .query<{ songs: ISong[] }>({ query, variables })
      .toPromise();
    return queryResult.data.songs;
  }

  public async addSong(song: ISong): Promise<ISong['id']> {
    const mutation = gql`mutation {
      addSong(song: {
        title: $title
        key: $key,
        mode: $mode,
        tempo: $tempo,
        timeSignature: $timeSignature,
        artist: $artist,
        tags: $tags,
        bandId: $bandId,
        leaders: $leaders
      }) {
        id
      }
    }`;
    const variables = { ...song };
    const queryResult = await this.apollo
      .mutate<{ id: string }>({ mutation, variables })
      .toPromise();
    return queryResult.data.id;
  }

  public async removeSong(bandId: string, id: string): Promise<ISong['id']> {
    const mutation = gql`mutation {
      removeSong(bandId: $bandId, id:$id) {
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
