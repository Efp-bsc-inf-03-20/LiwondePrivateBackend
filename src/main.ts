import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.modules';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create( AppModule );
  app.use( cookieParser() );
  app.use(
    cors( {
      origin: ['https:localhost:3000'],
      credentials: true,
    } ),
  );

  const config = new DocumentBuilder()
    .setTitle( 'Liwonde Private Hospital' )
    .setDescription( 'We treat, and God heals.' )
    .setVersion( '1.0' )
    .build();

  const document = SwaggerModule.createDocument( app, config );
  SwaggerModule.setup( 'api', app, document );

  await app.listen( 3000 );
}

bootstrap();
