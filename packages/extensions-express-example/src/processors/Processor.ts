import {
  DefaultProcessor,
  ICorrelationService,
  ProcessorServices,
} from "@tsukiy0/extensions-core";

type Services = {
  testService: string;
  correlationService: ICorrelationService;
};

export class Processor<T, U> extends DefaultProcessor<T, U> {
  constructor(
    private readonly handleWithServices: (
      services: Services,
      body: T,
    ) => Promise<U>,
  ) {
    super();
  }

  protected handle = async (
    body: T,
    services: ProcessorServices,
  ): Promise<U> => {
    return await this.handleWithServices(
      {
        testService: "test",
        correlationService: services.correlationService,
      },
      body,
    );
  };
}
