import { GuidExtensions } from "@tsukiy0/extensions-core";
import { ICorrelationService } from "@tsukiy0/extensions-logging-core";
import { Writable } from "stream";
import { transports } from "winston";
import { WinstonLogger } from "./WinstonLogger";

describe("WinstonLogger", () => {
  const name = "TestLogger";
  const traceId = GuidExtensions.generate();
  const spanId = GuidExtensions.generate();
  const correlationService: ICorrelationService = {
    getTraceId: () => traceId,
    getSpanId: () => spanId,
  };
  let output: string;
  let sut: WinstonLogger;

  beforeEach(() => {
    output = "";
    const stream = new Writable();
    stream._write = (chunk, encoding, next) => {
      output = output += chunk;
      next();
    };
    const transport = new transports.Stream({ stream });
    sut = new WinstonLogger(name, correlationService, transport);
  });

  describe("info", () => {
    it("log message and context", () => {
      const message = "hello";
      const context = {
        simple: "1",
        complex: {
          two: "2",
          deep: {
            three: "3",
          },
        },
      };

      sut.info(message, context);

      expect(JSON.parse(output)).toEqual({
        version: 1,
        level: 20,
        name,
        timestamp: expect.any(Number),
        traceId,
        spanId,
        message,
        context,
      });
    });
  });

  describe("error", () => {
    it("log exception, message and context", () => {
      const message = "hello";
      const context = {
        simple: "1",
        complex: {
          two: "2",
          deep: {
            three: "3",
          },
        },
      };
      const error = new RangeError("out of bounds");

      sut.error(error, message, context);

      expect(JSON.parse(output)).toEqual({
        version: 1,
        level: 50,
        name,
        timestamp: expect.any(Number),
        traceId,
        spanId,
        message,
        context,
        exception: {
          type: error.name,
          message: error.message,
          stackTrace: error.stack,
          context: {},
        },
      });
    });
  });
});
