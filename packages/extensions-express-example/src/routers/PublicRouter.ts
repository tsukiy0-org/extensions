import cors from "cors";
import { json } from "body-parser";
import { Router } from "express";
import {
  IConfiguration,
  SystemConfiguration,
  ValidationError,
} from "@tsukiy0/extensions-core";
import {
  AddMapToCheckoutHandler,
  AddMapToCheckoutRequestNode,
  CreateCheckoutHandler,
  GeocodeSearchHandler,
  GeocodeSearchRequest,
} from "@app/core";
import { promisifyHandler } from "../utils/promisifyHandler";
import {
  AwsGeocodeService,
  DynamoMapConfigService,
  S3MapImageService,
  ShopifyCheckoutService,
} from "@app/infrastructure";
import multer from "multer";

export class PublicRouter {
  constructor(private readonly config: IConfiguration) {}

  build = (): Router => {
    const router = Router();

    router.use(cors());
    router.use(json());

    const geocodeService = AwsGeocodeService.build(
      this.config.get("PLACE_INDEX_NAME"),
    );
    const checkoutService = ShopifyCheckoutService.build(
      this.config.get("SHOPIFY_DOMAIN"),
      this.config.get("SHOPIFY_STOREFRONT_ACCESS_TOKEN"),
      this.config.get("SHOPIFY_VARIANT_ID"),
    );
    const mapImageService = S3MapImageService.build(
      this.config.get("MAP_IMAGE_BUCKET_NAME"),
    );
    const mapConfigService = DynamoMapConfigService.build(
      this.config.get("ORDER_TABLE_NAME"),
    );
    const geocodeSearchHandler = new GeocodeSearchHandler(geocodeService);
    const createCheckoutHandler = new CreateCheckoutHandler(checkoutService);
    const addMapToCheckoutHandler = new AddMapToCheckoutHandler(
      checkoutService,
      mapImageService,
      mapConfigService,
    );
    const upload = multer({});

    router.post(
      "/geo/search",
      promisifyHandler(async (req, res) => {
        const request = GeocodeSearchRequest.check(req.body);
        const response = await geocodeSearchHandler.handle(request);
        res.status(200).json(response);
      }),
    );

    router.post(
      "/checkout/create",
      promisifyHandler(async (req, res) => {
        const response = await createCheckoutHandler.handle({});
        res.status(200).json(response);
      }),
    );

    router.post(
      "/checkout/addMap",
      upload.single("data"),
      promisifyHandler(async (req, res) => {
        const file = req.file;

        if (!file) {
          throw new FileNotProvidedError();
        }

        const request = AddMapToCheckoutRequestNode.check({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          ...JSON.parse(req.body.rest),
          data: file.buffer,
        });
        await addMapToCheckoutHandler.handle(request);
        res.status(200).end();
      }),
    );

    return router;
  };
}

class FileNotProvidedError extends ValidationError {}
