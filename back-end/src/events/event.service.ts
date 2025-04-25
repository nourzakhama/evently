import { DataSource, Like, Repository } from "typeorm";
import { Event } from "./entity/event.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { EventDto } from "./eventDto/eventDto.entity";
import { EventUpdateDto } from "./eventDto/eventUpdateDto.entity";

export class EventService {
    constructor(@InjectRepository(Event)
     public  eventRepository: Repository<Event>,
    private readonly dataSource:DataSource) {}

    getEvents(): Promise<Event[]> {
        try {
            return this.eventRepository.find();
        } catch (error) {
            console.error("probleme lors de la recuperation des evenements", error);
        }
    }

    getById(id: number): Promise<Event> {
        try {
            return this.eventRepository.findOneById(id);
        } catch (error) {
            console.error("probleme lors de la recuperation de l'evenement", error);
        }
    }
   async getEventSearch(query: string, page: number, limit: number): Promise<Event[]> {
    try {
      // Validate input
      if (!query) {
        throw new Error('Query parameter is required.');
      }
  
  
      if ( page < 1) {
        throw new Error('Page must be a positive number.');
      }
  
      if ( limit < 1) {
        throw new Error('Limit must be a positive number.');
      }
  
      const skip = (page - 1) * limit;
  
      return await this.eventRepository.find({
        where: {
            title: Like(`%${query}%`),  // Using LIKE for a case-insensitive search
          },
        skip,
        take: limit,
      });
    } catch (error) {
      console.error('Error while fetching events:', error);
      throw new Error('Failed to fetch events.');
    }
  }
    async getEventsByTitle(query: string, category:string,page: number, limit: number): Promise<Event[]> {
        try {
          // Validate input
          if (!query) {
            throw new Error('Query parameter is required.');
          }
      
      
          if ( page < 1) {
            throw new Error('Page must be a positive number.');
          }
      
          if ( limit < 1) {
            throw new Error('Limit must be a positive number.');
          }
      
          const skip = (page - 1) * limit;
      
          return await this.eventRepository.find({
            where: query.trim() !== "" 
              ? { 
                  title: Like(`%${query}%`), 
                  category: category || undefined 
                } 
              : { 
                  category: category || undefined 
                },
            skip,
            take: limit,
          });
        } catch (error) {
          console.error('Error while fetching events:', error);
          throw new Error('Failed to fetch events.');
        }
      }
       getEventsByCategory=async(category:string)=>{
        return await this.eventRepository.find({where:{category:Like(`%${category}%`)}});

      }
    
      async getCategories() {
        try {
            console.log('Fetching events...');
            let categories = [];
            let events = await this.eventRepository.find();
          
            if (!events || !Array.isArray(events)) {
                console.log('No events found or invalid data type.');
                return [];
            }
            for (let event of events) {
                console.log('Processing event:', event);
                if (event.category) {
                    categories.push(event.category);
                }
            }
          
            return categories;
        } catch (error) {
            console.error('Error while fetching categories:', error.message);
            throw new Error('Failed to fetch categories.');
        }
    }
    
      
      
      
    async createEvent(event: EventDto){
        try {
            await this.eventRepository.save(event);
        } catch (error) {
            console.error("probleme lors de la creation de l'evenement", error);
        
        }
    }

    async deleteEvent(id: number) {
        try {
            await this.eventRepository.delete(id);
            let count=await this.eventRepository.count();
            if(count==0){
                this.dataSource.query("ALTER TABLE event AUTO_INCREMENT = 0");
            }
            
        } catch (error) {
            console.error("probleme lors de la suppression de l'evenement", error);
           
        }
    }

    async updateEvent(id: number, eventup: EventUpdateDto) {
        try {
           let event=await this.eventRepository.findOneById(id);
           if(!event){
               console.error("l'evenement n'existe pas");
        
           }
           Object.assign(event,eventup);
              await this.eventRepository.save(event);           
                } catch (error) {
            console.error("probleme lors de la modification de l'evenement", error);
          
        }
    }
    async addParticipant(eventId:number,participantId:number){
        try{
    let event=await this.eventRepository.findOneById(eventId);
    let seats=parseInt(event.capacity);
    if(event.dateF<new Date()){
      return "eventexpired";
    }
    if(seats==0){
      return "seatscompleted";
    }
    else{
    if(event.participants==null){
        event.participants=""+participantId;
    }else{
        event.participants+=","+participantId;
    }
    seats=seats-1;
    event.capacity=""+seats;
    this.updateEvent(eventId,event);
  }
}catch(error){
    throw new Error("probleme lors de l'ajout du participant a l'evenement");
       
    
}
    }
    async getEventsByParticipant(userId:string){
        try{
            let events=await this.eventRepository.find();
            let eventsByParticipant=[];
       
            for(let event of events){
              if(event.participants=="" || undefined || null){	
                  continue;
              }
              else{
                  let part=event.participants+",";
                  let partList=event.participants.split(",");
                  partList.map((part)=>part.trim());
                if(partList.includes(userId)){
                    eventsByParticipant.push(event);
                }
              }
            }
            return eventsByParticipant;
        }catch(error){
            throw new Error("probleme lors de la recuperation des evenements par participant");
        }
    }
    async getEventsByCreator(creatorId:string){
      try{
        let events=await this.eventRepository.find();
        let eventsByCreator=[];
        for(let event of events){
          if(event.creatorId===creatorId){
            eventsByCreator.push(event);
        
          }
        }
          return eventsByCreator;
      }catch(error){
          throw new Error("probleme lors de la recuperation des evenements par participant");
      }
  }
}