import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Place } from './place.entity';

@Entity()
export class AddressComponents {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  postalCode: string;

  @Column({ nullable: true })
  country: string;

  @Index()
  @Column({ nullable: true })
  administrativeAreaLevel1: string;

  @Column({ nullable: true })
  locality: string;

  @Column({ nullable: true })
  sublocalityLevel1?: string;

  @Column({ nullable: true })
  sublocalityLevel2?: string;

  @Column({ nullable: true })
  sublocalityLevel3?: string;

  @Column({ nullable: true })
  sublocalityLevel4?: string;

  @Column({ nullable: true })
  premise?: string;

  @Column({ nullable: true })
  subpremise?: string;

  @OneToOne(() => Place, (place) => place.addressComponents)
  @JoinColumn()
  place: Place;
}
