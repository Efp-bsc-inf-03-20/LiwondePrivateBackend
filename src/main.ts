import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.modules';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create( AppModule );

  app.use( cookieParser() );

  // Enable CORS
  app.enableCors( {
    origin: 'http://hospital-mggb.onrender.com', // Update with your frontend URL
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
  } );

  const options = new DocumentBuilder()
    .setTitle( 'Liwonde Private Hospital' )
    .setDescription( 'We treat, and God heals.' )
    .setVersion( '1.0' )
    .build();

  const document = SwaggerModule.createDocument( app, options );
  SwaggerModule.setup( 'api', app, document );

  await app.listen( 3000 );
}

bootstrap();
