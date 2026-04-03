import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import {
  FilmsResponseDto,
  FilmDto,
  ScheduleResponseDto,
} from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get(':id')
  async getFilmById(@Param('id') id: string): Promise<FilmDto> {
    return this.filmsService.findById(id);
  }

  @Get()
  async getFilms(): Promise<FilmsResponseDto> {
    const items = await this.filmsService.findAll();

    return {
      total: items.items.length,
      items: items.items,
    };
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string): Promise<ScheduleResponseDto> {
    const film = await this.filmsService.findById(id);

    return {
      total: film?.schedule.length || 0,
      items: film?.schedule || [],
    };
  }
}
