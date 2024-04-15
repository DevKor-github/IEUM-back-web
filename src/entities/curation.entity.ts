import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CurationPlace } from './curation-place.entity';

@Entity()
export class Curation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  viewCount: number;

  @Column()
  likeCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;

  @RelationId((curation: Curation) => curation.user)
  @Column()
  userId: number;

  @OneToMany(() => CurationPlace, (curationPlace) => curationPlace.curation)
  curationPlaces: CurationPlace[];
}
