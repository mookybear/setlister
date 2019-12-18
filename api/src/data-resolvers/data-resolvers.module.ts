import { Module } from '@nestjs/common';
import { DataAccessModule } from 'src/data-access/data-access.module';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  imports: [DataAccessModule],
  providers: [UserResolver],
})
export class DataResolversModule {}
