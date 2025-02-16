import { AppModule } from './modules/app.module';
import { NestFactory } from '@nestjs/core';
import { CustomLogger } from './shared/logger/custom.logger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useLogger(CustomLogger)

  await app.listen(process.env.PORT ?? 4000);


}
bootstrap();
