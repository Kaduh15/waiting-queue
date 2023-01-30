import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

import 'dotenv/config';

const PORT = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Waiting Queue')
    .setDescription(`API para um sistema de fila de espera para uma barbearia, onde os clientes podem se cadastrar e acompanhar sua posição na fila.`)
    .setVersion('1.0')
    .setContact(
      'Kadu',
      'https://github.com/kaduh15',
      'kadu.silva2014@gmail.com',
    )
    .addTag('Users')
    .addTag('Auth')
    .addTag('')
    .addBearerAuth()
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(PORT);
}
bootstrap();
