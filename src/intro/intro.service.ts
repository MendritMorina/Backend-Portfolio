import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Intro} from "./entities/intro.entity";
import {CreateIntroDto} from "./dtos/create-intro.dto";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class IntroService {
    private readonly baseUrl = this.configService.get<string>('UPLOAD_FILE');

    constructor(
        @InjectRepository(Intro)
        private readonly introRepository: Repository<Intro>,
        private configService: ConfigService,
    ) {
    }

    async find(): Promise<Intro> {
        const [intro] = await this.introRepository.find({
            order: {createdAt: 'DESC'},
        });
        return intro;
    }

    async upsertIntro(file: Express.Multer.File, createIntroDto: CreateIntroDto): Promise<Intro> {
        const intros = await this.introRepository.find();

        let intro: Intro;


        if (intros.length > 0) {
            intro = intros[0];
            intro.name = createIntroDto.name;
            intro.content = createIntroDto.content;
            intro.description = createIntroDto.description;
            intro.pdfUrl = file ? `${this.baseUrl}public/${file?.filename}` : intro?.pdfUrl;
        } else {
            intro = this.introRepository.create({
                name: createIntroDto.name,
                content: createIntroDto.content,
                description: createIntroDto.description,
                pdfUrl: file ? `${this.baseUrl}public/${file?.filename}` : intros[0]?.pdfUrl,
            });
        }
        return await this.introRepository.save(intro);
    }
}
