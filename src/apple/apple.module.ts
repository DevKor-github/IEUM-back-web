import { Global, Module } from '@nestjs/common';
import { AppleService } from './apple.service';
import { AppleController } from './apple.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [AppleController],
  providers: [AppleService, UserRepository],
})
export class AppleModule {}
