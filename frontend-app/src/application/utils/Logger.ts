const isDebug = __DEV__; // React Native flag para saber si es modo desarrollo

export class Logger {
  static log(message: string): void {
    if (isDebug) {
      console.log(`[LOG] ${message}`);
    }
  }

  static error(message: string, error?: unknown): void {
    if (isDebug) {
      console.error(`[ERROR] ${message}`);
      if (error) {
        console.error(error);
      }
    }
  }
}
