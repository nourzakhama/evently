import { Injectable } from '@nestjs/common';
import { CreateEmployeDto } from './dto/create-employe.dto';
import { UpdateEmployeDto } from './dto/update-employe.dto';
import { DataSource, Repository } from 'typeorm';
import { Employe } from './entities/employe.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EmployesService {
  constructor(@InjectRepository(Employe)public  employeRepository:Repository<Employe>,
private readonly dataSource:DataSource){}
  create(createEmployeDto: CreateEmployeDto) {
    try{
      return this.employeRepository.save(createEmployeDto);
    } catch (error) { 
      console.error(error)
    }}

  findAll() {
    return this.employeRepository.find();
  }

  findOne(id: number) {
    return this.employeRepository.findOne({where:{id:id}});
  }

  async update(id: number, updateEmployeDto: UpdateEmployeDto) {
    let employe = await this.employeRepository.findOne({where:{id:id}});
    if(!employe){
      return 'Employe not found';
    }
    Object.assign(employe,updateEmployeDto);
    return await this.employeRepository.save(employe);
  }

 async remove(id: number) {
  try {
    await this.employeRepository.delete(id);
    let count=await this.employeRepository.count();
    if(count==0){
        this.dataSource.query("ALTER TABLE employe AUTO_INCREMENT = 0");
    }
    
} catch (error) {
    console.error("probleme lors de la suppression de l'evenement", error);
   
}
  
}
}
