import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/films.schema';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name)
    private filmModel: Model<FilmDocument>,
  ) {}

  async findAll() {
    return this.filmModel.find().lean();
  }

  async findById(id: string) {
    return this.filmModel.findOne({ id }).lean();
  }

  async updateScheduleTaken(
    filmId: string,
    scheduleId: string,
    seatKey: string,
  ): Promise<void> {
    await this.filmModel.updateOne(
      { id: filmId, 'schedule.id': scheduleId },
      { $push: { 'schedule.$.taken': seatKey } },
    );
  }
}
