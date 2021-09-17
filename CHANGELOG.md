# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.1.0-alpha.39](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.38...v0.1.0-alpha.39) (2021-09-17)


### Bug Fixes

* update HttpProxyRequestOptions to take headers as object ([fea3813](https://github.com/tsukiy0-org/extensions-js/commit/fea38134771ddf2dfdb1d9f43ed51fe3fc18112d))





# [0.1.0-alpha.38](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.37...v0.1.0-alpha.38) (2021-09-16)


### Bug Fixes

* use json parser ([ddc898a](https://github.com/tsukiy0-org/extensions-js/commit/ddc898a11d5621e4786f85c9e2bdd0d867e62808))





# [0.1.0-alpha.37](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.36...v0.1.0-alpha.37) (2021-09-15)


### Reverts

* Revert "fix: parse request" ([da27a97](https://github.com/tsukiy0-org/extensions-js/commit/da27a97de06aa07450753a18cefa7c2cb0b56d9b))





# [0.1.0-alpha.36](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.35...v0.1.0-alpha.36) (2021-09-15)


### Bug Fixes

* parse request ([12bf244](https://github.com/tsukiy0-org/extensions-js/commit/12bf2441fd869f0cc3f7e5340194cda3020916a6))





# [0.1.0-alpha.35](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.34...v0.1.0-alpha.35) (2021-09-15)


### Features

* add builder to HttpProxyService ([ec7573a](https://github.com/tsukiy0-org/extensions-js/commit/ec7573aed5880d34d8b76bff2bc87a40618afa5e))





# [0.1.0-alpha.34](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.33...v0.1.0-alpha.34) (2021-09-15)


### Bug Fixes

* attach job role ([9116d82](https://github.com/tsukiy0-org/extensions-js/commit/9116d825e19a4146607c01de11025c02cb5821fc))
* bad import ([a6b4137](https://github.com/tsukiy0-org/extensions-js/commit/a6b4137256b0207177cb2661fdfb4e9c87dac2a8))
* cant apply removal policy to lambda log group ([d8fb08e](https://github.com/tsukiy0-org/extensions-js/commit/d8fb08eb995adfb50f3cc536080f7388003aafab))
* exit with status 1 on failure ([0567659](https://github.com/tsukiy0-org/extensions-js/commit/0567659c899bebd44815023d7f0ba8891ea2ed66))
* missing variable name ([6ce42c4](https://github.com/tsukiy0-org/extensions-js/commit/6ce42c40b92812719cf838e0aebdb44d690a530b))
* parse lambda payload to json ([99be5e2](https://github.com/tsukiy0-org/extensions-js/commit/99be5e2da98e10c12375c748225da96b7ce53a09))
* remove ExampleBatchJob ([5e14f34](https://github.com/tsukiy0-org/extensions-js/commit/5e14f341d66b255955d9f0a9a4e164fcec7908b2))
* send lambda payload as a string ([04863bd](https://github.com/tsukiy0-org/extensions-js/commit/04863bdf5ba184ae159b006ee05b99360ff2bac2))
* seperate role for execution and job ([76fa986](https://github.com/tsukiy0-org/extensions-js/commit/76fa986986df21c6843d6895c4f7f9433e9f3851))


### Features

* add BatchRUntime tests ([0a1fef8](https://github.com/tsukiy0-org/extensions-js/commit/0a1fef8f33bff827e2165809cc390caf4ae2e81c))
* add DefaultProcessor ([0a2fa6b](https://github.com/tsukiy0-org/extensions-js/commit/0a2fa6b7b5f462aa6ca87b3948c4cc30407d67c8))
* add ExpressRuntime ([43cdf82](https://github.com/tsukiy0-org/extensions-js/commit/43cdf82280e02f0580a975a88b523c4b11b00a24))
* add HttpProxy ([dc332ad](https://github.com/tsukiy0-org/extensions-js/commit/dc332ade94fe54aefbe308405b3712ccce151214))
* add HttpProxyService ([49b5e59](https://github.com/tsukiy0-org/extensions-js/commit/49b5e5986855efa87733ab14b60267d8ebb61e84))
* refactor runtimes to create logger/correlation and pass to proces ([1b7af9f](https://github.com/tsukiy0-org/extensions-js/commit/1b7af9f7a683bf6a33d3f9129ba2fcd41ccf3255))
* remove middleware in favor of processor pattern ([e4ec0d3](https://github.com/tsukiy0-org/extensions-js/commit/e4ec0d3d678846aef9311d17c3909341927a9e03))
* try remove LogGroup ([0e0d567](https://github.com/tsukiy0-org/extensions-js/commit/0e0d5679de1ee780fe8d8f4e16df1d0cf3e5c5e2))





# [0.1.0-alpha.33](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.32...v0.1.0-alpha.33) (2021-09-12)


### Features

* expose batch job log group ([cf2c92b](https://github.com/tsukiy0-org/extensions-js/commit/cf2c92b656501b982923552e7758b1dfd04c7e59))





# [0.1.0-alpha.32](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.31...v0.1.0-alpha.32) (2021-09-12)


### Bug Fixes

* add docker in docker in deploy ([5f62cbb](https://github.com/tsukiy0-org/extensions-js/commit/5f62cbb9dbd76a635495239d682887f83b4dd4c9))
* ExamplePgDb imports ([0b217bd](https://github.com/tsukiy0-org/extensions-js/commit/0b217bda0ae6a6ebd4a7c18fa55c14510a1ef688))
* remove removal policy from fn ([c61141a](https://github.com/tsukiy0-org/extensions-js/commit/c61141a16d799606098a0b36a200356d75712307))


### Features

* add ExampleBatchJob ([13599c7](https://github.com/tsukiy0-org/extensions-js/commit/13599c7134e4486c27a3019ca72e9e917126fd92))
* delete lambda logs on remove lambda ([32c8f5a](https://github.com/tsukiy0-org/extensions-js/commit/32c8f5a302a826f7c9154229720e6ae022c95a31))
* update FargateBatchJob with log group and environment ([93a6500](https://github.com/tsukiy0-org/extensions-js/commit/93a65006b9fc7eb90407d3d69d12fe0dae902fed))





# [0.1.0-alpha.31](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.30...v0.1.0-alpha.31) (2021-09-11)

**Note:** Version bump only for package root





# [0.1.0-alpha.30](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.29...v0.1.0-alpha.30) (2021-09-11)


### Bug Fixes

* rename FargateBatchJob ([974ed42](https://github.com/tsukiy0-org/extensions-js/commit/974ed4249f5d5e08192599d192229a4a93ffd4e3))





# [0.1.0-alpha.29](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.28...v0.1.0-alpha.29) (2021-09-11)


### Bug Fixes

* load correct js ([3f19ca0](https://github.com/tsukiy0-org/extensions-js/commit/3f19ca091db90e088040fd8af626429623c909d3))


### Features

* add SqsBulkPurge ([6aebf8d](https://github.com/tsukiy0-org/extensions-js/commit/6aebf8d6823e740042683e3390638b0c5db040ec))
* attach dlq to fn to enable replay ([10abba3](https://github.com/tsukiy0-org/extensions-js/commit/10abba3c97fe0497d80552ada0d4ec571cebb92a))
* deploy bulk purge ([8b074a4](https://github.com/tsukiy0-org/extensions-js/commit/8b074a47e8e962c0b42b60c065119c2630b511ca))
* impl bulk purge lambda logic ([a454fb8](https://github.com/tsukiy0-org/extensions-js/commit/a454fb8087ccb455c05679c256bfc0614b9d2825))
* remove purge ([bdfc480](https://github.com/tsukiy0-org/extensions-js/commit/bdfc480813747e529f1bc1ac6b9fa42f737dad1d))
* update SqsMessageQueue with purge fn ([f901f11](https://github.com/tsukiy0-org/extensions-js/commit/f901f11f974a1cc74e58a766ecf8d80ec9d4eeb6))





# [0.1.0-alpha.28](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.27...v0.1.0-alpha.28) (2021-09-09)


### Features

* add HttpAlarm ([2feac38](https://github.com/tsukiy0-org/extensions-js/commit/2feac38174d69d73b5daa78ba427aa349ce5a9bf))
* add onAddAlarm ([dce0243](https://github.com/tsukiy0-org/extensions-js/commit/dce02431a2862e91d9f64fba2eb3d031002a3d5a))
* simplify names ([714372b](https://github.com/tsukiy0-org/extensions-js/commit/714372bd755a18246870088defa00ccb9550a63d))





# [0.1.0-alpha.27](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.26...v0.1.0-alpha.27) (2021-09-08)


### Bug Fixes

* remove Observability ([b2338c1](https://github.com/tsukiy0-org/extensions-js/commit/b2338c19c4aa8ae5af7b06fcf9231985d8756c3c))


### Features

* add DefaultLambdaRestApiObservability ([888c9ff](https://github.com/tsukiy0-org/extensions-js/commit/888c9ffae971ec53084e4bc02c543b6218e61bd9))
* add DefaultQueueObservability ([94b204d](https://github.com/tsukiy0-org/extensions-js/commit/94b204d066f0a4b64b241527073100c4190ecd68))
* add LogMetricAlarm ([431ac32](https://github.com/tsukiy0-org/extensions-js/commit/431ac3234f9eb5498dab75519a62a1fdc45d7c9c))
* add RestApiObservability ([d02e21f](https://github.com/tsukiy0-org/extensions-js/commit/d02e21fbf46c37846ea666a753df3d2f3d6a9453))
* add RestApiObservability ([8f0d642](https://github.com/tsukiy0-org/extensions-js/commit/8f0d642143ef452c66c876c75cf304b4d28b0a62))
* make thresholds optional ([ea6a15e](https://github.com/tsukiy0-org/extensions-js/commit/ea6a15eb50dfd9fc52170cf8af255e6245188f17))





# [0.1.0-alpha.26](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.25...v0.1.0-alpha.26) (2021-09-06)


### Bug Fixes

* import error ([0cdacd4](https://github.com/tsukiy0-org/extensions-js/commit/0cdacd41568d82ff4927212efc2f60654f908e7a))
* type error ([36bde28](https://github.com/tsukiy0-org/extensions-js/commit/36bde284cdf850145b0fcf821a1f8328ad0d6cf9))
* type error ([983437e](https://github.com/tsukiy0-org/extensions-js/commit/983437ee16c5ba7a59eea2bef5697bb92265b43c))


### Features

* add DefaultQueue ([1f578ff](https://github.com/tsukiy0-org/extensions-js/commit/1f578ffa39cb41bb9dfc9b7503aa8b8cbe7c70e3))
* add FargateBatchJob ([b543bd3](https://github.com/tsukiy0-org/extensions-js/commit/b543bd338eb0d9b0f5375b68f06fc09cf5a79c80))
* add FunctionObservability ([170bd5c](https://github.com/tsukiy0-org/extensions-js/commit/170bd5c8bc28deb96b506ea1897b97e5d19b6da2))
* add LogMetric ([13e15ea](https://github.com/tsukiy0-org/extensions-js/commit/13e15eac3607fff85e5bb4c3fd18bde0802c582e))
* add Observability to AppStack ([7bc8933](https://github.com/tsukiy0-org/extensions-js/commit/7bc8933bde990cb3764d256f28435505adda976c))
* add PublicDbInstance ([4c80395](https://github.com/tsukiy0-org/extensions-js/commit/4c8039524f2af6239caaf2269ad83e7d1e2ba62e))
* just queries in FunctionObservability and export LogMetric ([58b23ca](https://github.com/tsukiy0-org/extensions-js/commit/58b23ca6cf5222b62cfa27e22dde3e8e6e1d51b2))
* required engine, credentials and port for PublicDbInstance ([4603567](https://github.com/tsukiy0-org/extensions-js/commit/4603567655e9a7b3edd967331cb2bda3d98ca125))
* upgrade deps ([ed9a8e2](https://github.com/tsukiy0-org/extensions-js/commit/ed9a8e2b52a06df3e138f0a6d86dc8ed80b5e244))
* use DefaultQueue in LambdaQueue ([f9c20a4](https://github.com/tsukiy0-org/extensions-js/commit/f9c20a417ac950a4e27886dccea0e3b0ca942d97))





# [0.1.0-alpha.25](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.24...v0.1.0-alpha.25) (2021-08-27)


### Bug Fixes

* remove unused jobName ([63d70d1](https://github.com/tsukiy0-org/extensions-js/commit/63d70d125e4007284fdfc949da28d6981d02b616))





# [0.1.0-alpha.24](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.23...v0.1.0-alpha.24) (2021-08-26)


### Features

* make classes not abstract ([4384542](https://github.com/tsukiy0-org/extensions-js/commit/4384542d2da28ca1770641cc7e36352d0a9a1dac))





# [0.1.0-alpha.23](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.22...v0.1.0-alpha.23) (2021-08-26)


### Bug Fixes

* use triple-beam to get the MESSAGE symbol ([bf56798](https://github.com/tsukiy0-org/extensions-js/commit/bf56798179e047f4b36bb97a123fde63f4a4afb0))


### Features

* add BatchRuntime ([e60bc00](https://github.com/tsukiy0-org/extensions-js/commit/e60bc0014f8be0408edfef5c6c2ba3b4c3933261))
* BatchMessageQueue starts job with uniq env variable with message ([7118677](https://github.com/tsukiy0-org/extensions-js/commit/711867761390ac6b01e2774255c1c80a713c7745))
* remove logform/printf dependency ([b4dfa21](https://github.com/tsukiy0-org/extensions-js/commit/b4dfa2178cda36293cc6e40d6476870742e43754))





# [0.1.0-alpha.22](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.21...v0.1.0-alpha.22) (2021-08-26)


### Bug Fixes

* SqsLambdaRuntime integration tests ([ace9ec1](https://github.com/tsukiy0-org/extensions-js/commit/ace9ec1ddf4d0ffa2b92c55be1aad8eb24618be3))


### Features

* add DefaultQueue ([6fdcbe0](https://github.com/tsukiy0-org/extensions-js/commit/6fdcbe030e2b3c92402a7c4f4105960ef338b148))
* add IMessageQueue interface ([76b54ff](https://github.com/tsukiy0-org/extensions-js/commit/76b54ffad4383159fa0b73688824fe034a63caf3))
* impl BatchMessageQueue ([ac5b490](https://github.com/tsukiy0-org/extensions-js/commit/ac5b490a4c304a4039db7b2991d8b3698039594d))





# [0.1.0-alpha.21](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.20...v0.1.0-alpha.21) (2021-08-19)


### Bug Fixes

* dynamo db key schema ([721c52d](https://github.com/tsukiy0-org/extensions-js/commit/721c52dee6593b0f6b5fada2961ddc3778c87f93))


### Features

* add DefaultProcessor ([41fb158](https://github.com/tsukiy0-org/extensions-js/commit/41fb1585305ee2e7807c08750ee1ea911599e5d3))
* add IProcessor ([d2c67fe](https://github.com/tsukiy0-org/extensions-js/commit/d2c67fe87501d0f1c899785ef808622cd3842f09))
* add Message type ([dfc8d4b](https://github.com/tsukiy0-org/extensions-js/commit/dfc8d4b5d5f3344431ef0f230ce0f6882bb1d812))
* add MessageCorrelationService ([30ea7b7](https://github.com/tsukiy0-org/extensions-js/commit/30ea7b720c724eb71532e9b5d6b80f340879e488))
* IQueue uses message ([2f846a6](https://github.com/tsukiy0-org/extensions-js/commit/2f846a6f6de407a993024f2a15022c63e4f88837))
* runtime receives Message ([9bce878](https://github.com/tsukiy0-org/extensions-js/commit/9bce87840c86d9ba6816b524386b0399dbb7cda6))
* sqs lambda runtime uses MessageCorrelationService ([87f045c](https://github.com/tsukiy0-org/extensions-js/commit/87f045c687f314d6ce267fc522b2efdb8bbd911b))





# [0.1.0-alpha.20](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.19...v0.1.0-alpha.20) (2021-08-07)


### Features

* add ArrayExtensions.chunk ([a944951](https://github.com/tsukiy0-org/extensions-js/commit/a944951374d629d6fb72b7cb1e71566aa2dfffb1))
* add PromiseExtensions.allBatched ([dd2779b](https://github.com/tsukiy0-org/extensions-js/commit/dd2779b603f020fb01467f3c903c81c945898396))





# [0.1.0-alpha.19](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.18...v0.1.0-alpha.19) (2021-08-06)

**Note:** Version bump only for package root





# [0.1.0-alpha.18](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.17...v0.1.0-alpha.18) (2021-08-05)


### Bug Fixes

* bad import ([f5f6ce9](https://github.com/tsukiy0-org/extensions-js/commit/f5f6ce928d84ca686bc438cdc9422b164d1232dd))


### Features

* add ApiKeyAuthMiddleware ([898111a](https://github.com/tsukiy0-org/extensions-js/commit/898111a80b307d69f92af71e371c6d5c8f1abba6))





# [0.1.0-alpha.17](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.16...v0.1.0-alpha.17) (2021-07-28)


### Features

* bump dependencies ([d1f2f00](https://github.com/tsukiy0-org/extensions-js/commit/d1f2f000c13b986b2a235d2b27b5de1a8faf0ea3))





# [0.1.0-alpha.16](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.15...v0.1.0-alpha.16) (2021-07-27)


### Bug Fixes

* bad import ([9d17790](https://github.com/tsukiy0-org/extensions-js/commit/9d177909b191aa488d5492363f51da0ec6713a1c))
* try log traceId ([594b125](https://github.com/tsukiy0-org/extensions-js/commit/594b125461f4abc151afc7fb94bdf9bfe887f781))
* update shared correlation service ([cfd9d5f](https://github.com/tsukiy0-org/extensions-js/commit/cfd9d5f3da04c2f945495feda0af276de94bafc0))


### Features

* add ExpressLambdaRuntime ([2b27f69](https://github.com/tsukiy0-org/extensions-js/commit/2b27f69e4bf0e3ff2140265aa5d55c7704c298ef))
* add extensions-aws package ([debc0fc](https://github.com/tsukiy0-org/extensions-js/commit/debc0fc3416df4940df1102738e69f373c04bb66))
* add IQueue ([392d625](https://github.com/tsukiy0-org/extensions-js/commit/392d6257cde7e69f963ac7879a52c340a2f5766d))
* add PromiseExtensions ([540dc14](https://github.com/tsukiy0-org/extensions-js/commit/540dc1462daea4d0ddbf6c25263cabb41ddb619f))
* add SqsLambdaCorrelationService ([8bcc850](https://github.com/tsukiy0-org/extensions-js/commit/8bcc8504a3f067a2d731fb5dae8ce9411036000d))
* add SqsLambdaRuntime ([3f000e8](https://github.com/tsukiy0-org/extensions-js/commit/3f000e80d1631721a5f5ddc1facf98ca3df0ae34))
* add TestSqsLambdaRuntime ([4f0653e](https://github.com/tsukiy0-org/extensions-js/commit/4f0653e3075dc94d6aba8aaa96627707fab7e507))
* deploy TestSqsLambdaRuntime ([b00c3a0](https://github.com/tsukiy0-org/extensions-js/commit/b00c3a0fecaa62cf532011fd575465f7c6084cca))
* hide buildServices ([172d5a9](https://github.com/tsukiy0-org/extensions-js/commit/172d5a9fbe0f3565fd76cc4a3604365673400d67))
* impl SqsQueue ([fdc6bf9](https://github.com/tsukiy0-org/extensions-js/commit/fdc6bf9ffe371e444d3e5a00ba0955147e0fac50))


### Reverts

* Revert "test: express-example uses extensions-aws" ([7521b07](https://github.com/tsukiy0-org/extensions-js/commit/7521b0702f4483efa4bcc288007d6386ddf2e743))





# [0.1.0-alpha.15](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.14...v0.1.0-alpha.15) (2021-07-24)


### Bug Fixes

* FileMiddleware glob match on relative path ([65b66a8](https://github.com/tsukiy0-org/extensions-js/commit/65b66a8c8627d0df10e87b11d2b3d75e2405967b))


### Features

* add AbstractServicesMiddleware ([400a487](https://github.com/tsukiy0-org/extensions-js/commit/400a487d4cd57d2215b310d58415bdf023a5e29b))
* add CorrelationMiddleware ([f3c093d](https://github.com/tsukiy0-org/extensions-js/commit/f3c093dff6a2e0e4f036575fef279ba4684c8a89))
* add defaults for WinstonLogger when no correlation or transport ([2cbd17e](https://github.com/tsukiy0-org/extensions-js/commit/2cbd17eb903ec94506ff7aef31a754f3b3e21f42))
* add example ServicesMiddleware endpoint ([bba26a9](https://github.com/tsukiy0-org/extensions-js/commit/bba26a9f9448eff9e9af718e077d1b1f7307be36))
* add FileMiddleware for hosting and controlling cache ([b99655c](https://github.com/tsukiy0-org/extensions-js/commit/b99655cbcbb7ba6cdf85b5c7ce5be41716317caf))
* add ServicesMiddleware ([d18af90](https://github.com/tsukiy0-org/extensions-js/commit/d18af90b0d42cca92596fbd70a3ab61a1bdbd727))
* add StaticCorrelationService ([4704c1d](https://github.com/tsukiy0-org/extensions-js/commit/4704c1d2e5dbaa174d27f2e18a5b98c0fdb2a208))
* add Timespan ([e659120](https://github.com/tsukiy0-org/extensions-js/commit/e65912055f6fa4d1b802fad026067e0ced918902))
* add TimespanExtensions for quickly creating hours/mins/seconds ([4e65bfb](https://github.com/tsukiy0-org/extensions-js/commit/4e65bfb37b687c41aaf2a6e11ee5449299891103))
* add withTracing helper ([ad0bd7a](https://github.com/tsukiy0-org/extensions-js/commit/ad0bd7a8c1bf4cb530fc05ace49103a63a25ca2c))
* export Timespan and TimespanExtensions ([1f2aa19](https://github.com/tsukiy0-org/extensions-js/commit/1f2aa19738c44523e4de62019373ca356ed5b686))
* LoggerMiddleware depends on CorrelationMiddleware ([eb23785](https://github.com/tsukiy0-org/extensions-js/commit/eb23785b29c4a3ac9879f1c8e4fdea286c3c2d78))





# [0.1.0-alpha.14](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.13...v0.1.0-alpha.14) (2021-07-19)


### Bug Fixes

* reference BaseError internally ([5a36c37](https://github.com/tsukiy0-org/extensions-js/commit/5a36c37f24b8944ecff3bdafbd1d18f746ed7f58))


### Features

* add FetchError ([dbf3160](https://github.com/tsukiy0-org/extensions-js/commit/dbf3160ce84bfa3cb31405e5503e8547439db896))
* add FetchExtensions for processing response ([6172e4e](https://github.com/tsukiy0-org/extensions-js/commit/6172e4e3c453aade8dd952b4e65d451ad2a5141e))
* respond with 404 when NotFoundError ([c54c5a9](https://github.com/tsukiy0-org/extensions-js/commit/c54c5a91f1556af51ddf0a3ff4c7047c51bbd5ef))
* StaticSite not responsible for creating A record ([18e0f08](https://github.com/tsukiy0-org/extensions-js/commit/18e0f0859eb3c540f1b57c1aca118da375034639))
* stub out extensions-fetch ([d5d7261](https://github.com/tsukiy0-org/extensions-js/commit/d5d7261d3dedfd9673e511544507f5485df6f809))





# [0.1.0-alpha.13](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.12...v0.1.0-alpha.13) (2021-07-16)


### Bug Fixes

* use ICachePolicy interface ([757d73f](https://github.com/tsukiy0-org/extensions-js/commit/757d73f743236fdff7559b22e027e85c3ac08ba1))





# [0.1.0-alpha.12](https://github.com/tsukiy0-org/extensions-js/compare/v0.1.0-alpha.11...v0.1.0-alpha.12) (2021-07-16)


### Features

* abstract behaviors arg for StatiCSite ([c370812](https://github.com/tsukiy0-org/extensions-js/commit/c370812c86036f8d72c499bd5c43728a36bcf9be))





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
