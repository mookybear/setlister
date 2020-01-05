import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { v4 } from 'uuid';
import { Band } from '../models/band';
import { BandDAO } from 'src/data-access/model/band.dao';
import { BandRepository } from 'src/data-access/repositories/band.repository';
import { NewBandInput } from '../args/new-band';
import { UpdatedBandInput } from '../args/updated-band';
import { toSet } from './transformers';

@Resolver((of: void) => Band)
export class BandResolver {
  public constructor(private readonly bandRepo: BandRepository) {}

  private fromDAO(dao: BandDAO): Band {
    const { songs, sets, members, ...partialBand } = dao;
    const songsArr = Array.from(songs.values());
    const setsArr = Array.from(sets.values());
    const membersArr = Array.from(members.values());
    const band: Band = Object.assign(new Band(), partialBand);
    band.songs = songsArr;
    band.sets = setsArr;
    band.members = membersArr;
    return band;
  }

  private toDAO(band: Band): BandDAO {
    const { songs, sets, members, ...partialBand } = band;
    const songsSet = toSet(band.songs);
    const setsSet = toSet(band.sets);
    const membersSet = toSet(band.members);
    const dao: BandDAO = Object.assign(
      new BandDAO(partialBand.id),
      partialBand,
    );
    dao.songs = songsSet;
    dao.sets = setsSet;
    dao.members = membersSet;
    return dao;
  }

  @Query(returns => Band)
  public async band(@Args('id') id: string): Promise<Band> {
    const outputDAO = await this.bandRepo.get(new BandDAO(id));
    return this.fromDAO(outputDAO);
  }

  @Mutation(returns => Band)
  async addBand(@Args('band') newBand: NewBandInput): Promise<Band> {
    const band: Band = Object.assign(new Band(), newBand);
    band.id = v4();
    const inputDAO = this.toDAO(band);
    const outputDAO = await this.bandRepo.put(inputDAO);
    return this.fromDAO(outputDAO);
  }

  @Mutation(returns => Band)
  async updateBand(@Args('band') band: UpdatedBandInput): Promise<Band> {
    const inputDAO = this.toDAO(band);
    const outputDAO = await this.bandRepo.update(inputDAO);
    return this.fromDAO(outputDAO);
  }

  @Mutation(returns => Band)
  async removeBand(@Args('id') id: string): Promise<Band> {
    const dao = new BandDAO(id);
    const removedBand = await this.bandRepo.delete(dao);
    return this.fromDAO(removedBand);
  }
}
