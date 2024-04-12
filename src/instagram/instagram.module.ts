import { Module } from '@nestjs/common';
import { InstaGuestUser } from '../entities/insta-guest-user.entity';
import { InstaGuestCollection } from '../entities/insta-guest-collection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { InstagramController } from './instagram.controller';
import { InstagramService } from './instagram.service';
import { InstaGuestUserRepository } from 'src/repositories/insta-guest-user-repository';
import { Place } from 'src/entities/place.entity';
import { InstaGuestCollectionRepository } from 'src/repositories/insta-guest-collection-repository';
import { PlaceRepository } from 'src/repositories/place-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([InstaGuestUser, InstaGuestCollection, Place]),
    MulterModule.register({
      dest: './src/instagram/uploads',
    }),
  ],
  controllers: [InstagramController],
  providers: [
    InstagramService,
    InstaGuestUserRepository,
    InstaGuestCollectionRepository,
    PlaceRepository,
  ],
})
export class InstagramModule {}
