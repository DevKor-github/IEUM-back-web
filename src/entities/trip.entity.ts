import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';
import { PlaceSchedule } from './place-schedule.entity';
import { AccommodationSchedule } from './accomodation-schedule.entity';
import { User } from './user.entity';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30, nullable: true })
  title: string;

  @Column('int', { nullable: true })
  companionCnt: number;

  @Column('text', { nullable: true })
  companionType: string;

  @Column('varchar', { length: 20, nullable: true })
  vehicle: string;

  @Column('text', { array: true, nullable: true })
  styles: string[];

  @Column('numeric', { precision: 15, scale: 4, nullable: true })
  budget: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  //Accommodation Relation
  @OneToMany(
    () => AccommodationSchedule,
    (accommodationSchedule) => accommodationSchedule.trip,
  )
  accommodationSchedules: AccommodationSchedule[];

  //PlaceSchedule Relation
  @OneToMany(() => PlaceSchedule, (placeSchedule) => placeSchedule.trip)
  placeSchedules: PlaceSchedule[];

  //User Relation
  @ManyToOne(() => User, (user) => user.trips)
  user: User;

  @RelationId((trip: Trip) => trip.user)
  @Column()
  userId: string;
}
