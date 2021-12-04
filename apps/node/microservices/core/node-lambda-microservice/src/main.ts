import { HTTP_PORT, lambdaSrv } from './app/lambda';

lambdaSrv.listen(HTTP_PORT, '0.0.0.0', (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Lambda Server listening at ${address}`);
});
