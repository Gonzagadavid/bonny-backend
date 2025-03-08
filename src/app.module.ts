import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import { UsersModule } from './users/users.module';
import { AdoptionModule } from './adoption/adoption.module';
import { SponsorshipModule } from './sponsorship/sponsorship.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DonationsModule } from './donations/donations.module';

@Module({
  imports: [
    DogsModule,
    UsersModule,
    AdoptionModule,
    SponsorshipModule,
    MongooseModule.forRoot(process.env.DB_URL ?? ''),
    ConfigModule.forRoot(),
    DonationsModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
