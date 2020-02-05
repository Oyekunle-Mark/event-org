import express, { Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';

const server = express();
const PORT = 8080;

server.get('/', (_: Request, res: Response) => res.status(200).json({
  status: 200,
  message: "Welcome to the event manage API"
}));

export const start = (): void =>
  server.listen(PORT,
    // TODO: replace console log with winston
    console.log(`Server started at http://localhost:${PORT}`));
