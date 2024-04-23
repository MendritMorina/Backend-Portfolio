import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {About} from "./entities/about.entity";
import {CreateAboutDto} from "./dtos/create-about.dto";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AboutService {
    private readonly baseUrl = this.configService.get<string>('UPLOAD_FILE');

    constructor(
        @InjectRepository(About)
        private readonly aboutRepository: Repository<About>,
        private configService: ConfigService,
    ) {
    }

    async find(): Promise<About> {
        const [about] = await this.aboutRepository.find({
            order: {createdAt: 'DESC'},
        });
        return about;
    }

    async upsertAbout(file: Express.Multer.File, createAboutDto: CreateAboutDto): Promise<About> {
        const abouts = await this.aboutRepository.find();

        let about: About;

        if (abouts.length > 0) {
            about = abouts[0];
            about.imageUrl = file ? `${this.baseUrl}public/${file?.filename}` : about?.imageUrl;
            about.descriptionOne = createAboutDto.descriptionOne;
            about.descriptionTwo = createAboutDto.descriptionTwo;
            about.skills = createAboutDto.skills;
        } else {
            about = this.aboutRepository.create({
                imageUrl: file ? `${this.baseUrl}public/${file?.filename}` : abouts[0]?.imageUrl,
                descriptionOne: createAboutDto.descriptionOne,
                descriptionTwo: createAboutDto.descriptionTwo,
                skills: createAboutDto.skills
            });
        }
        return await this.aboutRepository.save(about);
    }
}
