import { format, parse, differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { es } from 'date-fns/locale';

export class DateUtilsHelper {
  static formatDate(date: Date, pattern: string = 'yyyy-MM-dd'): string {
    return format(date, pattern, { locale: es });
  }

  static parse(dateStr: string, pattern: string = 'yyyy-MM-dd'): Date {
    return parse(dateStr, pattern, new Date(), { locale: es });
  }

  static relative(date: Date): string {
    const now = new Date();
    const days = differenceInDays(now, date);
    const hours = differenceInHours(now, date);
    const minutes = differenceInMinutes(now, date);

    if (days > 1) return `${days} días atrás`;
    if (hours > 1) return `${hours} horas atrás`;
    if (minutes > 1) return `${minutes} minutos atrás`;
    return 'hace un momento';
  }
}
