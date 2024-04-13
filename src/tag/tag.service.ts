import { CreateTagReqDto } from './dtos/create-tag-req.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TagRepository } from 'src/repositories/tag.repository';
import { TagResDto } from './dtos/tag-res.dto';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async getAllTags(): Promise<TagResDto[]> {
    const tagsList = await this.tagRepository.find();
    return tagsList.map((tag) => new TagResDto(tag));
  }

  async getTag(tagId: number): Promise<TagResDto> {
    const tag = await this.tagRepository.findOne({ where: { id: tagId } });
    if (!tag) throw new NotFoundException('Tag not found');
    return new TagResDto(tag);
  }

  async createTag(createTagReqDto: CreateTagReqDto): Promise<TagResDto> {
    const existedTag = await this.tagRepository.findOne({
      where: { tagName: createTagReqDto.tagName },
    });
    if (existedTag) {
      return new TagResDto(existedTag);
    }
    return new TagResDto(
      await this.tagRepository.save({ tagName: createTagReqDto.tagName }),
    );
  }

  async deleteTag() {}
}
