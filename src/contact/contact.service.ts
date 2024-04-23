import {Injectable} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import {ConfigService} from "@nestjs/config";
import {SendEmailDto} from "./dto/send-email.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Contact} from "./entities/contact.entity";
import {Repository} from "typeorm";

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(Contact)
        private readonly contactRepository: Repository<Contact>,
        private configService: ConfigService,
    ) {
    }

    async sendEmail(sendEmailDto: SendEmailDto): Promise<{ message: string }> {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.configService.get<string>('SMTP_EMAIL'),
                pass: this.configService.get<string>('SMTP_APP_PASSWORD'),
            },
        });

        let mailConfigs = {
            from: this.configService.get<string>('SMTP_EMAIL'),
            to: this.configService.get<string>('SMTP_EMAIL'),
            subject: `Message from name: ${sendEmailDto.name} ${sendEmailDto.lastName} email: ${sendEmailDto.email}`,
            text: sendEmailDto.message,
        };

        const contact = this.contactRepository.create({
            name: sendEmailDto.name,
            lastName: sendEmailDto.lastName,
            email: sendEmailDto.email,
            message: sendEmailDto.message,
        });
        await this.contactRepository.save(contact);

        try {
            await transporter.sendMail(mailConfigs);
            return {message: 'Email sent successfully'};
        } catch (error) {
            console.error(error);
            throw new Error('An error occurred while sending the email');
        }
    }

    async getAllEmails(): Promise<Contact[]> {
        return await this.contactRepository.find({
            order: {createdAt: 'DESC'},
        });
    }

    async delete(id: string): Promise<void> {
        await this.contactRepository.delete(id);
    }
}
