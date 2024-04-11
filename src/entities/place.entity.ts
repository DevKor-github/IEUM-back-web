import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { InstaGuestCollection } from './insta-guest-collection.entity';
import { PlaceSchedule } from './place-schedule.entity';
import { CurationPlace } from './curation-place.entity';
import { PlaceCategory } from './place-category.entity';
import { PlaceTag } from './place-tag.entity';
import { PlaceOpenHour } from './place-open-hour.entity';
import { PlaceImage } from './place-image.entity';

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 50 })
  name: string;

  @Column('varchar', { length: 100, nullable: true })
  address: string;

  @Column('decimal', { nullable: true })
  latitude: number; //위도

  @Column('decimal', { nullable: true })
  longitude: number; //경도

  //인스타 게스트 컬렉션
  @OneToMany(
    () => InstaGuestCollection,
    (instaGuestCollection) => instaGuestCollection.place,
  )
  instaGuestCollections: InstaGuestCollection[];

  //장소 스케쥴
  @OneToMany(() => PlaceSchedule, (placeSchedule) => placeSchedule.place)
  placeSchedules: PlaceSchedule[];

  //큐레이션-장소
  @OneToMany(() => CurationPlace, (curationPlace) => curationPlace.place)
  curationPlaces: CurationPlace[];

  //장소-카테고리
  @OneToMany(() => PlaceCategory, (placeCategory) => placeCategory.place)
  placeCategories: PlaceCategory[];

  //장소-태그
  @OneToMany(() => PlaceTag, (placeTag) => placeTag.place)
  placeTags: PlaceTag[];

  //장소-영업시간
  @OneToMany(() => PlaceOpenHour, (placeOpenHour) => placeOpenHour.place)
  placeOpenHours: PlaceOpenHour[];

  //장소-이미지
  @OneToMany(() => PlaceImage, (placeImage) => placeImage.place)
  placeImages: PlaceImage[];
}
