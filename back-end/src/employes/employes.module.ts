import { Module } from '@nestjs/common';
import { EmployesService } from './employes.service';
import { EmployesController } from './employes.controller';
import { Employe } from './entities/employe.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Employe])],
  controllers: [EmployesController],
  providers: [EmployesService],
  exports:[EmployesService]
})
export class EmployesModule {}
