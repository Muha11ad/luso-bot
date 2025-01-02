import { NestFactory } from '@nestjs/core';
import { BotModule } from './bot/bot.module';

async function bootstrap() {
  const app = await NestFactory.create(BotModule);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
