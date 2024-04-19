import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Project} from "./entities/project.entity";
import {CreateProjectDto} from "./dtos/create-project.dto";
import {UpdateProjectDto} from "./dtos/update-project.dto";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class ProjectService {
  private readonly baseUrl = this.configService.get<string>('UPLOAD_FILE');

  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    private configService: ConfigService,
  ) {
  }

  async findAll(): Promise<Project[]> {
    return await this.projectRepository.find({
      order: {createdAt: 'DESC'},
    });
  }

  async create(file: Express.Multer.File, createProjectDto: CreateProjectDto): Promise<Project> {
    const experience = this.projectRepository.create({
      content: createProjectDto.content,
      description: createProjectDto.description,
      imageUrl: `${this.baseUrl}public/${file?.filename}`,
      link: createProjectDto.link,
      title: createProjectDto.title,
      period: createProjectDto.period,
      personal: createProjectDto.personal == 'true',
      technologies: createProjectDto.technologies,
    });
    return await this.projectRepository.save(experience);
  }

  async update(file: Express.Multer.File, id: string, updateProjectDto: UpdateProjectDto): Promise<Project> {
    const project = await this.projectRepository.findOne({where: {id: id}});
    await this.projectRepository.update(id, {
      id: id,
      content: updateProjectDto.content,
      description: updateProjectDto.description,
      imageUrl: file ? `${this.baseUrl}public/${file?.filename}`: project?.imageUrl,
      link: updateProjectDto.link,
      title: updateProjectDto.title,
      period: updateProjectDto.period,
      personal: updateProjectDto.personal == 'true',
      technologies: updateProjectDto.technologies,
    });
    return project
  }

  async delete(id: string): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
