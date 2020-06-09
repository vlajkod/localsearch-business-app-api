import Router, { Request, Response } from 'express';

import { httpCodes } from '@constants';
import { IPlace } from '@interfaces';
import httpAdapter from '@conf/http-adapter';
import logger from '@conf/logger';

const router = Router();
const PLACES_API_URL = 'https://storage.googleapis.com/coding-session-rest-api';

router.get('/', (req: Request, res: Response) => {
    const data: IPlace[] = [
        {
            name: 'Casa Ferlin',
            reference: 'GXvPAor1ifNfpF0U5PTG0w'
        },
        {
            name: 'Le Café du Marché',
            reference: 'ohGSnJtMIC5nPfYRi_HTAg'
        }
    ];
    res.status(httpCodes.OK).json({
        data
    });
});

router.get('/:reference', async (req: Request, res: Response) => {
    const { reference } = req.params;
    try {
        const data = await httpAdapter.get(`${PLACES_API_URL}/${reference}`);
        res.status(httpCodes.OK).json({
            data
        });
    } catch (err) {
        logger.error(err.message, err);
        res.status(httpCodes.BAD_REQUEST).json({
            message: err.message
        });
    }
});

export default router;
