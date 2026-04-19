import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface AppConfig {
  database: AppConfigDatabase;
  port: number;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
}

@Injectable()
export class configProvider {
  constructor(private configService: ConfigService) {}

  get config(): AppConfig {
    const driver = this.configService.get<string>(
      'DATABASE_DRIVER',
      'postgres',
    );
    const url = this.configService.get<string>(
      'DATABASE_URL',
      'postgres://prac:prac@localhost:5432/prac',
    );

    return {
      database: {
        driver,
        url: url,
      },
      port: this.configService.get<number>('PORT', 3000),
    };
  }

  getDatabaseUrl(): string {
    return this.config.database.url;
  }

  getPort(): number {
    return this.config.port;
  }
}
