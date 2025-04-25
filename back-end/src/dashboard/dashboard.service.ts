import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployesService } from 'src/employes/employes.service';
import { EventService } from 'src/events/event.service';
import { ParticipantsService } from 'src/participants/participants.service';
import { ResourcesService } from 'src/resources/resources.service';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    private readonly eventService: EventService,
    private readonly resourceService: ResourcesService,
  private readonly participantService: ParticipantsService,
  private readonly employeService: EmployesService,
  ) {}

  async calculateDashboardStats() {
    // Event Statistics
    const encourEvents = await this.eventService.eventRepository.count({ where: { status: 'cour' } });
  /*  const saturatedEvents = await this.eventRepository.count({
      where: qb => qb.where('participantCount >= capacity'),
    });*/
    const saturatedEvents = await this.eventService.eventRepository.count({ where: { status: 'saturé' } });
    const cancelledEvents = await this.eventService.eventRepository.count({ where: { status: 'annulé' } });

    // Participant Count
    const totalParticipants = await this.participantService.participantRepository.count();

    // Resource Statistics
    const allResources = await this.resourceService.resRepository.count();
    const resourcesUsed = await this.resourceService.resRepository.count({ where: { status: 'busy' } });

    // Employe Statistics
    const allEmployes = await this.employeService.employeRepository.count();
    const employesBusy = await this.employeService.employeRepository.count({ where: { status: 'busy' } });
    const satisfaction = await this.participantService.participantRepository.count({ where: { satisfaction: 'satisfait' } });

    return {
      encourEvents,
     saturatedEvents,
      cancelledEvents,
      totalParticipants,
      allResources,
      resourcesUsed,
      allEmployes,
      employesBusy,
      satisfaction

    };
  }
}
