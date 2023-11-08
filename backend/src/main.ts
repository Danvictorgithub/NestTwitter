import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as csurf from "csurf"
import * as logger from "morgan"
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.use(logger('dev'));
  await app.listen(8080);
}
bootstrap();
