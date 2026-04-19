import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNumber, IsString, Min, MinLength, IsUUID } from 'class-validator';
import { Schedule } from './schedule.entity';

@Entity('films')
export class Film {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsNumber()
  @Min(0)
  rating: number;

  @Column()
  @IsString()
  director: string;

  @Column('text', { array: true })
  @IsString()
  tags: string[];

  @Column()
  @IsString()
  image: string;

  @Column()
  @IsString()
  cover: string;

  @Column()
  @IsString()
  @MinLength(1)
  title: string;

  @Column('text')
  @IsString()
  about: string;

  @Column('text')
  @IsString()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.film)
  schedule: Schedule[];
}
