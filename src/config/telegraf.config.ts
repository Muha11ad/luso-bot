import { ConfigModule, ConfigService } from '@nestjs/config';
import * as LocalSession from 'telegraf-session-local';

export const getTelegrafOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    token: configService.get<string>('TELEGRAM_BOT_TOKEN'),
  }),

  inject: [ConfigService],
};
