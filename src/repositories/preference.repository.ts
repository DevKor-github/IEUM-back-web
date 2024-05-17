import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserPreferenceDto } from 'src/auth/dtos/first-login-dto';
import { Preference } from 'src/entities/preference.entity';

@Injectable()
export class PreferenceRepository extends Repository<Preference> {
  constructor(dataSource: DataSource) {
    super(Preference, dataSource.createEntityManager());
  }

  async fillUserPreference(userPreferenceDto: UserPreferenceDto, id: number) {
    const userPreference = this.create({ ...userPreferenceDto, userId: id });
    await this.save(userPreference);
  }
}
