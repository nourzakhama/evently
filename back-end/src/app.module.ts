import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import{EventModule}from './events/event.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events/entity/event.entity';
import { EmployesModule } from './employes/employes.module';
import { Employe } from './employes/entities/employe.entity';
import { ResourcesModule } from './resources/resources.module';
import { Resource } from './resources/entities/resource.entity';
import { ParticipantsModule } from './participants/participants.module';
import { Participant } from './participants/entities/participant.entity';
import { DashboardModule } from './dashboard/dashboard.module';
import { OrderModule } from './order/order.module';
import { Order } from './order/entities/order.entity';

@Module({
  imports: [EventModule,TypeOrmModule.forRoot({
    type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'final',
      entities: [Event,Employe,Resource,Participant,Order],
      synchronize: true,
      logging: true,
  }), EmployesModule, ResourcesModule, ParticipantsModule, DashboardModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
