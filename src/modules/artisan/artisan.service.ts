import { Injectable } from '@nestjs/common';
import { JobsRepo } from '../jobs/jobs.repo';
import { Artisan } from './entities/artisan.entity';

@Injectable()
export class ArtisanService {
  private currentCoordinates = { lat: 48.8606, lng: 2.3376 }; // Louvre, Paris

  constructor(private readonly repo: JobsRepo) {} //unused for now

  getLocation(jobId: string): Artisan {
    this.currentCoordinates.lat += (Math.random() - 0.5) * 0.001;
    this.currentCoordinates.lng += (Math.random() - 0.5) * 0.001;

    console.log(
      `[ArtisanService] getLocation called for jobId=${jobId}, coords=(${this.currentCoordinates.lat}, ${this.currentCoordinates.lng})`,
    );

    return {
      name: 'John Doe',
      phone: '+33 6 12 34 56 78',
      ETA: '15 min',
      coordinates: this.currentCoordinates,
    };
  }
}
