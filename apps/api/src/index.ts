import { createServer } from './server';

const port = process.env.PORT || 3011;
const server = createServer();

server.listen(port, () => {
  console.log(`api running on ${port}`);
});
