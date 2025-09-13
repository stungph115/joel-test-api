export type JobStatus =
  | 'processing'
  | 'waiting_for_payment'
  | 'waiting_for_artisan'
  | 'accepted_by_artisan'
  | 'in_progress'
  | 'finished_by_artisan';

export interface Artisan {
  name: string;
  phone: string;
  ETA: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export class Job {
  jobId: string;
  service: string;
  description: string;
  price?: number;
  breakdown?: {
    base: number;
    tax: number;
  };
  jobStatus: JobStatus;
  artisan?: Artisan;

  constructor(partial: Partial<Job>) {
    Object.assign(this, partial);
  }
}
