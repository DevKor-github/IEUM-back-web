import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PlaceOpenHour } from './place-open-hour.entity';

@Entity()
export class OpenHour {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 30 })
  opening: string;

  @OneToMany(() => PlaceOpenHour, (placeOpenHour) => placeOpenHour.openHour)
  placeOpenHours: PlaceOpenHour[];
}
