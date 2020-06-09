import Router from 'express';
import morgan from 'morgan';

import { httpCodes } from '@constants';
import logger from '@conf/logger';

const morganFormat = process.env.ENV !== 'production' ? 'tiny' : 'combined';
const morganRouter = Router();

morganRouter.use(
    morgan(morganFormat, {
        skip(req, res) {
            return res.statusCode < httpCodes.BAD_REQUEST;
        },
        stream: {
            write: (message) => {
                logger.error(message);
            }
        }
    })
);

morganRouter.use(
    morgan(morganFormat, {
        skip(req, res) {
            return res.statusCode >= httpCodes.BAD_REQUEST;
        },
        stream: {
            write: (message) => {
                logger.info(message);
            }
        }
    })
);

export default morganRouter;
