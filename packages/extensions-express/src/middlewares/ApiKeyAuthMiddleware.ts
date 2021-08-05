import { Request, RequestHandler, Response } from "express";
import { GuidExtensions, UnauthorizedError } from "@tsukiy0/extensions-core";
import { promisifyHandler } from "../helpers/promisifyHandler";

type Props = {
  keys: {
    name: string;
    value: string;
  }[];
};

export class ApiKeyAuthMiddleware {
  private readonly key = `keyName_${GuidExtensions.generate()}`;

  constructor(
    private readonly getProps: (req: Request, res: Response) => Promise<Props>,
  ) {}

  handler: RequestHandler = promisifyHandler(async (req, res) => {
    const { keys } = await this.getProps(req, res);
    const requestKey = req.header("x-api-key") as string;

    const matchingKey = keys.find((_) => _.value === requestKey);

    if (!matchingKey) {
      throw new UnauthorizedError();
    }

    res.locals[this.key] = matchingKey.name;
  });

  getName = (res: Response): string => {
    return res.locals[this.key] as string;
  };
}
