import { Injectable } from '@nestjs/common';

@Injectable()
export class JobsService {
    private jobs: Record<string, any> = {}

    createQuote(data: any) {
        const jobId = `job_${Math.random().toString(36).substring(2, 8)}`
        const job = { jobId, ...data, jobStatus: 'processing' }
        this.jobs[jobId] = job
        console.log(`[JobsService] Job ${jobId} created, status=processing`)

        // simulate server processing 10s
        setTimeout(() => {
            const price = Math.floor(Math.random() * (250 - 80 + 1) + 80)
            const breakdown = { base: price * 0.7, tax: price * 0.3 }
            job.price = price
            job.breakdown = breakdown
            job.jobStatus = 'waiting_for_payment'
            console.log(`[JobsService] Job ${jobId} quote ready, status=waiting_for_payment, price=${price}`)
        }, 10000)

        return job
    }

    acceptQuote(jobId: string) {
        const job = this.jobs[jobId]
        if (!job) return null
        job.jobStatus = 'waiting_for_artisan'
        console.log(`[JobsService] Job ${jobId} accepted, status=waiting_for_artisan`)

        // start timeline
        setTimeout(() => {
            job.jobStatus = 'accepted_by_artisan'
            console.log(`[JobsService] Job ${jobId} status=accepted_by_artisan`)
        }, 10000)
        setTimeout(() => {
            job.jobStatus = 'in_progress'
            console.log(`[JobsService] Job ${jobId} status=in_progress`)
        }, 30000)
        setTimeout(() => {
            job.jobStatus = 'finished_by_artisan'
            console.log(`[JobsService] Job ${jobId} status=finished_by_artisan`)
        }, 70000)

        return job
    }

    getJobStatus(jobId: string) {
        return this.jobs[jobId] || null
    }
}
