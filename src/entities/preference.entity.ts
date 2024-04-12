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

  @Column('text', { array: true })
  preferredRegion: string[];

  @Column('text', { array: true })
  preferredStyle: string[];

  @Column('text', { array: true })
  preferredCompanion: string[];

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
