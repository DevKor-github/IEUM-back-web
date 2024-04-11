import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { Place } from './place.entity';
import { OpenHour } from './open-hour.entity';

@Entity()
export class PlaceOpenHour {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Place, (place) => place.placeOpenHours)
  place: Place;

  @RelationId((placeOpenHour: PlaceOpenHour) => placeOpenHour.place)
  @Column()
  placeId: number;

  @ManyToOne(() => OpenHour, (openHour) => openHour.placeOpenHours)
  openHour: OpenHour;
}
