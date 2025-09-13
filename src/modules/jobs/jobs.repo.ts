import { Injectable } from '@nestjs/common';
import { Job } from './entities/job.entity';

@Injectable()
export class JobsRepo {
  private jobs: Record<string, Job> = {};

  create(job: Job) {
    this.jobs[job.jobId] = job;
    return job;
  }

  findById(jobId: string): Job | null {
    return this.jobs[jobId] || null;
  }

  update(jobId: string, data: Partial<Job>): Job | null {
    const job = this.jobs[jobId];
    if (!job) return null;
    this.jobs[jobId] = { ...job, ...data };
    return this.jobs[jobId];
  }
}
