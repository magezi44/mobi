import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
      
    }),
  );
  app.enableCors();

  const config = new DocumentBuilder()
  .setTitle('Social Pledge System')
  .setDescription('The Social Pledge System API description')
  .setVersion('1.0')
  .build();
  
  

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(process.env.PORT || 3000);
  
}
bootstrap();
