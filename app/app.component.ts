import { Component, OnInit } from '@angular/core';
import { SeatService } from './seat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  seats: any[] = [];
  requestedSeats: number = 0;
  bookedSeats: number[] = [];

  constructor(private seatService: SeatService) {}

  ngOnInit() {
    this.seatService.loadSeats().subscribe((data) => {
      this.seatService.setSeats(data); // Set loaded seats
      this.seats = this.seatService.getSeats();
    });
  }

  bookSeats() {
    if (this.requestedSeats > 0 && this.requestedSeats <= 7) {
      this.bookedSeats = this.seatService.reserveSeats(this.requestedSeats);
      this.seats = this.seatService.getSeats(); // Update seats after booking
    }
  }
}
