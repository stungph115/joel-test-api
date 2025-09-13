import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  HttpCode,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { AcceptJobDto } from './dto/accept-job.dto';

@ApiTags('jobs')
@Controller('api/jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  @Post('create')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new job' })
  @ApiResponse({ status: 201, description: 'Job successfully created' })
  createQuote(@Body() data: CreateJobDto) {
    if (!data.service) {
      throw new BadRequestException('Service is required');
    }
    return this.jobsService.createQuote(data);
  }

  @Post('accept')
  @HttpCode(202)
  @ApiOperation({ summary: 'Accept a job quote' })
  @ApiResponse({ status: 202, description: 'Quote accepted (processing continues)' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  acceptQuote(@Body() body: AcceptJobDto) {
    const job = this.jobsService.acceptQuote(body.jobId);
    if (!job) {
      throw new NotFoundException(`Job with ID ${body.jobId} not found`);
    }
    return job;
  }

  @Get('status')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get the current job status' })
  @ApiResponse({ status: 200, description: 'Job status retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Job not found' })
  getJobStatus(@Query('jobId') jobId: string) {
    if (!jobId) {
      throw new BadRequestException('Job ID is required');
    }
    const job = this.jobsService.getJobStatus(jobId);
    if (!job) {
      throw new NotFoundException(`Job with ID ${jobId} not found`);
    }
    return job;
  }
}
