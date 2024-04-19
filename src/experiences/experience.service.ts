import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Experience} from "./entities/experience.entity";
import {CreateExperienceDto} from "./dtos/create-experience.dto";
import {UpdateExperienceDto} from "./dtos/update-experience.dto";

@Injectable()
export class ExperienceService {
  constructor(
    @InjectRepository(Experience)
    private readonly experienceRepository: Repository<Experience>,
  ) {
  }

  async findAll(): Promise<Experience[]> {
    return await this.experienceRepository.find({
      order: {createdAt: 'DESC'},
    });
  }

  async create(createExperienceDto: CreateExperienceDto): Promise<Experience> {
    const experience = this.experienceRepository.create({
      title: createExperienceDto.title,
      description: createExperienceDto.description,
      company: createExperienceDto.company,
      period: createExperienceDto.period,
    });
    return await this.experienceRepository.save(experience);
  }

  async update(id: string, updateExperienceDto: UpdateExperienceDto): Promise<Experience> {
    await this.experienceRepository.update(id, {
      id: id,
      title: updateExperienceDto.title,
      description: updateExperienceDto.description,
      company: updateExperienceDto.company,
      period: updateExperienceDto.period,
    });
    return this.experienceRepository.findOne({where: {id: id}});
  }

  async delete(id: string): Promise<void> {
    await this.experienceRepository.delete(id);
  }
}
