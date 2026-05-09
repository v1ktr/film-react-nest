import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { FilmsRepository } from '../repository/films.repository';

describe('FilmsService', () => {
  let service: FilmsService;

  const filmsRepositoryMock = {
    findAll: jest.fn(),
    findById: jest.fn(),
    updateScheduleTaken: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: FilmsRepository,
          useValue: filmsRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all films', async () => {
    filmsRepositoryMock.findAll.mockResolvedValue([
      {
        id: '1',
        title: 'Film',
        rating: 5,
        director: 'Director',
        tags: [],
        about: 'About',
        description: 'Description',
        image: 'image.jpg',
        cover: 'cover.jpg',
      },
    ]);

    const result = await service.findAll();

    expect(result.total).toBe(1);
    expect(result.items[0].title).toBe('Film');
  });
});
