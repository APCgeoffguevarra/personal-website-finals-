import { Controller, Get, Post, Body } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly guestbookService: GuestbookService) {}

  @Get()
  getAll() {
    return this.guestbookService.getMessages();
  }

  @Post()
  create(@Body() body: { name: string; message: string }) {
    return this.guestbookService.addMessage(body.name, body.message);
  }
}