import { Module } from '@nestjs/common';
import { EstimationService } from './estimation.service';
import { EstimationController } from './estimation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estimation } from './entities/estimation.entity';

@Module({
  controllers: [EstimationController],
  providers: [EstimationService],
  imports: [TypeOrmModule.forFeature([Estimation])],
})
export class EstimationModule {}
