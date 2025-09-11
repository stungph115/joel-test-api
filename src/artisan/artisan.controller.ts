import { Controller, Get } from '@nestjs/common';
import { ArtisanService } from './artisan.service';

@Controller('api')
export class ArtisanController {
    constructor(private artisanService: ArtisanService) { }

    @Get('artisanLocation')
    getArtisanLocation() {
        console.log('[ArtisansController] Returning artisan info')
        return {
            name: "John Doe",
            phone: "+33 6 12 34 56 78",
            ETA: "15 min",
            coordinates: { lat: 48.857, lng: 2.352 }
        }
    }

}
