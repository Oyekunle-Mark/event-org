import express, { Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import { config } from 'dotenv';

import output from './utils/logger';
import connect from './utils/db';

config();
const server = express();
const { PORT, MONGODB_URI } = process.env;

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(logger('dev'));
server.use(helmet());
server.use(compression());
server.use(cors());

server.get('/', (_: Request, res: Response) => res.status(200).json({
  status: 200,
  message: "Welcome to the event manage API"
}));

server.use((_: Request, res: Response) => res.status(404).json({
  status: 404,
  error: 'That URL looks quite fishy, mate!',
}));

export const start = async (): Promise<void> => {
  try {
    await connect(MONGODB_URI as string);
    server.listen(PORT, () => output.debug(`Server started at http://localhost:${PORT}`));
  } catch (err) {
    output.error(`Error starting server: {err}`);
  }
}
