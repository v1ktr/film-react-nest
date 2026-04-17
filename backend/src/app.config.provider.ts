import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface AppConfig {
  database: AppConfigDatabase;
  port: number;
}

export interface AppConfigDatabase {
  driver: string;
  url: string;
  username: string;
  password: string;
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
      'postgres://localhost:5432/prac',
    );
    const username = this.configService.get<string>(
      'DATABASE_USERNAME',
      'prac',
    );
    const password = this.configService.get<string>(
      'DATABASE_PASSWORD',
      'prac',
    );

    let finalUrl = url;

    if (url && !url.includes('@')) {
      const protocolEnd = url.indexOf('://') + 3;
      finalUrl =
        url.slice(0, protocolEnd) +
        `${username}:${password}@` +
        url.slice(protocolEnd);
    }

    return {
      database: {
        driver,
        url: finalUrl,
        username,
        password,
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
