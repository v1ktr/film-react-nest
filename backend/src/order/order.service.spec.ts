jest.mock('uuid', () => ({
  v4: jest.fn(() => 'mocked-uuid'),
}));

import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { FilmsRepository } from '../repository/films.repository';

describe('OrderService', () => {
  let service: OrderService;

  const filmsRepositoryMock = {
    findById: jest.fn(),
    updateScheduleTaken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: FilmsRepository,
          useValue: filmsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create order successfully', async () => {
    filmsRepositoryMock.findById.mockResolvedValue({
      schedule: [
        {
          id: 'session-1',
          rows: 10,
          seats: 10,
          taken: [],
        },
      ],
    });

    const result = await service.createOrder([
      {
        film: 'film-1',
        session: 'session-1',
        row: 1,
        seat: 1,
        price: 0,
        daytime: '',
      },
    ]);

    expect(result.total).toBe(1);

    expect(result.items[0].id).toBe('mocked-uuid');

    expect(filmsRepositoryMock.updateScheduleTaken).toHaveBeenCalled();
  });
});
