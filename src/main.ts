// main.ts

import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

 // Create a Swagger document options object
 const options = new DocumentBuilder()
 .setTitle('Liwonde Private Hospital')
 .setDescription('We Treat and God Heals')
 .setVersion('1.0')
 .build();

// Generate the Swagger JSON document
const document = SwaggerModule.createDocument(app, options);

// Add the Swagger JSON document to the Swagger UI
SwaggerModule.setup('api', app, document);

// Start the application


  await app.listen(3000);
}
bootstrap();