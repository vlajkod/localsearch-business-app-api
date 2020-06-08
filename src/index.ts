import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';

import logger from '@conf/logger';
import morgan from '@conf/morgan'

import { httpCodes } from '@constants';

const isProduction = process.env.ENV === 'production';
dotenv.config();

const app = express();

// general config
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10240kb' }));
app.set('port', process.env.PORT);

// http request logging
app.use(morgan);

// index page
app.get('/', (req, res) => res.send('Localsarch API'));

// healtcheck
app.get('/healthcheck', (req, res) => res.send('Healthy!'));


// page not found handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(httpCodes.BAD_REQUEST).json({
        error: err.message,
    });
});

if (!isProduction) {
    app.listen(process.env.PORT, () => console.log(`> Server listening at http://localhost:${process.env.PORT}`));
}

export default app;