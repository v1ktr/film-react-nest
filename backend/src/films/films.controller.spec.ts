import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;

  const filmsServiceMock = {
    findAll: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: filmsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return films list', async () => {
    filmsServiceMock.findAll.mockResolvedValue({
      total: 1,
      items: [
        {
          id: '1',
          title: 'Film',
        },
      ],
    });

    const result = await controller.getFilms();

    expect(result.total).toBe(1);
    expect(result.items[0].title).toBe('Film');
  });
});
