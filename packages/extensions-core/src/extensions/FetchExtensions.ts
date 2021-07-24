import { FetchError } from "../models/FetchError";
import { ICorrelationService } from "../services/ICorrelationService";

export class FetchExtensions {
  static checkSuccess = async (
    response: Response,
    acceptedStatuses: number[],
  ): Promise<void> => {
    if (!acceptedStatuses.includes(response.status)) {
      const body = await response.text();
      throw new FetchError(response.status, body);
    }
  };

  static withTracing = (
    requestInit: RequestInit,
    correlationService: ICorrelationService,
  ): RequestInit => {
    return {
      ...requestInit,
      headers: {
        ...requestInit.headers,
        "x-trace-id": correlationService.getTraceId(),
      },
    };
  };
}
