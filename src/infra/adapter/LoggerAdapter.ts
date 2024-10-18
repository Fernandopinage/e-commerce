import { ConsoleLogger } from '@nestjs/common';

export class LoggerAdapter extends ConsoleLogger {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(message: any, stack?: string, context?: string) {
    super.error(message, undefined, context);
    console.log(stack);
  }
}
