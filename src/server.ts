import express, { Request, Response } from 'express';

const app = express();
const PORT = 8080;

app.get('/', (_: Request, res: Response) => res.status(200).json({
  status: 200,
  message: "Welcome to the event manage API"
}));

export const start = (): void =>
  app.listen(PORT,
    // TODO: replace console log with winston
    console.log(`Server started at http://localhost:${PORT}`));
