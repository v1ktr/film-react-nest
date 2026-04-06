import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateFullOrderDto, OrderResponseDto } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  createOrder(
    @Body() orderData: CreateFullOrderDto,
  ): Promise<OrderResponseDto> {
    return this.orderService.createOrder(orderData.tickets);
  }
}
