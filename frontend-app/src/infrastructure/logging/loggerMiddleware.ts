export class LoggerMiddleware {
  static log(message: string, tag: string = 'LOG') {
    if (__DEV__) {
      console.log(`[${tag}] ${message}`);
    }
  }
}
