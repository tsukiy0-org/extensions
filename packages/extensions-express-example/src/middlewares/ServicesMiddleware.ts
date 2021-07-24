import { AbstractServicesMiddleware } from "@tsukiy0/extensions-express";
import { Request, Response } from "express";

type Services = {
  testService: string;
};

export class ServicesMiddleware extends AbstractServicesMiddleware<Services> {
  buildServices = async (req: Request, res: Response): Promise<Services> => {
    return {
      testService: "test",
    };
  };
}
