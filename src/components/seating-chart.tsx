"use client";

import type { Seat, Venue } from '@/types/event';
import { cn } from '@/lib/utils';
import { Armchair, MinusSquare, CheckSquare, TvIcon } from 'lucide-react';

interface SeatingChartProps {
  venue: Venue;
  selectedSeats: Seat[];
  bookedSeats: Seat[];
  onSeatSelect: (seat: Seat) => void;
}

export function SeatingChart({ venue, selectedSeats, bookedSeats, onSeatSelect }: SeatingChartProps) {
  const { seatingLayout } = venue;

  const getSeatStatus = (rowIndex: number, seatIndex: number, sectionName: string) => {
    const seatId = `${sectionName}-${rowIndex + 1}-${String.fromCharCode(65 + seatIndex)}`; // Seat ID like A-1-A
    if (bookedSeats.some(s => s.id === seatId)) return 'booked';
    if (selectedSeats.some(s => s.id === seatId)) return 'selected';
    return 'available';
  };

  return (
    <div className="p-3 sm:p-4 bg-card rounded-xl shadow-lg overflow-x-auto">
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-primary text-center">{venue.name} - Seating Chart</h3>
      
      <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 sm:gap-x-4 mb-3 sm:mb-4 text-xs sm:text-sm">
        {seatingLayout.sections.map(section => (
           <div key={section.name} className="flex items-center">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-sm mr-1.5 sm:mr-2" style={{ backgroundColor: section.color }}></div>
            <span>{section.description || section.name} (${section.price})</span>
          </div>
        ))}
      </div>

       <div className="flex flex-wrap justify-center gap-x-3 gap-y-2 sm:gap-x-6 mb-4 sm:mb-6 text-xs sm:text-sm">
        <div className="flex items-center">
          <CheckSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-green-500" /> Available
        </div>
        <div className="flex items-center">
          <Armchair className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-accent" /> Selected
        </div>
        <div className="flex items-center">
          <MinusSquare className="w-4 h-4 sm:w-5 sm:h-5 mr-1 text-destructive/70" /> Booked
        </div>
      </div>

      <div className="flex flex-col items-center space-y-2 sm:space-y-3">
        {seatingLayout.sections.map((section, sectionIndex) => (
          <div key={section.name} className="mb-3 sm:mb-4 w-full">
            <h4 className="text-base sm:text-lg font-medium text-center mb-1.5 sm:mb-2" style={{color: section.color}}>{section.description || section.name} Section</h4>
            {Array.from({ length: seatingLayout.rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex justify-center space-x-0.5 sm:space-x-1 mb-0.5 sm:mb-1">
                <span className="w-5 sm:w-6 text-center text-xs sm:text-sm text-muted-foreground self-center mr-1 sm:mr-2">Row {rowIndex + 1}</span>
                {Array.from({ length: seatingLayout.seatsPerRow }).map((_, seatIndex) => {
                  const seatLetter = String.fromCharCode(65 + seatIndex);
                  const seatId = `${section.name}-${rowIndex + 1}-${seatLetter}`;
                  const status = getSeatStatus(rowIndex, seatIndex, section.name);
                  const seat: Seat = { id: seatId, section: section.name, price: section.price, row: rowIndex + 1, seatNumber: seatLetter };

                  return (
                    <button
                      key={seatId}
                      onClick={() => status !== 'booked' && onSeatSelect(seat)}
                      disabled={status === 'booked'}
                      className={cn(
                        "w-7 h-7 sm:w-8 sm:h-8 rounded-md flex items-center justify-center transition-all duration-150 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-1 focus:ring-offset-1",
                        status === 'available' && 'bg-green-500/20 hover:bg-green-500/40 text-green-700 dark:text-green-400 focus:ring-green-500',
                        status === 'selected' && 'bg-accent text-accent-foreground focus:ring-accent-foreground',
                        status === 'booked' && 'bg-muted/70 text-muted-foreground/70 cursor-not-allowed opacity-80 focus:ring-muted-foreground',
                      )}
                      aria-label={`Seat ${seat.id}, Status: ${status}, Price: $${seat.price}`}
                    >
                     <span className="text-xs sm:text-xs font-medium">{seatLetter}</span>
                    </button>
                  );
                })}
              </div>
            ))}
            {sectionIndex < seatingLayout.sections.length -1 && <hr className="my-3 sm:my-4 border-border/50"/>}
          </div>
        ))}
      </div>
      <div className="mt-4 sm:mt-6 p-2 sm:p-3 bg-primary/10 rounded-md text-center text-sm sm:text-base text-primary font-semibold flex items-center justify-center">
        <TvIcon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
        STAGE
      </div>
    </div>
  );
}

