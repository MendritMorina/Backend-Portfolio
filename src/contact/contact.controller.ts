import {Body, Controller, Delete, Get, Param, Post, UseGuards} from "@nestjs/common";
import {ContactService} from "./contact.service";
import {SendEmailDto} from "./dto/send-email.dto";
import {AuthGuard} from "../guards/auth.guard";


@Controller('contacts')
export class ContactController {
  constructor(private readonly contactService: ContactService) {
  }

  @Post()
  async sendEmail(@Body() sendEmailDto: SendEmailDto) {
    return await this.contactService.sendEmail(sendEmailDto)
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAll() {
    return await this.contactService.getAllEmails()
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    return this.contactService.delete(id);
  }
}
