import dotenv from 'dotenv';

dotenv.config({
    path: `./env/${process.env.NODE_ENV}.env`
});

dotenv.config();
import app from './app';
import logger from '@conf/logger';

app.listen(process.env.PORT, () => {
    logger.info(`\nServer start on http://${process.env.HOST}:${process.env.PORT}`);
});
