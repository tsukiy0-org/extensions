# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.1.0-alpha.11](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.10...v0.1.0-alpha.11) (2021-07-16)


### Features

* configure with id ([913e5bf](https://github.com/tsukiy0-org/extensions-js/commit/913e5bf1fcc6f2d005de18ac2ea4fbe928277667))





# [0.1.0-alpha.10](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.9...v0.1.0-alpha.10) (2021-07-16)


### Features

* add DefaultFunction ([78733d3](https://github.com/tsukiy0-org/extensions-js/commit/78733d3ba6b079ca4fd6e9212dc8711902e15099))
* add DefaultLambdaRestApi ([76d92f1](https://github.com/tsukiy0-org/extensions-js/commit/76d92f1d5d50dc79762645de40467d51e1c37a90))
* add LambdaQueue ([6d7a049](https://github.com/tsukiy0-org/extensions-js/commit/6d7a0492e9bde0ea19241444a8c586d37e5374e9))
* add StaticSite ([a811728](https://github.com/tsukiy0-org/extensions-js/commit/a811728b08b5ff0da854d28a0c00ec9381db9fa2))
* add way to create ApiGatewayDomainName ([cd3eecd](https://github.com/tsukiy0-org/extensions-js/commit/cd3eecdb58f23d2cbffd9da07b784bb10c33e074))





# [0.1.0-alpha.9](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.8...v0.1.0-alpha.9) (2021-07-14)


### Features

* add BillingAlarm and EmailAlarmAction ([03290a7](https://github.com/tsukiy0-org/extensions-js/commit/03290a7336d9af9fb8dffeff581783332244c954))
* add empty extensions-aws-cdk package ([246efa7](https://github.com/tsukiy0-org/extensions-js/commit/246efa78ccb8b11a4bb922c43119d15f084c760f))
* bump dep versions ([ec64b08](https://github.com/tsukiy0-org/extensions-js/commit/ec64b08770c9976d2551c2409d0992522d130de4))





# [0.1.0-alpha.8](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.7...v0.1.0-alpha.8) (2021-07-05)


### Bug Fixes

* add logformm types ([f84c54a](https://github.com/tsukiy0-org/extensions-js/commit/f84c54ad2bb18f26a2ba62214264ba916f0d553a))
* error logs no longer undefined ([76fda7f](https://github.com/tsukiy0-org/extensions-js/commit/76fda7feee388551c7d7326c916baf62a5b89259))


### Features

* add extensions-deployment package ([61c2127](https://github.com/tsukiy0-org/extensions-js/commit/61c21273c0b44946c0429567abf7fe91f63d4388))
* remove unused PublicRouter ([4690f73](https://github.com/tsukiy0-org/extensions-js/commit/4690f73bf3c256a8fc8e23ed2aa9abf3f45d32eb))





# [0.1.0-alpha.7](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.6...v0.1.0-alpha.7) (2021-07-04)


### Features

* LoggerMiddleware is a class that includes setting up a logger name ([1c57332](https://github.com/tsukiy0-org/extensions-js/commit/1c57332c7abb4afc2db7498ed93eda8af193a98a))
* update ErrorMiddleware to have dependency on LoggerMiddleware ([78bcf8b](https://github.com/tsukiy0-org/extensions-js/commit/78bcf8bbd36a10ad745c77ed8f1a849ccd7eb8b0))





# [0.1.0-alpha.6](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.5...v0.1.0-alpha.6) (2021-07-04)


### Features

* add way to get logger from response global ([018d886](https://github.com/tsukiy0-org/extensions-js/commit/018d886c22144b2b3576e8f1ecc9fab6e8c12ba0))





# [0.1.0-alpha.5](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.4...v0.1.0-alpha.5) (2021-07-03)


### Features

* add common error types ([93edd16](https://github.com/tsukiy0-org/extensions-js/commit/93edd16bccec6db6ae8dde4c841a75722a3f1909))
* add ErrorMiddleware ([7cc5d60](https://github.com/tsukiy0-org/extensions-js/commit/7cc5d60329671cf89ee432caaa26e62c01c31ce5))
* add NotFoundError ([2238384](https://github.com/tsukiy0-org/extensions-js/commit/2238384d44db89ba8104cf8958d852c412a71c66))
* export UrlExtensions ([8683885](https://github.com/tsukiy0-org/extensions-js/commit/86838853c6089327ff45d9c8148f62e47c0d9092))
* merge logging-core into core ([265112d](https://github.com/tsukiy0-org/extensions-js/commit/265112d6badd68bc4cdc7727596c0669c4a1d609))
* move ICorrelationService to core ([e8c2e96](https://github.com/tsukiy0-org/extensions-js/commit/e8c2e96ef36d2474be547d0d1d5318746058e438))





# [0.1.0-alpha.4](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.3...v0.1.0-alpha.4) (2021-07-03)


### Features

* add UrlExtensions ([ae02d9f](https://github.com/tsukiy0-org/extensions-js/commit/ae02d9fe9101250b33e23cb2358d8e51d4983d6f))





# [0.1.0-alpha.3](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.2...v0.1.0-alpha.3) (2021-06-18)


### Bug Fixes

* hack to enable esbuild for winston formatters ([afbf7e8](https://github.com/tsukiy0-org/extensions-js/commit/afbf7e8c8cd823cbc67ebb3064f57b1933571d3e)), closes [/github.com/evanw/esbuild/issues/480#issuecomment-715489407](https://github.com//github.com/evanw/esbuild/issues/480/issues/issuecomment-715489407)


### Features

* add promisifyHandler ([9d978f1](https://github.com/tsukiy0-org/extensions-js/commit/9d978f1f53a81e863cba3a751f726e73a17a9c5a))





# [0.1.0-alpha.2](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.1...v0.1.0-alpha.2) (2021-06-15)


### Features

* add extensions-express pkg ([24ac51b](https://github.com/tsukiy0-org/extensions-js/commit/24ac51b7fd819c32902c4718203340371f381894))
* add LoggerMiddleware ([dc12656](https://github.com/tsukiy0-org/extensions-js/commit/dc126561f5081a09dbb25524fc84feb368cac1a6))
* add SystemClock ([01e80f0](https://github.com/tsukiy0-org/extensions-js/commit/01e80f05f048ddf85b3913b6fe5dd7c606d17ae6))
* add SystemConfiguration ([f14ae76](https://github.com/tsukiy0-org/extensions-js/commit/f14ae769de8bf4f6f731243786ae04b22f63951a))
* name is provided through logger ([4bee1cf](https://github.com/tsukiy0-org/extensions-js/commit/4bee1cfef484b20f017904487da8340954cbc539))





# [0.1.0-alpha.1](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.0...v0.1.0-alpha.1) (2021-06-15)


### Features

* add BaseError ([1c0a3c7](https://github.com/tsukiy0-org/extensions-js/commit/1c0a3c788558b9b987117bfcbb39556092896042))
* add Enum runtype ([0bea9c7](https://github.com/tsukiy0-org/extensions-js/commit/0bea9c73b4b3a258e6c71d11efb3fe0dab7a0ef9))
* add name to Log ([cfe9828](https://github.com/tsukiy0-org/extensions-js/commit/cfe9828794edb4eb2ecbc8afb33f94d4bb9790c0))
* add Url ([130ada7](https://github.com/tsukiy0-org/extensions-js/commit/130ada7dc28fbf116edccc8b2e34c7750a49f4ae))





# 0.1.0-alpha.0 (2021-06-12)


### Features

* add extensions-logging-core ([0f19ba6](https://github.com/tsukiy0-org/extensions-js/commit/0f19ba6fbc23b9de1ec93ebdf722a485a2342b16))
* add Guid ([a4e9489](https://github.com/tsukiy0-org/extensions-js/commit/a4e948961aaf838b22230a0f649d5a7aad7867c9))
* add ICorrelationService ([374a171](https://github.com/tsukiy0-org/extensions-js/commit/374a171a5eebd5d30154ac1757546c094df8905f))
* add ILogger ([2919a4b](https://github.com/tsukiy0-org/extensions-js/commit/2919a4befa8fce3a1fe856a510076a3422fda520))
* add Timestamp ([871f2cd](https://github.com/tsukiy0-org/extensions-js/commit/871f2cd972874dd7803704258978b6d2d7f28108))
* impl WinstonLogger ([f18922d](https://github.com/tsukiy0-org/extensions-js/commit/f18922dcadea6931d7e1758df61609ed77e52ab2))
