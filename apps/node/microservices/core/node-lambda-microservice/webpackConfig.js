
module.exports = (config, context) => {
    return {
      ...config,
      entry:{
        "app/lambdas/index": "./apps/node/microservices/core/node-lambda-microservice/src/app/lambdas/index.ts",
        ...config.entry
      },
      output: {
        ...config.output,
        filename: "[name].js",
      },
      externals: {
        "./lambdas": "src/app/lambdas"
      }
    };
  };