import { Module } from '@nestjs/common';
import { InstaGuestUser } from '../entities/insta-guest-user.entity';
import { InstaGuestCollection } from '../entities/insta-guest-collection.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstagramController } from './instagram.controller';
import { InstagramService } from './instagram.service';
import { InstaGuestUserRepository } from 'src/repositories/insta-guest-user.repository';
import { InstaGuestCollectionRepository } from 'src/repositories/insta-guest-collection.repository';
import { PlaceModule } from 'src/place/place.module';
import { InstaGuestFolderRepository } from 'src/repositories/insta-guest-folder.repository';
import { InstaGuestFolderPlaceRepository } from 'src/repositories/insta-guest-folder-place.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([InstaGuestUser, InstaGuestCollection]),
    PlaceModule,
  ],
  controllers: [InstagramController],
  providers: [
    InstagramService,
    InstaGuestUserRepository,
    InstaGuestCollectionRepository,
    InstaGuestFolderRepository,
    InstaGuestFolderPlaceRepository,
  ],
})
export class InstagramModule {}
