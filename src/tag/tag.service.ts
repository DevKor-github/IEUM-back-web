import { Injectable } from '@nestjs/common';
import { TagRepository } from 'src/repositories/tag.repository';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async getTag(tagId: number) {
    return await this.tagRepository.findOne({ where: { id: tagId } });
  }

  async createTag() {}

  async updateTag() {}

  async deleteTag() {}
}
