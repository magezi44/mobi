import { Module } from '@nestjs/common';
import { SignUpsService } from './sign-ups.service';
import { SignUpsController } from './sign-ups.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  controllers: [SignUpsController],
  providers: [SignUpsService],
  imports: [CloudinaryModule, PrismaModule],
  exports: [SignUpsService],
})
export class SignUpsModule {}
