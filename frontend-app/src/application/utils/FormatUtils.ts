export class FormatUtils {
  static capitalize(text: string): string {
    if (!text || text.trim() === '') return '';
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  static truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return `${text.substring(0, maxLength)}...`;
  }

  static formatNumber(value: number, decimals: number = 2): string {
    return value.toFixed(decimals);
  }
}
