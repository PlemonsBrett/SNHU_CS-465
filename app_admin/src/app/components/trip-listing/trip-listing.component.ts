// app_admin/src/app/components/trip-listing/trip-listing.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripDataService } from '../../services/trip-data.service';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  template: `
    <div class="container-fluid">
      <div class="row mb-4">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center">
            <h2>Trip Management</h2>
            <button
              type="button"
              class="btn btn-success"
              (click)="addTrip()">
              <i class="fas fa-plus"></i> Add New Trip
            </button>
          </div>
        </div>
      </div>

      <div class="row mb-3" *ngIf="message">
        <div class="col-12">
          <div class="alert" [ngClass]="messageType" role="alert">
            {{ message }}
          </div>
        </div>
      </div>

      <div class="row" *ngIf="loading">
        <div class="col-12 text-center">
          <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <p class="mt-2">Loading trips...</p>
        </div>
      </div>

      <div class="row" *ngIf="!loading && trips.length === 0">
        <div class="col-12 text-center">
          <div class="alert alert-info">
            <h4>No trips found</h4>
            <p>Get started by adding your first trip!</p>
            <button
              type="button"
              class="btn btn-primary"
              (click)="addTrip()">
              Add First Trip
            </button>
          </div>
        </div>
      </div>

      <div class="row" *ngIf="!loading && trips.length > 0">
        <div class="col-lg-4 col-md-6 mb-4" *ngFor="let trip of trips">
          <app-trip-card
            [trip]="trip"
            (editTrip)="editTrip($event)"
            (deleteTrip)="deleteTrip($event)">
          </app-trip-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container-fluid {
      padding: 2rem;
    }

    .btn {
      border-radius: 0.5rem;
    }

    .alert {
      border-radius: 0.5rem;
    }

    .spinner-border {
      width: 3rem;
      height: 3rem;
    }
  `]
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  loading = false;
  message = '';
  messageType = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.loading = true;
    this.message = '';

    this.tripDataService.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
        this.loading = false;

        if (trips.length === 0) {
          this.showMessage('No trips found in the database.', 'alert-info');
        } else {
          this.showMessage(`Found ${trips.length} trip(s).`, 'alert-success');
        }
      },
      error: (error) => {
        console.error('Error loading trips:', error);
        this.loading = false;
        this.showMessage('Error loading trips. Please try again.', 'alert-danger');
      }
    });
  }

  addTrip(): void {
    this.router.navigate(['/add-trip']);
  }

  editTrip(trip: Trip): void {
    this.router.navigate(['/edit-trip', trip.code]);
  }

  deleteTrip(tripCode: string): void {
    this.tripDataService.deleteTrip(tripCode).subscribe({
      next: () => {
        this.showMessage('Trip deleted successfully!', 'alert-success');
        this.loadTrips(); // Refresh the list
      },
      error: (error) => {
        console.error('Error deleting trip:', error);
        this.showMessage('Error deleting trip. Please try again.', 'alert-danger');
      }
    });
  }

  private showMessage(message: string, type: string): void {
    this.message = message;
    this.messageType = type;

    // Auto-hide success messages after 3 seconds
    if (type === 'alert-success') {
      setTimeout(() => {
        this.message = '';
        this.messageType = '';
      }, 3000);
    }
  }
}