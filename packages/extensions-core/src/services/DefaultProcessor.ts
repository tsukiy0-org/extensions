import { IProcessor, ProcessorServices } from "./IProcessor";

export abstract class DefaultProcessor<T, U> implements IProcessor<T, U> {
  protected abstract handle: (
    request: T,
    services: ProcessorServices,
  ) => Promise<U>;

  run = async (request: T, services: ProcessorServices): Promise<U> => {
    try {
      services.logger.info("TRANSACTION START", { request });

      const res = await this.handle(request, services);

      services.logger.info("TRANSACTION SUCCEEDED");

      return res;
    } catch (e) {
      if (e instanceof Error) {
        services.logger.error(e, "TRANSACTION FAILED");
      }
      throw e;
    }
  };
}
