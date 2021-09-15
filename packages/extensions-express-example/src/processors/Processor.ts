import {
  DefaultProcessor,
  ICorrelationService,
  ILogger,
  Message,
} from "@tsukiy0/extensions-core";
import { WinstonLogger } from "@tsukiy0/extensions-logging-winston";

type Services = {
  testService: string;
  correlationService: ICorrelationService;
};

export class Processor<T, U> extends DefaultProcessor<T, U> {
  constructor(
    private readonly bodyHandler: (services: Services, body: T) => Promise<U>,
  ) {
    super();
  }

  protected getLogger = async (): Promise<ILogger> => {
    return new WinstonLogger("@tsukiy0/extensions-express-example");
  };
  protected handle = async (message: Message<T>): Promise<U> => {
    const services = {
      testService: "test",
      correlationService: this.correlationService,
    };

    return await this.bodyHandler(services, message.body);
  };
}
