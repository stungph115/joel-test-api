import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('api')
export class JobsController {
    constructor(private readonly jobsService: JobsService) { }

    @Post('quote')
    createQuote(@Body() data: any) {
        return this.jobsService.createQuote(data)
    }

    @Post('accept')
    acceptQuote(@Body() body: { jobId: string }) {
        return this.jobsService.acceptQuote(body.jobId)
    }

    @Get('jobStatus')
    getJobStatus(@Query('jobId') jobId: string) {
        return this.jobsService.getJobStatus(jobId)
    }
}
