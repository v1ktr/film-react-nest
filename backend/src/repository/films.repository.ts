import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find({
      relations: ['schedule'],
    });
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });
  }

  async updateScheduleTaken(
    filmId: string,
    scheduleId: string,
    seatKey: string,
  ): Promise<void> {
    const schedule = await this.scheduleRepository.findOne({
      where: {
        id: scheduleId,
        film: { id: filmId }, //связь через relation
      },
    });

    if (!schedule) {
      throw new Error('Сеанс не найден');
    }

    if (schedule.taken.includes(seatKey)) {
      throw new Error(`Место ${seatKey} уже занято`);
    }

    schedule.taken = [...schedule.taken, seatKey];

    await this.scheduleRepository.save(schedule);
  }
}
