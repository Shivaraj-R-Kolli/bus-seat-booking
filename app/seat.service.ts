import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private seatsUrl = 'assets/seats.json'; // Path to the JSON file
  private seats: any[] = []; // Store the seats data

  constructor(private http: HttpClient) {}

  // Fetch seats data from JSON
  loadSeats(): Observable<any[]> {
    return this.http.get<any[]>(this.seatsUrl);
  }

  // Set seats after loading
  setSeats(seats: any[]) {
    this.seats = seats;
  }

  // Get current seats
  getSeats() {
    return this.seats;
  }

  reserveSeats(requestedSeats: number) {
    const availableSeats = this.seats.filter(s => s.status === 'available');
    let bookedSeats = [];

    // Prioritize booking seats in the same row
    for (let row = 1; row <= 12; row++) {
      const rowSeats = availableSeats.filter(s => s.row === row);
      if (rowSeats.length >= requestedSeats) {
        bookedSeats = rowSeats.slice(0, requestedSeats).map(s => s.seat);
        break;
      }
    }

    // If no full row available, book nearby seats
    if (bookedSeats.length === 0) {
      bookedSeats = availableSeats.slice(0, requestedSeats).map(s => s.seat);
    }

    // Mark seats as booked
    this.seats.forEach(seat => {
      if (bookedSeats.includes(seat.seat)) {
        seat.status = 'booked';
      }
    });

    return bookedSeats;
  }
}
