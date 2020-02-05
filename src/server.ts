import express, { Request, Response } from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';

const server = express();
const PORT = 8080;

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
  message: 'That URL looks quite fishy, mate!',
}));

export const start = (): void =>
  server.listen(PORT,
    // TODO: replace console log with winston
    console.log(`Server started at http://localhost:${PORT}`));
