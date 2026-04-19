import {
  Entity,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { IsInt, IsString, Min, MinLength, IsUUID } from 'class-validator';
import { Film } from './film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsString()
  @MinLength(1)
  daytime: string;

  @Column()
  @IsInt()
  hall: number;

  @Column()
  @IsInt()
  @Min(1)
  rows: number;

  @Column()
  @IsInt()
  @Min(1)
  seats: number;

  @Column({ name: 'filmId' })
  @IsUUID()
  filmId: string;

  @Column()
  @IsInt()
  @Min(1)
  price: number;

  @Column('text', { array: true, default: () => "'{}'" })
  @IsString()
  taken: string[];

  @ManyToOne(() => Film, (film) => film.schedule)
  @JoinColumn({ name: 'filmId' })
  film: Film;
}
