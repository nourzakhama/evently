import { PartialType } from '@nestjs/mapped-types';
import { EventDto } from './eventDto.entity';


export class EventUpdateDto extends PartialType(EventDto) {
	
}