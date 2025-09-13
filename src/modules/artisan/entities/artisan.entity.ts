// src/modules/artisan/entities/artisan.entity.ts

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Artisan {
  name: string;
  phone: string;
  ETA: string;
  coordinates?: Coordinates;
}
