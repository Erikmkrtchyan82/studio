"use client";

import type { Event, Seat } from '@/types/event';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { SeatingChart } from './seating-chart';
import { TicketSummary } from './ticket-summary';
import { BookingForm } from './booking-form';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TicketCheck, CalendarDays, MapPin, Info } from 'lucide-react';

interface SeatBookingProps {
  events: Event[];
}

export function SeatBooking({ events }: SeatBookingProps) {
  const searchParams = useSearchParams();
  const eventId = searchParams.get('eventId');

  const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [bookedSeats, setBookedSeats] = useState<Seat[]>([]); 
  const [bookingComplete, setBookingComplete] = useState(false);

  const initializeEventState = useCallback((currentEventId: string | null) => {
    const currentEvent = events.find(e => e.id === currentEventId) || (events.length > 0 ? events[0] : undefined);
    setSelectedEvent(currentEvent);
    setSelectedSeats([]); 
    setBookingComplete(false); 
    
    if (currentEvent) {
        // Simulate fetching booked seats for the event
        // In a real app, this would be an API call: fetchBookedSeats(currentEvent.id)
        const mockBooked : Seat[] = [];
        // Example: 2 random seats from each section for event1
        if (currentEvent.id === 'event1' && currentEvent.venue.seatingLayout.sections.length > 0) {
            currentEvent.venue.seatingLayout.sections.forEach(section => {
                for(let i=0; i<2; i++) {
                    const randomRow = Math.floor(Math.random() * currentEvent.venue.seatingLayout.rows) + 1;
                    const randomSeatIndex = Math.floor(Math.random() * currentEvent.venue.seatingLayout.seatsPerRow);
                    const randomSeatLetter = String.fromCharCode(65 + randomSeatIndex);
                    mockBooked.push({
                        id: `${section.name}-${randomRow}-${randomSeatLetter}`, 
                        section: section.name, 
                        price: section.price,
                        row: randomRow,
                        seatNumber: randomSeatLetter
                    });
                }
            });
        } else if (currentEvent.id === 'event2' && currentEvent.venue.seatingLayout.sections.length > 0) {
             // Example: 3 random seats from GA for event2
             const gaSection = currentEvent.venue.seatingLayout.sections.find(s => s.name === 'GA');
             if (gaSection) {
                for(let i=0; i<3; i++) {
                    const randomRow = Math.floor(Math.random() * currentEvent.venue.seatingLayout.rows) + 1;
                    const randomSeatIndex = Math.floor(Math.random() * currentEvent.venue.seatingLayout.seatsPerRow);
                    const randomSeatLetter = String.fromCharCode(65 + randomSeatIndex);
                    mockBooked.push({
                        id: `GA-${randomRow}-${randomSeatLetter}`, 
                        section: 'GA', 
                        price: gaSection.price,
                        row: randomRow,
                        seatNumber: randomSeatLetter
                    });
                }
             }
        }
        setBookedSeats(mockBooked);
    }
  }, [events]);


  useEffect(() => {
    initializeEventState(eventId);
  }, [eventId, initializeEventState]);

  const handleSeatSelect = (seat: Seat) => {
    setSelectedSeats((prevSelectedSeats) => {
      const isSelected = prevSelectedSeats.some(s => s.id === seat.id);
      if (isSelected) {
        return prevSelectedSeats.filter(s => s.id !== seat.id);
      } else {
        // Limit max selectable seats, e.g. 10
        if (prevSelectedSeats.length >= 10) {
            // Optionally show a toast message here
            console.warn("Maximum of 10 seats can be selected.");
            return prevSelectedSeats;
        }
        return [...prevSelectedSeats, seat];
      }
    });
    setBookingComplete(false); 
  };

  const handleBooking = (formData: { name: string; email: string }) => {
    console.log('Booking successful (mock):', formData, selectedSeats);
    setBookedSeats(prev => [...prev, ...selectedSeats]); // Add newly booked seats to the list
    setSelectedSeats([]); // Clear selection
    setBookingComplete(true); // Show confirmation
  };

  if (!selectedEvent) {
    return (
        <Card className="shadow-xl rounded-xl my-8">
            <CardContent className="p-10 text-center">
                <Info className="mx-auto h-12 w-12 text-primary mb-4" />
                <p className="text-xl text-muted-foreground">Please select an event to view seating options.</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card className="shadow-xl rounded-xl">
      <CardHeader className="bg-primary/5 p-4 sm:p-6 rounded-t-xl">
        <CardTitle className="text-2xl sm:text-3xl font-bold text-center text-primary">
          {selectedEvent.name}
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground mt-1 sm:mt-2 space-y-1 text-sm sm:text-base">
            <div className="flex items-center justify-center">
                <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-accent" />
                {new Date(selectedEvent.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at {new Date(selectedEvent.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="flex items-center justify-center">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-accent" />
                {selectedEvent.venue.name}
            </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 sm:space-y-8 p-3 sm:p-6">
        {bookingComplete && (
          <Alert variant="default" className="bg-green-500/10 border-green-500 text-green-700 dark:bg-green-500/20 dark:border-green-500/50 dark:text-green-400 rounded-lg">
            <TicketCheck className="h-5 w-5" />
            <AlertTitle className="font-semibold">Booking Confirmed!</AlertTitle>
            <AlertDescription>
              Your tickets have been successfully booked. A confirmation email has been sent (not really, this is a mock!).
            </AlertDescription>
          </Alert>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="lg:col-span-2">
            <SeatingChart
              venue={selectedEvent.venue}
              selectedSeats={selectedSeats}
              bookedSeats={bookedSeats}
              onSeatSelect={handleSeatSelect}
            />
          </div>
          <div className="space-y-6">
            <TicketSummary selectedSeats={selectedSeats} />
            {selectedSeats.length > 0 && !bookingComplete && (
              <BookingForm onSubmit={handleBooking} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
