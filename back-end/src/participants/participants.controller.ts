import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @Post()
  create(@Body() createParticipantDto: CreateParticipantDto) {
    return this.participantsService.create(createParticipantDto);
  }

  @Get('/:query')
  findAll(@Param('query') query: string) {
    return this.participantsService.findAll(query);
  }

  @Get()
  findOne() {
    return this.participantsService.find();
  }
  // @Get('/:id')
  // findOnebyClerkId(@Param('id') id: string) {
  //   return this.participantsService.findOnebyClerkId(id);
  // }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantsService.update(id, updateParticipantDto);
  }
  @Patch('/clerk/:id')
  updateClerk(@Param('id') id: string, @Body() updateParticipantDto: UpdateParticipantDto) {
    return this.participantsService.updateClerk(id, updateParticipantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.participantsService.remove(+id);
  }

  @Delete('/clerk/:id')
  removeClerk(@Param('id') id: string) {
    return this.participantsService.removeClerk(id);
  }
}
