export interface Seat {
  id: string; // e.g., "A-1-A", "GA-10-C"
  section: string;
  price: number;
  row: number;
  seatNumber: string; // e.g. "A", "B"
}

export interface Section {
  name: string; // e.g., "A", "VIP", "General Admission"
  price: number;
  color: string; // For UI representation
  description?: string; // e.g. "Front Orchestra", "Mezzanine"
}

export interface SeatingLayout {
  rows: number; // Number of rows per section
  seatsPerRow: number; // Number of seats per row in a section
  sections: Section[];
}

export interface Venue {
  id: string;
  name: string;
  seatingLayout: SeatingLayout;
}

export interface Event {
  id: string;
  name: string;
  date: string; // ISO date string
  venue: Venue;
}
