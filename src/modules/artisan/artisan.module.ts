import { Module } from '@nestjs/common';
import { ArtisanController } from './artisan.controller';
import { ArtisanService } from './artisan.service';
import { JobsRepo } from '../jobs/jobs.repo';

@Module({
  controllers: [ArtisanController],
  providers: [ArtisanService, JobsRepo],
})
export class ArtisanModule {}
