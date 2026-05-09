jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid'),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

describe('OrderController', () => {
  let controller: OrderController;

  const orderServiceMock = {
    createOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: orderServiceMock,
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create order', async () => {
    orderServiceMock.createOrder.mockResolvedValue({
      total: 1,
      items: [
        {
          id: '1',
        },
      ],
    });

    const result = await controller.createOrder({
      tickets: [],
      email: '',
      phone: '',
    });

    expect(result.total).toBe(1);

    expect(orderServiceMock.createOrder).toHaveBeenCalled();
  });
});
