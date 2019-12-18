import { Module } from '@nestjs/common';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { UserResolver } from './resolvers/user.resolver';
import { SongResolver } from './resolvers/song.resolver';
import { SetResolver } from './resolvers/set.resolver';
import { BandResolver } from './resolvers/band.resolver';

@Module({
  imports: [DataAccessModule],
  providers: [UserResolver, SongResolver, SetResolver, BandResolver],
})
export class DataResolversModule {}
