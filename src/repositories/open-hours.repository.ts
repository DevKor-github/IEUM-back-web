import { Injectable } from '@nestjs/common';
import { OpenHours } from 'src/entities/open-hours.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OpenHoursRepository extends Repository<OpenHours> {
  private openHoursRepository: Repository<OpenHours>;

  constructor(private readonly dataSource: DataSource) {
    super(OpenHours, dataSource.createEntityManager());
  }
}
