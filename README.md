# Joel Test Application
https://github.com/stungph115/joel-test-frontend

https://github.com/stungph115/joel-test-api
## Overview

This is a small Next.js + NestJS application simulating a consumer requesting a service from artisans (Locksmith, Plumber, Electrician).  
The app demonstrates the full flow: request → quote → accept → artisan assignment → job progress → finish.  

### Features:

- Fullstack with **NestJS** backend and **Next.js (App Router)** frontend  
- Frontend built with **TailwindCSS**
- Map display using **Google Maps API**  
- Job status timeline simulation with delays (~10s per step)  
- Optional photo upload (with preview)  
- Spinner animation during ongoing job status  
- Consumer location detection with geolocation (fallback: Paris center)  

---

## Project Structure

/backend → NestJS backend (API endpoints: /api/quote, /api/accept, /api/jobStatus, /api/artisanLocation)

/frontend → Next.js frontend (App Router, src/app)

/frontend/components → GoogleMap.tsx

/frontend/services → api.ts (axios calls to backend)


---

## Prerequisites

- Node.js >= 20  
- npm >= 9  
- Google Maps API Key (set in `.env.local` as `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`)  

---

## Setup Instructions

### Backend (NestJS)


```bash
npm install
npm run start:dev
```
By default, the backend runs on http://localhost:3000

### Frontend (Next.js)
```
npm install
npm run dev
```
By default, the frontend runs on http://localhost:3001 

### Environment Variables
Create .env.local in frontend:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_KEY
NEXT_PUBLIC_API_UR=YOUR_API_url ||| http://localhost:3000/api
```