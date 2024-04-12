import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Place } from './place.entity';

@Entity()
export class OpenHours {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { array: true })
  opening: string[];

  @OneToOne(() => Place)
  @JoinColumn()
  place: Place;
}
