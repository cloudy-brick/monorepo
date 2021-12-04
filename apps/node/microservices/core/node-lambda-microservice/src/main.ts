import { HTTP_PORT, lambdaSrv } from './app/lambda';

lambdaSrv.listen(HTTP_PORT, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Lambda Server listening at ${address}`);
});
