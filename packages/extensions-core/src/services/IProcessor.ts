import { ICorrelationService } from "./ICorrelationService";
import { ILogger } from "./ILogger";

export type ProcessorServices = {
  logger: ILogger;
  correlationService: ICorrelationService;
};

export interface IProcessor<T, U> {
  run(request: T, services: ProcessorServices): Promise<U>;
}
