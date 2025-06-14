// app_admin/src/app/app.routes.ts

import { Routes } from '@angular/router';
import { TripListingComponent } from './components/trip-listing/trip-listing.component';
import { AddTripComponent } from './components/add-trip/add-trip.component';
import { EditTripComponent } from './components/edit-trip/edit-trip.component';

export const routes: Routes = [
  { path: '', component: TripListingComponent },
  { path: 'add-trip', component: AddTripComponent },
  { path: 'edit-trip/:tripCode', component: EditTripComponent },
  { path: '**', redirectTo: '' } // Wildcard route for 404 handling
];