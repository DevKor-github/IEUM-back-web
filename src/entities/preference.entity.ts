import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Preference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 4 })
  mbti: string;

  @Column('varchar', { array: true })
  preferredRegion: string[];

  @Column('varchar', { array: true })
  preferredStyle: string[];

  @Column('varchar', { array: true })
  preferredCompanion: string[];

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
