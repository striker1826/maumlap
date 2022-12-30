import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;
  await app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}
bootstrap();
