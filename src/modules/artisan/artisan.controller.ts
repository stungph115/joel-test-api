import {
  Controller,
  Get,
  Query,
  NotFoundException,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArtisanService } from './artisan.service';

@ApiTags('artisan')
@Controller('api/artisan')
export class ArtisanController {
  constructor(private readonly artisanService: ArtisanService) {}

  @Get('location')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get artisan location for a job' })
  @ApiResponse({ status: 200, description: 'Artisan location retrieved successfully' })
  @ApiResponse({ status: 400, description: 'Job ID missing' })
  @ApiResponse({ status: 404, description: 'Artisan not found for this job' })
  getLocation(@Query('jobId') jobId: string) {
    if (!jobId) {
      throw new BadRequestException('Job ID is required');
    }

    const artisan = this.artisanService.getLocation(jobId);
    if (!artisan) {
      throw new NotFoundException(`No artisan assigned to job ${jobId}`);
    }

    return artisan;
  }
}
