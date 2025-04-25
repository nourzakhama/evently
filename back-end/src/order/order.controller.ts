import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { SearchOrdersDto } from './dto/searchdto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }
  @Get('/user/:id/:eventId')
  findOneByUser(@Param('id') id: string, @Param('eventId') eventId: string) {
    return this.orderService.findOneByUser(id, eventId);
  }

  @Get('search/:query')
  findOneByQuery(@Param("query") query: string) {
    if (!query) {
      throw new BadRequestException('Query parameter is required');
    }
    return this.orderService.findOneByQuery(query);
  }
  
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.delete(+id);
  }
}
