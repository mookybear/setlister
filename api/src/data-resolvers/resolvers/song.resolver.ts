import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { v4 } from 'uuid';
import { Song } from '../models/song';
import { SongDAO } from 'src/data-access/model/song.dao';
import { SongRepository } from 'src/data-access/repositories/song.repository';
import { NewSongInput } from '../args/new-song';
import { UpdatedSongInput } from '../args/updated-song';
import { toSet } from './transformers';

@Resolver((of: void) => Song)
export class SongResolver {
  public constructor(private readonly songRepo: SongRepository) {}

  private fromDAO(dao: SongDAO): Song {
    const { leaders, tags, ...partialSong } = dao;
    const leadersArr = Array.from(leaders.values());
    const tagsArr = Array.from(tags.values());
    const song: Song = Object.assign(new Song(), partialSong);
    song.leaders = leadersArr;
    song.tags = tagsArr;
    return song;
  }

  private toDAO(song: Song): SongDAO {
    const { leaders, tags, ...partialSong } = song;
    const leadersSet = toSet(song.leaders);
    const tagsSet = toSet(song.tags);
    const dao: SongDAO = Object.assign(
      new SongDAO(partialSong.id),
      partialSong,
    );
    dao.leaders = leadersSet;
    dao.tags = tagsSet;
    return dao;
  }

  @Query(returns => Song)
  public async song(
    @Args('id') id: string,
    @Args('bandId') bandId: string,
  ): Promise<Song> {
    const inputDAO = new SongDAO(id);
    inputDAO.bandId = bandId;
    const outputDAO = await this.songRepo.get(inputDAO);
    return this.fromDAO(outputDAO);
  }

  @Query(returns => [Song])
  public async songs(
    @Args('bandId') bandId: string,
  ): Promise<Song[]> {
    const outputDAOs = await this.songRepo.getMultiple(SongDAO, { bandId });
    const songs: Song[] = outputDAOs.map(d => this.fromDAO(d));
    return songs;
  }

  @Mutation(returns => Song)
  async addSong(@Args('song') newSong: NewSongInput): Promise<Song> {
    const song: Song = Object.assign(new Song(), newSong);
    song.id = v4();
    const inputDAO = this.toDAO(song);
    const outputDAO = await this.songRepo.put(inputDAO);
    return this.fromDAO(outputDAO);
  }

  @Mutation(returns => Song)
  async updateSong(@Args('song') song: UpdatedSongInput): Promise<Song> {
    const inputDAO = this.toDAO(song);
    const outputDAO = await this.songRepo.update(inputDAO);
    return this.fromDAO(outputDAO);
  }

  @Mutation(returns => Song)
  async removeSong(
    @Args('id') id: string,
    @Args('bandId') bandId: string,
  ): Promise<Song> {
    const dao = new SongDAO(id);
    dao.bandId = bandId;
    const removedSong = await this.songRepo.delete(dao);
    return this.fromDAO(removedSong);
  }
}
