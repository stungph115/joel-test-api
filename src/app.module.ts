import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsModule } from './jobs/jobs.module';
import { ArtisanModule } from './artisan/artisan.module';

@Module({
  imports: [JobsModule, ArtisanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
