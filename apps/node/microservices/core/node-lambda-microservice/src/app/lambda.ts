import fastify from 'fastify';
import {
  LambdaError,
  LambdaResponse,
} from '@cloudy-brick/node/node-microservice-model-lambda';
import prettifier from '@mgcrea/pino-pretty-compact';
import fastifyRequestLogger from '@mgcrea/fastify-request-logger';
import lambdas from './lambdas';
import { tryParseJSONObject } from '@cloudy-brick/node/utils';

export const HTTP_PORT = process.env.HTTP_PORT ? process.env.HTTP_PORT : 8080;
export const lambdaSrv = fastify({
  disableRequestLogging: true,
  logger:
    process.env.NODE_ENV.toLocaleLowerCase() !== 'test'
      ? { prettyPrint: true, prettifier }
      : undefined,
});

if (process.env.NODE_ENV.toLocaleLowerCase() !== 'test') {
  lambdaSrv.register(fastifyRequestLogger);
}

Object.keys(lambdas).forEach((key: string) => {
  const lambda = lambdas[key];

  lambdaSrv.route({
    method: lambda.method,
    url: lambda.url,
    handler: (request, reply) => {
      try {
        const lambdaHandlerResult = lambda.handler(request, reply);
        reply.send(lambdaHandlerResult);
      } catch (error) {
        if (error instanceof LambdaError) {
          reply.status(500).send(error.toString());
        } else {
          throw error;
        }
      }
    },
    onSend: (request, reply, payload, done) => {
      let newPayload: LambdaResponse;

      if (Buffer.isBuffer(payload)) return done(null, payload);
      if (typeof payload === 'string') {
        const parsedPayload = tryParseJSONObject(payload);
        if (parsedPayload) {
          switch (reply.statusCode) {
            case 200:
              newPayload = {
                status: 'SUCCESS',
                message: { data: JSON.parse(payload as string) },
              };
              break;
            case 500:
              if (parsedPayload.code) {
                newPayload = {
                  status: 'ERROR',
                  message: { error: parsedPayload },
                };
              } else {
                newPayload = {
                  status: 'ERROR',
                  message: {
                    error: {
                      code: 'UNKNOWN',
                      message: '',
                      info: parsedPayload,
                    },
                  },
                };
              }
              break;
          }
          done(null, JSON.stringify(newPayload));
        } else {
          done(null, payload);
        }
      }
    },
  });
});
