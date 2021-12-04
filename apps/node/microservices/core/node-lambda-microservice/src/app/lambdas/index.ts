import {
  LambdaDefinition,
  LambdaError,
} from '@cloudy-brick/node/node-microservice-model-lambda';
import * as fs from 'fs';
import path = require('path');

const statusLambda: LambdaDefinition = {
  method: 'GET',
  url: '/_status',
  handler: (request, reply) => {
    reply.status(200);
    return { msg: 'OK' };
  },
};
const healthLambda: LambdaDefinition = {
  method: 'GET',
  url: '/_health',
  handler: (request, reply) => {
    reply.status(200);
    return { msg: 'OK' };
  },
};
const errorLambda: LambdaDefinition = {
  method: 'GET',
  url: '/~error',
  handler: (request, reply) => {
    throw new LambdaError('TEST_ERROR', 'this is a test error', {
      manydata: '',
    });
  },
};

const errorLambda2: LambdaDefinition = {
  method: 'GET',
  url: '/~error_2',
  handler: (request, reply) => {
    throw new Error('this is a test error');
  },
};

const pdfLambda: LambdaDefinition = {
  method: 'GET',
  url: '/pdf',
  handler: (request, reply) => {
    const buffer = fs.readFileSync(path.join(__dirname,'./file.pdf'));
    reply.send(buffer);
  },
};

const lambdas = {
  status: statusLambda,
  health: healthLambda,
  error: errorLambda,
  error2: errorLambda2,
  pdf: pdfLambda,
};

export default lambdas;
