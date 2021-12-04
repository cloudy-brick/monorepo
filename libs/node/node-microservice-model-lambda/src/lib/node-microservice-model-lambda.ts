import { HTTPMethods } from 'fastify/types/utils';

export interface LambdaResponseData {
  data: any;
}

export class LambdaError extends Error {
  constructor(public code: string, public message: string, public info: any) {
    super();
  }
  toString() {
    return JSON.stringify(this);
  }
}

export interface LambdaResponseError {
  error: {
    code: string;
    message: string;
    info: any;
  };
}

export interface LambdaResponse {
  status: 'SUCCESS' | 'ERROR';
  message: LambdaResponseData | LambdaResponseError;
}

export interface LambdaDefinition {
  method: HTTPMethods;
  url: string;
  handler: (request, response, next?) => unknown;
}
