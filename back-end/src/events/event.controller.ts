import { Body, Controller, Delete, Get, Param, Patch, Post, Query, RawBody } from "@nestjs/common";
import { EventDto } from "./eventDto/eventDto.entity";
import { EventService } from "./event.service";
import { EventUpdateDto } from "./eventDto/eventUpdateDto.entity";

@Controller("event")
export class EventController{
    constructor(private readonly eventService:EventService){}
    @Get()
    getEvents(){
    return this.eventService.getEvents();
    }
    @Get(':id')
    getById(@Param('id')id:string){
        return this.eventService.getById(+id);
    }
    @Get('participant/:id')
        getParticipant(@Param('id')userId:string){
          try{
      return this.eventService.getEventsByParticipant(userId);
  }catch(error){
    console.error('Error in controller:', error);
  }
}
@Get('creator/:creatorId')
getEventsByCreator(@Param('creatorId')creatorId:string){
  try{
return this.eventService.getEventsByCreator(creatorId);
}catch(error){
console.error('Error in controller:', error);
}
}

    @Get('search/:query/:page/:limit')
    async getEventsearch(
      @Param('query') query: string,
      @Param('page') page: string,
      @Param('limit') limit: string,
    ) {
      try {
        const pageNumber = isNaN(+page) ? 1 : +page;
        const limitNumber = isNaN(+limit) ? 6 : +limit;
    
        return await this.eventService.getEventSearch(query, pageNumber, limitNumber);
      } catch (error) {
        console.error('Error in controller:', error);
        throw new Error('Internal server error.');
      }
    }




   
 @Post('search/:query/:category/:page/:limit')
    async getEventsByTitle(
      @Param('query') query: string,
      @Param('category') category: string,
      @Param('page') page: string,
      @Param('limit') limit: string,
    ) {
      try {
        const pageNumber = isNaN(+page) ? 1 : +page;
        const limitNumber = isNaN(+limit) ? 6 : +limit;
    
        return await this.eventService.getEventsByTitle(query,category, pageNumber, limitNumber);
      } catch (error) {
        console.error('Error in controller:', error);
        throw new Error('Internal server error.');
      }
    }
    @Post('categories')
    getcategories(){
    return this.eventService.getCategories();
    }
  @Post('category/:category')
  getEventsByCategory(@Param('category')category:string){
    return this.eventService.getEventsByCategory(category);
  }
    @Post()
    createEvent(@Body()eventDto:EventDto){
        this.eventService.createEvent(eventDto);
    }
    @Post("/inscription/:eventId/:participantId")
    inscription(@Param("eventId")eventId:number,@Param("participantId")participantId:number){
      return  this.eventService.addParticipant(eventId,participantId);
    }

    @Patch(':id')
    updateEvent(@Param('id')id:string,@Body()event:EventUpdateDto){
       return this.eventService.updateEvent(+id,event);
    }
    @Delete(':id')
    deleteevent(@Param('id')id:string){
        return this.eventService.deleteEvent(+id);
    }
}