import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);


    // Enable CORS for the frontend
    app.enableCors({
      // origin: ['http://localhost:3000', 'https://my-app-sage-rho.vercel.app'],// Frontend URL
      origin: '*', 
      methods: 'GET,POST,PATCH,PUT,DELETE',  // Allowed methods
      credentials: true, // Allow cookies if you're using them
    });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
