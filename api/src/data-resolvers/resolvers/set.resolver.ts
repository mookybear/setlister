import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { v4 } from 'uuid';
import { Set as Setlist } from '../models/set';
import { SetDAO } from 'src/data-access/model/set.dao';
import { SetRepository } from 'src/data-access/repositories/set.repository';
import { NewSetInput } from '../args/new-set';
import { UpdatedSetInput } from '../args/updated-set';
import { toSet } from './transformers';

@Resolver((of: void) => Setlist)
export class SetResolver {

  public constructor(private readonly setRepo: SetRepository) {}

  private fromDAO(dao: SetDAO): Setlist {
    const { tags, ...partialSet } = dao;
    const tagsArr = Array.from(tags.values());
    const set: Setlist = Object.assign(new Setlist(), partialSet);
    set.songs = dao.songs.split(',');
    set.tags = tagsArr;
    return set;
  }

  private toDAO(set: Setlist): SetDAO {
    const { tags, ...partialSet } = set;
    const tagsSet = toSet(set.tags);
    const dao: SetDAO = Object.assign(new SetDAO(partialSet.id), partialSet);
    dao.songs = set.songs.join(',');
    dao.tags = tagsSet;
    return dao;
  }

  @Query(returns => Setlist)
  public async setlist(@Args('id') id: string, @Args('bandId') bandId: string): Promise<Setlist> {
    const inputDAO = new SetDAO(id);
    inputDAO.bandId = bandId;
    const outputDAO = await this.setRepo.get(inputDAO);
    return this.fromDAO(outputDAO);
  }

  @Mutation(returns => Setlist)
  async addSetlist(
    @Args('setlist') newSet: NewSetInput,
  ): Promise<Setlist> {
    const set: Setlist = Object.assign(new Setlist(), newSet);
    set.id = v4();
    const inputDAO = this.toDAO(set);
    const outputDAO = await this.setRepo.put(inputDAO);
    return this.fromDAO(outputDAO);
  }

  @Mutation(returns => Setlist)
  async updateSetlist(
    @Args('setlist') set: UpdatedSetInput,
  ): Promise<Setlist> {
    const inputDAO = this.toDAO(set);
    const outputDAO = await this.setRepo.update(inputDAO);
    return this.fromDAO(outputDAO);
  }

  @Mutation(returns => Setlist)
  async removeSetlist(@Args('bandId') bandId: string, @Args('id') id: string): Promise<Setlist> {
    const dao = new SetDAO(id);
    dao.bandId = bandId;
    const removedSet = await this.setRepo.delete(dao);
    return this.fromDAO(removedSet);
  }
}
