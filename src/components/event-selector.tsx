"use client";

import type { Event } from '@/types/event';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EventSelectorProps {
  events: Event[];
}

export function EventSelector({ events }: EventSelectorProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedEventId = searchParams.get('eventId') || (events.length > 0 ? events[0].id : '');

  const handleEventChange = (eventId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('eventId', eventId);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (!events || events.length === 0) {
    return <p className="text-center text-muted-foreground py-4">No events available at the moment.</p>;
  }

  return (
    <Card className="mb-6 sm:mb-8 shadow-lg rounded-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl sm:text-2xl font-semibold text-primary">Choose Your Event</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="event-select" className="text-sm font-medium text-foreground/80">Select an event to view seating:</Label>
          <Select
            value={selectedEventId}
            onValueChange={handleEventChange}
            
          >
            <SelectTrigger id="event-select" className="w-full md:w-[350px] bg-background border-border focus:ring-ring focus:ring-offset-2">
              <SelectValue placeholder="Select an event" />
            </SelectTrigger>
            <SelectContent>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.name} - {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
