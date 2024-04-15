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

  @Column({ nullable: true })
  title: string;

  @Column({ nullable: true })
  companionCnt: number;

  @Column({ nullable: true })
  companionType: string;

  @Column({ nullable: true })
  vehicle: string;

  @Column('varchar', { array: true, nullable: true })
  styles: string[];

  @Column({ nullable: true })
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
  @ManyToOne(() => User, (user) => user.trips, { onDelete: 'CASCADE' })
  user: User;

  @RelationId((trip: Trip) => trip.user)
  @Column()
  userId: number;
}
