import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Waiting Line')
    .setDescription('The Waiting Line API description')
    .setVersion('1.0')
    .setContact(
      'Kadu',
      'https://github.com/kaduh15',
      'kadu.silva2014@gmail.com',
    )
    .addTag('Users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3001);
}
bootstrap();
