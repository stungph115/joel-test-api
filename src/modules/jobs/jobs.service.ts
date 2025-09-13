import { Injectable } from '@nestjs/common';
import { JobsRepo } from './jobs.repo';
import { Job, Artisan } from './entities/job.entity';
import { CreateJobDto } from './dto/create-job.dto';

@Injectable()
export class JobsService {
  private readonly QUOTE_TIMEOUT: number;
  private readonly ASSIGN_ARTISAN_TIMEOUT: number;
  private readonly IN_PROGRESS_TIMEOUT: number;
  private readonly FINISHED_TIMEOUT: number;

  constructor(private readonly repo: JobsRepo) {
    // read timeouts from environment or use default values
    this.QUOTE_TIMEOUT = parseInt(process.env.QUOTE_TIMEOUT_MS || '10000');
    this.ASSIGN_ARTISAN_TIMEOUT = parseInt(process.env.ASSIGN_ARTISAN_TIMEOUT_MS || '10000');
    this.IN_PROGRESS_TIMEOUT = parseInt(process.env.IN_PROGRESS_TIMEOUT_MS || '30000');
    this.FINISHED_TIMEOUT = parseInt(process.env.FINISHED_TIMEOUT_MS || '70000');
  }

  createQuote(data: CreateJobDto): Job {
    const jobId = `job_${Math.random().toString(36).substring(2, 8)}`;
    const job: Job = { jobId, ...data, jobStatus: 'processing' };
    this.repo.create(job);

    // simulate quote preparation
    setTimeout(() => {
      const price = Math.floor(Math.random() * (250 - 80 + 1) + 80);
      const breakdown = { base: price * 0.7, tax: price * 0.3 };
      this.repo.update(jobId, { price, breakdown, jobStatus: 'waiting_for_payment' });
      console.log(`[JobsService] Job ${jobId} quote ready`);
    }, this.QUOTE_TIMEOUT);

    return job;
  }

  acceptQuote(jobId: string): Job | null {
    const job = this.repo.update(jobId, { jobStatus: 'waiting_for_artisan' });
    if (!job) return null;

    // assign artisan after configurable timeout
    setTimeout(() => {
      const artisan: Artisan = {
        name: 'John Doe',
        phone: '+33 6 12 34 56 78',
        ETA: '15 min',
      };
      this.repo.update(jobId, { artisan, jobStatus: 'accepted_by_artisan' });
      console.log(`[JobsService] Job ${jobId} artisan assigned`);
    }, this.ASSIGN_ARTISAN_TIMEOUT);

    // timeline progression
    setTimeout(
      () => this.repo.update(jobId, { jobStatus: 'in_progress' }),
      this.IN_PROGRESS_TIMEOUT,
    );
    setTimeout(
      () => this.repo.update(jobId, { jobStatus: 'finished_by_artisan' }),
      this.FINISHED_TIMEOUT,
    );

    return job;
  }

  getJobStatus(jobId: string): Job | null {
    return this.repo.findById(jobId);
  }
}
