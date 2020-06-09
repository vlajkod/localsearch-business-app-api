import express, { Request, Response, NextFunction } from 'express';

import { httpCodes } from '@constants';

import logger from '@conf/logger';
import morgan from '@conf/morgan';

import placesController from '@controllers/places-controller';

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

// controllers
app.use('/api', placesController);

// page not found handler
app.use((req: Request, res: Response, next: NextFunction) => {
    // logger.info('Page Not Found');
    return res.status(httpCodes.NOT_FOUND).json({
        error: 'Page Not Found'
    });
});

// general error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err);
    return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
        error: err.message
    });
});

export default app;
