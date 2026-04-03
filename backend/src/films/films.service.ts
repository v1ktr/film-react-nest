import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async findAll(): Promise<FilmsResponseDto> {
    const films = await this.filmsRepository.findAll();

    return {
      total: films.length,
      items: films.map((f) => ({
        id: f.id,
        rating: f.rating,
        director: f.director,
        tags: f.tags,
        title: f.title,
        about: f.about,
        description: f.description,
        image: f.image,
        cover: f.cover,
      })),
    };
  }

  async findById(id: string) {
    return this.filmsRepository.findById(id);
  }

  async findScheduleByFilmId(id: string): Promise<ScheduleResponseDto> {
    const film = await this.filmsRepository.findById(id);

    if (!film) {
      throw new NotFoundException('Фильм не найден');
    }

    return {
      total: film.schedule.length,
      items: film.schedule,
    };
  }

  async createOrder(
    filmId: string,
    scheduleId: string,
    seatKey: string,
  ): Promise<void> {
    await this.filmsRepository.updateScheduleTaken(filmId, scheduleId, seatKey);
  }
}
