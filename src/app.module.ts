import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { UsersModule } from './users/users.module';
import { AdoptionModule } from './adoption/adoption.module';
import { SponsorshipModule } from './sponsorship/sponsorship.module';

@Module({
  imports: [DogsModule, UsersModule, AdoptionModule, SponsorshipModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
