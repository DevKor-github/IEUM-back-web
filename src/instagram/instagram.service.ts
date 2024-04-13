import { Injectable } from '@nestjs/common';
import { InstaGuestUserRepository } from '../repositories/insta-guest-user-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { InstaGuestCollectionRepository } from 'src/repositories/insta-guest-collection-repository';
import { CreateInstaGuestUserDto } from './dto/create-insta-guest-user-dto';
import { CreateInstaGuestCollectionDto } from './dto/create-insta-guest-collection-dto';
import { InstaGuestCollection } from 'src/entities/insta-guest-collection.entity';
import { InstaGuestUser } from 'src/entities/insta-guest-user.entity';

@Injectable()
export class InstagramService {
  constructor(
    @InjectRepository(InstaGuestUserRepository)
    private readonly instaGuestUserRepository: InstaGuestUserRepository,
    @InjectRepository(InstaGuestCollectionRepository)
    private readonly instaGuestCollectionRepository: InstaGuestCollectionRepository,
  ) {}

  async createInstaGuestUser(
    createInstaGuestUserDto: CreateInstaGuestUserDto,
  ): Promise<InstaGuestUser> {
    try {
      const instaGuestUser =
        await this.instaGuestUserRepository.createInstaGuestUser(
          createInstaGuestUserDto,
        );
      return instaGuestUser;
    } catch (error) {
      throw new Error('Failed to update insta-guest-user table');
    }
  }

  async createInstaGuestCollection(
    createInstaGuestCollectionDto: CreateInstaGuestCollectionDto,
  ): Promise<InstaGuestCollection> {
    try {
      const newInstaGuestCollection =
        await this.instaGuestCollectionRepository.createInstaGuestCollection(
          createInstaGuestCollectionDto,
        );
      return newInstaGuestCollection;
    } catch (error) {
      throw new Error('Failed to create instaGuestCollection records.');
    }
  }
}
