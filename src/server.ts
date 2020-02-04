import express from 'express';

const app = express();
const PORT = 8080;

app.get('/', (req, res) => res.send('Hello world'));

export const start = () =>
  app.listen(PORT, 
    // TODO: replace console log with winston
    console.log(`Server started at http://localhost:${PORT}`));
