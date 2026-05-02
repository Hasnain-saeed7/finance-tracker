// lib/utils/formatCurrency.ts

export function formatCurrency(amount: number, currency = 'PKR'): string {
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return 'N/A'; // Handle empty dates gracefully
  
  const d = new Date(date);
  
  // Check if the date is actually valid
  if (isNaN(d.getTime())) return 'Invalid Date';

  return new Intl.DateTimeFormat('en-PK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(d);
} 

