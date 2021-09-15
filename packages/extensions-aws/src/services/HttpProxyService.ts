import { Lambda } from "aws-sdk";
import { HttpProxyRequestOptions } from "../models/HttpProxyRequestOptions";
import { HttpProxyResponse } from "../models/HttpProxyResponse";

export class HttpProxyService {
  constructor(
    private readonly client: Lambda,
    private readonly functionName: string,
  ) {}

  request = async (
    options: HttpProxyRequestOptions,
  ): Promise<HttpProxyResponse> => {
    const res = await this.client
      .invoke({
        FunctionName: this.functionName,
        InvocationType: "RequestResponse",
        Payload: JSON.stringify(options),
      })
      .promise();

    return HttpProxyResponse.check(JSON.parse(res.Payload as string));
  };
}
