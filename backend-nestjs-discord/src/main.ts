import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformationInterceptor } from './responseInterceptor';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('/api/v1');
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
    credentials: true,
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  });

  app.useGlobalInterceptors(new TransformationInterceptor());
  await app.listen(process.env.PORT, () => {
    return console.log(`Server is running on port ${process.env.PORT}`);
  });
}

bootstrap();
