import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { InstaGuestCollection } from './insta-guest-collection.entity';
import { PlaceCategory } from './place-category.entity';
import { PlaceTag } from './place-tag.entity';
import { OpenHours } from './open-hours.entity';
import { AddressComponents } from './address-components.entity';
import { InstaGuestFolder } from './insta-guest-folder.entity';

@Entity()
export class Place {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  address: string;

  @Column('decimal', { nullable: true })
  latitude: number; //위도

  @Column('decimal', { nullable: true })
  longitude: number; //경도

  @Column({ nullable: true })
  googlePlaceId: string; //googlePlaceId 필요

  @Column({ nullable: true })
  phoneNumber: string; //전화번호

  @Column({ nullable: true })
  primaryCategory: string; //주요 카테고리

  //인스타 게스트 컬렉션
  @OneToMany(
    () => InstaGuestCollection,
    (instaGuestCollection) => instaGuestCollection.place,
  )
  instaGuestCollections: InstaGuestCollection[];

  //장소-카테고리
  @OneToMany(() => PlaceCategory, (placeCategory) => placeCategory.place)
  placeCategories: PlaceCategory[];

  //장소-태그
  @OneToMany(() => PlaceTag, (placeTag) => placeTag.place)
  placeTags: PlaceTag[];

  //장소-영업시간
  @OneToOne(() => OpenHours, (openHours) => openHours.place)
  openHours: OpenHours;

  //장소-주소 요소
  @OneToOne(
    () => AddressComponents,
    (addressComponents) => addressComponents.place,
  )
  addressComponents: AddressComponents;

  @OneToMany(
    () => InstaGuestFolder,
    (instaGuestFolder) => instaGuestFolder.instaGuestFolderPlaces,
  )
  instaGuestFolderPlaces: InstaGuestFolder[];
}
