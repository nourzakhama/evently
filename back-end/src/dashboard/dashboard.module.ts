import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventService } from 'src/events/event.service';
import { EmployesService } from 'src/employes/employes.service';
import { ParticipantsService } from 'src/participants/participants.service';
import { ResourcesService } from 'src/resources/resources.service';
import { DashboardService } from './dashboard.service';
import { Event } from 'src/events/entity/event.entity';
import { Employe } from 'src/employes/entities/employe.entity';
import { Resource } from 'src/resources/entities/resource.entity';
import { Participant } from 'src/participants/entities/participant.entity';
import { DashboardController } from './dashboard.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Employe, Resource, Participant]),
  ],
  providers: [DashboardService, EventService, ResourcesService, ParticipantsService, EmployesService], // Add EventService here
  controllers: [DashboardController],
})
export class DashboardModule {}
