import { TicketIcon } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 sm:py-5 flex items-center">
        <TicketIcon className="h-7 w-7 sm:h-8 sm:w-8 mr-2 sm:mr-3 text-accent" />
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">SeatWise</h1>
      </div>
    </header>
  );
}
