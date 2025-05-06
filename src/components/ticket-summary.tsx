"use client";

import type { Seat } from '@/types/event';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Ticket } from 'lucide-react';

interface TicketSummaryProps {
  selectedSeats: Seat[];
}

export function TicketSummary({ selectedSeats }: TicketSummaryProps) {
  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg sm:text-xl font-semibold text-primary flex items-center">
          <Ticket className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-accent" />
          Your Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0 pb-3">
        {selectedSeats.length === 0 ? (
          <p className="text-muted-foreground text-center py-4 text-sm sm:text-base">
            No seats selected. <br/>Click on available seats in the chart.
          </p>
        ) : (
          <ScrollArea className="h-[180px] sm:h-[200px] pr-2 sm:pr-3">
            <ul className="space-y-2 sm:space-y-3">
              {selectedSeats.map((seat) => (
                <li key={seat.id} className="flex justify-between items-center p-2 sm:p-2.5 bg-secondary/60 dark:bg-secondary/30 rounded-md text-xs sm:text-sm">
                  <div>
                    <span className="font-medium text-foreground">Seat {seat.row}-{seat.seatNumber}</span>
                    <Badge variant="outline" className="ml-1.5 sm:ml-2 text-xs border-opacity-70" style={{borderColor: `hsl(var(--${seat.section === 'A' ? 'chart-1' : seat.section === 'B' ? 'chart-2' : seat.section === 'C' ? 'chart-3' : seat.section === 'GA' ? 'chart-4' : 'chart-5'}))`, color: `hsl(var(--${seat.section === 'A' ? 'chart-1' : seat.section === 'B' ? 'chart-2' : seat.section === 'C' ? 'chart-3' : seat.section === 'GA' ? 'chart-4' : 'chart-5'}))`}}>
                        {seat.section}
                    </Badge>
                  </div>
                  <span className="font-semibold text-foreground">${seat.price.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </CardContent>
      {selectedSeats.length > 0 && (
        <>
          <Separator className="my-0 bg-border/70" />
          <CardFooter className="pt-3 sm:pt-4 pb-3 sm:pb-4">
            <div className="w-full flex justify-between items-center">
              <span className="text-base sm:text-lg font-bold text-primary">Total:</span>
              <span className="text-xl sm:text-2xl font-extrabold text-primary">${totalPrice.toFixed(2)}</span>
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
