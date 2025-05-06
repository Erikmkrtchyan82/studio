import type { Event } from '@/types/event';
import { EventSelector } from '@/components/event-selector';
import { SeatBooking } from '@/components/seat-booking';
import { Header } from '@/components/header';

// Mock data - in a real app, this would come from an API
const events: Event[] = [
  {
    id: 'event1',
    name: 'Tech Conference 2024',
    date: '2024-12-15T09:00:00Z',
    venue: {
      id: 'venue1',
      name: 'Grand Convention Center',
      seatingLayout: {
        rows: 8, // Adjusted for better display with sections
        seatsPerRow: 10,
        sections: [
          { name: 'A', price: 50, color: 'hsl(var(--chart-1))', description: 'Front Orchestra' },
          { name: 'B', price: 75, color: 'hsl(var(--chart-2))', description: 'Mezzanine'  },
          { name: 'C', price: 100, color: 'hsl(var(--chart-3))', description: 'Balcony Gold' },
        ],
      },
    },
  },
  {
    id: 'event2',
    name: 'Summer Music Festival',
    date: '2024-08-20T18:00:00Z',
    venue: {
      id: 'venue2',
      name: 'Outdoor Amphitheater',
      seatingLayout: {
        rows: 10, // Adjusted
        seatsPerRow: 12,
        sections: [
          { name: 'GA', price: 40, color: 'hsl(var(--chart-4))', description: 'General Admission Lawn' },
          { name: 'VIP', price: 120, color: 'hsl(var(--chart-5))', description: 'VIP Deck' },
        ],
      },
    },
  },
];

export default async function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-grow container mx-auto px-2 sm:px-4 py-6 sm:py-8">
        <EventSelector events={events} />
        <SeatBooking events={events} />
      </main>
      <footer className="py-6 bg-primary text-primary-foreground text-center text-sm">
        <p>&copy; {new Date().getFullYear()} SeatWise. All rights reserved.</p>
      </footer>
    </div>
  );
}
