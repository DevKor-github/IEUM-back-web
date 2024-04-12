import { Injectable } from '@nestjs/common';
import { InstaGuestUserRepository } from '../repositories/insta-guest-user-repository';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { InstaGuestCollectionRepository } from 'src/repositories/insta-guest-collection-repository';
import { PlaceRepository } from 'src/repositories/place-repository';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class InstagramService {
  constructor(
    @InjectRepository(InstaGuestUserRepository)
    private readonly instaGuestUserRepository: InstaGuestUserRepository,
    @InjectRepository(InstaGuestCollectionRepository)
    private readonly instaGuestCollectionRepository: InstaGuestCollectionRepository,
    @InjectRepository(PlaceRepository)
    private readonly placeRepository: PlaceRepository,
  ) {}

  async parseCSV(file: Express.Multer.File): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const parsed: any[] = [];
      //module에서 지정한 ./uploads 경로가 file.path가 됨.
      fs.createReadStream(file.path)
        .pipe(csv())
        .on('data', async (row) => {
          console.log(row);
          parsed.push(row);
        })
        .on('end', () => {
          fs.unlink(file.path, (err) => {
            if (err) {
              console.error('파일 삭제 중 오류 발생:', err);
              reject(err);
            } else {
              console.log('파일 삭제 완료.');
              console.log('csv 파싱 완료.');
              resolve(parsed);
            }
          });
        })
        .on('error', (err) => {
          console.error('CSV 파싱 중 오류 발생:', err);
          reject(err);
        });
    });
  }
  @Transactional()
  async updateDB(csvContent: any[]) {
    for (const row of csvContent) {
      try {
        const instaGuestUserId =
          await this.instaGuestUserRepository.createInstaGuestUser({
            instaId: row.insta_id,
          });
        const placeId = await this.placeRepository.createPlace({
          name: row.name,
          address: row.address,
          latitude: row.latitude,
          longitude: row.longitude,
        });
        const instaGuestCollection =
          await this.instaGuestCollectionRepository.createInstaGuestCollection({
            instaGuestUserId: instaGuestUserId,
            placeId: placeId,
            link: row.link,
            content: row.content,
          });
      } catch (error) {
        throw new Error('Failed to update DB');
      }
    }
  }
}
