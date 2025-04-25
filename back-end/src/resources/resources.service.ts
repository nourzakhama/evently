import { Injectable } from '@nestjs/common';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ResourcesService {
  constructor(@InjectRepository(Resource)public resRepository: Repository<Resource>,
private readonly dataSource:DataSource) {}
 
  findAll(): Promise<Resource[]> {
         try {
             return this.resRepository.find();
         } catch (error) {
             console.error("probleme lors de la recuperation des evenements", error);
         }
     }
 
     findOne(id: number): Promise<Resource> {
         try {
             return this.resRepository.findOne({where:{id:id}});
         } catch (error) {
             console.error("probleme lors de la recuperation de l'evenement", error);
         }
     }
 
     async create(resource: CreateResourceDto){
         try {
             await this.resRepository.save(resource);
         } catch (error) {
             console.error("probleme lors de la creation de l'evenement", error);
         
         }
     }
 
     async remove(id: number) {
        try {
            await this.resRepository.delete(id);
            let count=await this.resRepository.count();
            if(count==0){
                this.dataSource.query("ALTER TABLE resource AUTO_INCREMENT = 0");
            }
            
        } catch (error) {
            console.error("probleme lors de la suppression de l'evenement", error);
           
        }
        
     }
 
     async update(id: number, resorceup: UpdateResourceDto) {
         try {
            let res=await this.resRepository.findOne({where:{id:id}});
            if(!res){
                console.error("l'evenement n'existe pas");
         
            }
            Object.assign(res,resorceup);
               await this.resRepository.save(res);           
                 } catch (error) {
             console.error("probleme lors de la modification de l'evenement", error);
           
         }
     }
}
