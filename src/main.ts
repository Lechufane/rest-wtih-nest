import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,//cuando se envia un parametro que no esta definido en el DTO, lo ignora
    forbidNonWhitelisted: true,//cuando se envia un parametro que no esta definido en el DTO, lanza un error
    transform: true//transforma los parametros a los tipos de datos definidos en el DTO
  }));

  await app.listen(port);
}
bootstrap();
