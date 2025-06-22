import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../../models/trip';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card h-100">
      <div class="card-header">
        <h5 class="card-title mb-0">{{ trip.name }}</h5>
        <small class="text-muted">{{ trip.code }}</small>
      </div>

      <img
        [src]="'assets/images/' + trip.image"
        [alt]="trip.name"
        class="card-img-top"
        style="height: 200px; object-fit: cover;">

      <div class="card-body d-flex flex-column">
        <h6 class="card-subtitle mb-2 text-muted">{{ trip.resort }}</h6>

        <p class="card-text mb-2">
          <strong>Duration:</strong> {{ trip.length }}
        </p>

        <p class="card-text mb-2">
          <strong>Price:</strong> \${{ trip.perPerson }} per person
        </p>

        <p class="card-text flex-grow-1" [innerHTML]="trip.description"></p>

        <div class="mt-auto" *ngIf="isLoggedIn()">
          <div class="btn-group w-100" role="group">
            <button
              type="button"
              class="btn btn-primary btn-sm"
              (click)="onEdit()"
              title="Edit Trip">
              <i class="fas fa-edit"></i> Edit
            </button>

            <button
              type="button"
              class="btn btn-danger btn-sm"
              (click)="onDelete()"
              title="Delete Trip">
              <i class="fas fa-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      transition: transform 0.2s ease-in-out;
    }

    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    .btn-group .btn {
      border-radius: 0;
    }

    .btn-group .btn:first-child {
      border-top-left-radius: 0.375rem;
      border-bottom-left-radius: 0.375rem;
    }

    .btn-group .btn:last-child {
      border-top-right-radius: 0.375rem;
      border-bottom-right-radius: 0.375rem;
    }
  `]
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() editTrip = new EventEmitter<Trip>();
  @Output() deleteTrip = new EventEmitter<string>();

  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService
  ) { }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  onEdit(): void {
    this.editTrip.emit(this.trip);
  }

  onDelete(): void {
    if (confirm(`Are you sure you want to delete "${this.trip.name}"?`)) {
      this.deleteTrip.emit(this.trip.code);
    }
  }
}