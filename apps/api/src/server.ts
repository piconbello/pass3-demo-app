import { json, urlencoded } from 'body-parser';
import express, { type Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';

const PASS3_CLIENT_ID = '1234';
const PASS3_CLIENT_SECRET = 'cemal';

export const createServer = (): Express => {
  const app = express();
  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get('/message/:name', (req, res) => {
      return res.json({ message: `hello ${req.params.name}` });
    })
    .get('/status', (_, res) => {
      return res.json({ ok: true });
    })
    .get('/auth/pass3/:code', async (req, res) => {
      console.log(`The code is ${req.params.code}`);

      // Call the pass3 validation service
      // if the code is valid, return a token
      // if the code is invalid, return an error
      const response = await fetch('https://api.pass3.co/api/v1/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          attemptId: req.params.code,
          clientId: PASS3_CLIENT_ID,
          clientSecret: PASS3_CLIENT_SECRET,
        }),
      })
        .then((res) => res.json())
        .catch((err) => {
          console.error('Error: ', err);
          return { error: 'An error occurred' };
        });

      return res.json(response);
    });

  return app;
};
