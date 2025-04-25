import { Injectable } from '@nestjs/common';
import { CreateParticipantDto } from './dto/create-participant.dto';
import { UpdateParticipantDto } from './dto/update-participant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Participant } from './entities/participant.entity';

@Injectable()
export class ParticipantsService {
  constructor(@InjectRepository(Participant)public participantRepository:Repository<Participant>,
public dataSource:DataSource){}
  create(createParticipantDto: CreateParticipantDto) {
    try{
      this.participantRepository.save(createParticipantDto)
    }catch(error){
    console.error(error)
  }
}

  findAll(query: string) {
    try{
      if(!query || query.trim()==''){
    return this.participantRepository.find();
      }else{
        return this.participantRepository.createQueryBuilder('participant')
          .where('participant.name like :query',{query:`%${query}%`})
          .orWhere('participant.firstName like :query',{query:`%${query}%`})
          .orWhere('participant.lastName like :query',{query:`%${query}%`})
        .orWhere('participant.email like :query',{query:`%${query}%`})
        .orWhere('participant.cin like :query',{query:`%${query}%`})
        .getMany();
      }
  }
catch(error){
  console.error(error)
}
  }
find(){
  return this.participantRepository.find();
}
  findOne(id: number) {try{
    return this.participantRepository.findOne({where:{id:id}});
  }catch(error){
  console.error(error)
}
  }
  findOnebyClerkId(id: string) {
    try {
      return this.participantRepository.findOne({ where: { cin: id } });
    } catch (error) {
      console.error(error)
    }
  }
  async update(id: string, updateParticipantDto: UpdateParticipantDto) {
    try{
      let participant = await this.findOne(+id);
    if(!participant){
      throw new Error('Participant not found');
    }
    Object.assign(participant,updateParticipantDto);
    this.participantRepository.save(participant);
    }catch(error){
    console.error(error)
  }
    
  }
  async updateClerk(id: string, updateParticipantDto: UpdateParticipantDto) {
    try {
      let participant = await this.findOnebyClerkId(id);
      if (!participant) {
        throw new Error('Participant not found');
      }
      Object.assign(participant, updateParticipantDto);
      this.participantRepository.save(participant);
    } catch (error) {
      console.error(error)
    }

  }
  async remove(id: number) {try{
     await this.participantRepository.delete(id);
     let count=await this.participantRepository.count();
     if(count==0){
       this.dataSource.query("ALTER TABLE participant AUTO_INCREMENT = 0");
     }
    }catch(error){
      console.error(error);
    }
  }
  async removeClerk(id: string) {
    try {
      let event=await this.participantRepository.findOne({where:{cin:id}});
      await this.participantRepository.delete(event.id);
      let count = await this.participantRepository.count();
      if (count == 0) {
        this.dataSource.query("ALTER TABLE participant AUTO_INCREMENT = 0");
      }
    } catch (error) {
      console.error(error);
    }
  }


}
