import express from 'express';
import shortUrlRouter from './routes/shortUrlRoutes';
import { redirectUrl } from './controllers/redirectHandler';

const app = express();

app.use(express.json());

app.use('/shorten', shortUrlRouter);
app.use('/:shortcode', redirectUrl);

export default app;