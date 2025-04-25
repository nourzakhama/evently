import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { DataSource, DeepPartial, Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly dataSource:DataSource
  ) { }

  async findAll(): Promise<Order[]> {
    try {
      return await this.orderRepository.find();
    } catch (error) {
      console.error("Problème lors de la récupération des commandes", error);
      throw new Error("Impossible de récupérer les commandes");
    }
  }

  async findOne(id: number): Promise<Order | null> {
    try {
      const order = await this.orderRepository.findOne({ where: { id } });
      if (!order) {
        console.warn(`Commande avec l'ID ${id} non trouvée`);
      }
      return order;
    } catch (error) {
      console.error("Problème lors de la récupération de la commande", error);
      throw new Error("Impossible de récupérer la commande");
    }
  }
  async findOneByUser(id: string,eventId:string): Promise<Order | null> {
    try {
      const order = await this.orderRepository.findOne({ 
        where: { 
          buyerId: id.trim(),
         eventId:eventId.trim()} });
     return order;
    } catch (error) {
      console.error("Problème lors de la récupération de la commande", error);
      throw new Error("Impossible de récupérer la commande");
    }
  }
  async create(orderDto: CreateOrderDto) {
    try {
      
      return await this.orderRepository.save(orderDto);
    } catch (error) {
      console.error("Problème lors de la création de la commande", error);
      throw new Error("Impossible de créer la commande");
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order | null> {
    try {
      const order = await this.orderRepository.findOne({ where: { id } });
      if (!order) {
        console.warn(`Commande avec l'ID ${id} non trouvée`);
        return null;
      }
      Object.assign(order, updateOrderDto);
      return await this.orderRepository.save(order);
    } catch (error) {
      console.error("Problème lors de la mise à jour de la commande", error);
      throw new Error("Impossible de mettre à jour la commande");
    }
  }
  async delete(id: number) {
    try {
      await this.orderRepository.delete(id);
      let count = await this.orderRepository.count();
      if (count == 0) {
        this.dataSource.query("ALTER TABLE order AUTO_INCREMENT = 1");
      }

    } catch (error) {
      console.error("probleme lors de la suppression de l'evenement", error);

    }
  }


  async findOneByQuery(query: string): Promise<Order | null> {
    console.log('Query:', query); // Debugging
    if (!query || query.trim() === '') {
      throw new Error('Query parameter is required');
    }
    try {
      const result = await this.orderRepository
        .createQueryBuilder('order')
        .where('order.eventTitle LIKE :query', { query: `%${query}%` })
        .getOne();
      console.log('Result:', result); // Debugging
      return result;
    } catch (error) {
      console.error('Error in findOneByQuery:', error); // Debugging
      throw new InternalServerErrorException('Failed to fetch order');
    }
  }

}
