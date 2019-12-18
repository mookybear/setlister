import { Module } from '@nestjs/common';
import { UserRepository } from './repositories/user.repository';
import { BandRepository } from './repositories/band.repository';
import { SongRepository } from './repositories/song.repository';
import { SetRepository } from './repositories/set.repository';

@Module({
  providers: [UserRepository, BandRepository, SongRepository, SetRepository],
  exports: [UserRepository, BandRepository, SongRepository, SetRepository],
})
export class DataAccessModule {}
