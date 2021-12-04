import { lambdaSrv } from './app/lambda';

describe('Lambda System Testing', () => {
  it('Zero Test', () => {
    expect(true).toBeTruthy();
  });
  it('Test status', async () => {
    const response = await lambdaSrv.inject({
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      url: '/_status',
    });
    expect(response).toBeDefined();
    expect(response.statusCode).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody.status).toBeDefined();
    expect(parsedBody.status).toBe('SUCCESS');
    expect(parsedBody.message).toBeDefined();
    expect(parsedBody.message.data).toBeDefined();
    expect(parsedBody.message.data.msg).toBeDefined();
    expect(parsedBody.message.data.msg).toBe('OK');
  });

  it('Test health', async () => {
    const response = await lambdaSrv.inject({
      method: 'GET',
      url: '/_health',
    });
    expect(response).toBeDefined();
    expect(response.statusCode).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody.status).toBeDefined();
    expect(parsedBody.status).toBe('SUCCESS');
    expect(parsedBody.message).toBeDefined();
    expect(parsedBody.message.data).toBeDefined();
    expect(parsedBody.message.data.msg).toBeDefined();
    expect(parsedBody.message.data.msg).toBe('OK');
  });

  it('Test error', async () => {
    const response = await lambdaSrv.inject({
      method: 'GET',
      url: '/~error',
    });
    expect(response).toBeDefined();
    expect(response.statusCode).toBeDefined();
    expect(response.statusCode).toBe(500);
    expect(response.body).toBeDefined();
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody.status).toBeDefined();
    expect(parsedBody.status).toBe('ERROR');
    expect(parsedBody.message).toBeDefined();
    expect(parsedBody.message.error).toBeDefined();
    expect(parsedBody.message.error.code).toBeDefined();
    expect(parsedBody.message.error.code).toBe('TEST_ERROR');
    expect(parsedBody.message.error.info).toBeDefined();
    expect(parsedBody.message.error.message).toBeDefined();
    expect(parsedBody.message.error.message).toBe('this is a test error');
  });

  it('Test error not well handled', async () => {
    const response = await lambdaSrv.inject({
      method: 'GET',
      url: '/~error_2',
    });
    expect(response).toBeDefined();
    expect(response.statusCode).toBeDefined();
    expect(response.statusCode).toBe(500);
    expect(response.body).toBeDefined();
    const parsedBody = JSON.parse(response.body);
    expect(parsedBody.status).toBeDefined();
    expect(parsedBody.status).toBe('ERROR');
    expect(parsedBody.message).toBeDefined();
    expect(parsedBody.message.error).toBeDefined();
    expect(parsedBody.message.error.code).toBeDefined();
    expect(parsedBody.message.error.code).toBe('UNKNOWN');
    expect(parsedBody.message.error.info).toBeDefined();
    expect(parsedBody.message.error.info.error).toBeDefined();
    expect(parsedBody.message.error.info.error).toBe('Internal Server Error');
    expect(parsedBody.message.error.info.message).toBeDefined();
    expect(parsedBody.message.error.info.message).toBe('this is a test error');
  });

  it('Test pdf handled', async () => {
    const response = await lambdaSrv.inject({
      method: 'GET',
      url: '/pdf',
    });
    expect(response).toBeDefined();
    expect(response.statusCode).toBeDefined();
    expect(response.statusCode).toBe(200);
    expect(response.body).toBeDefined();
    expect(Buffer.isBuffer(response.body));
  });
});
