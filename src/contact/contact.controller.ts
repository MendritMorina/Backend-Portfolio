import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    UseGuards
} from "@nestjs/common";
import {ContactService} from "./contact.service";
import {SendEmailDto} from "./dto/send-email.dto";
import {AuthGuard} from "../guards/auth.guard";
import {ErrorLogService} from "../errors/error.service";

@Controller('contacts')
export class ContactController {
    constructor(private readonly contactService: ContactService, private readonly errorLogService: ErrorLogService) {
    }

    @Post()
    @HttpCode(HttpStatus.ACCEPTED)
    async sendEmail(@Body() sendEmailDto: SendEmailDto) {
        try {
            return await this.contactService.sendEmail(sendEmailDto)
        } catch (err) {
            console.log(err);
            await this.errorLogService.saveError({
                controllerName: 'ContactController',
                body: err,
                method: 'POST',
                createdAt: new Date()
            })
            throw new HttpException('NotSend', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    async getAll() {
        try {
            return await this.contactService.getAllEmails();
        } catch (err) {
            console.log(err);
            await this.errorLogService.saveError({
                controllerName: 'ContactController',
                body: err,
                method: 'GET',
                createdAt: new Date()
            })
            throw new HttpException('NotFound', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    @UseGuards(AuthGuard)
    async delete(@Param('id') id: string): Promise<void> {
        try {
            return this.contactService.delete(id);
        } catch (err) {
            console.log(err);
            await this.errorLogService.saveError({
                controllerName: 'ContactController',
                body: err,
                method: 'DELETE',
                createdAt: new Date()
            })
            throw new HttpException('NotDeleted', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
