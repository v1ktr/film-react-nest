import { Injectable, BadRequestException } from '@nestjs/common';
import { FilmsRepository } from '../repository/films.repository';
import {
  CreateOrderDto,
  OrderResponseDto,
  CreateOrderWithIdDto,
} from './dto/order.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(private readonly filmsRepository: FilmsRepository) {}

  async createOrder(orderData: CreateOrderDto[]): Promise<OrderResponseDto> {
    const validatedOrders = [];
    const requestedSeats = new Set<string>();

    for (const order of orderData) {
      const { film, session, row, seat } = order;

      // Формируем уникальный ключ места в рамках фильма и сеанса
      const requestSeatKey = `${film}:${session}:${row}:${seat}`;

      // Если такое место уже было в этом же запросе, возвращаем ошибку
      if (requestedSeats.has(requestSeatKey)) {
        throw new BadRequestException(
          `Место в ряду ${row}, номер ${seat} передано в заказе несколько раз`,
        );
      }

      // Запоминаем место как уже обработанное
      requestedSeats.add(requestSeatKey);
    }

    // валидируем ВСЕ места перед записью
    for (const order of orderData) {
      const { film, session, row, seat } = order;

      const filmDoc = await this.filmsRepository.findById(film);
      if (!filmDoc) {
        throw new BadRequestException('Фильм не найден');
      }

      const foundSession = filmDoc.schedule.find((s) => s.id === session);
      if (!foundSession) {
        throw new BadRequestException('Сеанс не найден');
      }

      if (row > foundSession.rows) {
        throw new BadRequestException(
          `Ряд ${row} не существует. Последний ряд: ${foundSession.rows}`,
        );
      }

      if (seat > foundSession.seats) {
        throw new BadRequestException(
          `Место ${seat} не существует. Последнее место в ряду: ${foundSession.seats}`,
        );
      }

      const seatKey = `${row}:${seat}`;

      if (foundSession.taken.includes(seatKey)) {
        throw new BadRequestException(`Место ${seatKey} уже занято`);
      }

      validatedOrders.push({
        order,
        film,
        session,
        seatKey,
      });
    }

    // если все валидно, записываем заказы и занимаем места
    const createdOrders: CreateOrderWithIdDto[] = [];

    for (const { order, film, session, seatKey } of validatedOrders) {
      await this.filmsRepository.updateScheduleTaken(film, session, seatKey);

      const orderWithId: CreateOrderWithIdDto = {
        id: uuidv4(),
        ...order,
      };

      createdOrders.push(orderWithId);
    }

    return {
      total: createdOrders.length,
      items: createdOrders,
    };
  }
}
