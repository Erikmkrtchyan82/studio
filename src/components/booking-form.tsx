"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { CreditCard, User, Mail, CalendarIcon, LockKeyhole } from 'lucide-react';

const bookingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, {message: "Name cannot exceed 50 characters."}),
  email: z.string().email({ message: "Please enter a valid email address." }),
  cardNumber: z.string()
    .min(16, { message: "Card number must be 16 digits."})
    .max(16, { message: "Card number must be 16 digits."})
    .regex(/^\d+$/, { message: "Card number must contain only digits."}),
  expiryDate: z.string()
    .min(5, { message: "Expiry date must be MM/YY."}) // e.g. 12/25
    .max(5, { message: "Expiry date must be MM/YY."})
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Invalid expiry date format (MM/YY)."}),
  cvv: z.string()
    .min(3, { message: "CVV must be 3 or 4 digits."})
    .max(4, { message: "CVV must be 3 or 4 digits."})
    .regex(/^\d+$/, { message: "CVV must contain only digits."}),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  onSubmit: (data: BookingFormValues) => void;
}

export function BookingForm({ onSubmit }: BookingFormProps) {
  const { toast } = useToast();
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      name: "",
      email: "",
      cardNumber: "",
      expiryDate: "",
      cvv: ""
    },
  });

  function handleFormSubmit(data: BookingFormValues) {
    onSubmit(data); // This will set bookingComplete to true in parent
    form.reset(); // Reset form fields after successful (mock) submission
    // Toast is now handled by parent for overall success
  }

  return (
    <Card className="shadow-lg rounded-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg sm:text-xl font-semibold text-primary">Secure Checkout</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 sm:space-y-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Full Name</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="e.g. Jane Doe" {...field} className="pl-9 sm:pl-10 text-sm sm:text-base" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Email Address</FormLabel>
                  <FormControl>
                     <div className="relative">
                      <Mail className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input type="email" placeholder="e.g. jane@example.com" {...field} className="pl-9 sm:pl-10 text-sm sm:text-base" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Card Number (mock)</FormLabel>
                  <FormControl>
                     <div className="relative">
                      <CreditCard className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="•••• •••• •••• ••••" {...field} className="pl-9 sm:pl-10 text-sm sm:text-base" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">Expiry</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <CalendarIcon className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="MM/YY" {...field} className="pl-9 sm:pl-10 text-sm sm:text-base"/>
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm">CVV</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <LockKeyhole className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="•••" {...field} className="pl-9 sm:pl-10 text-sm sm:text-base" />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base sm:text-lg py-2.5 sm:py-3 mt-2 sm:mt-3 rounded-lg" size="lg">
              Confirm & Book Tickets
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
