import Router, { Request, Response, NextFunction } from 'express';

import { httpCodes } from '@constants';
import { IPlace } from '@interfaces';
import httpAdapter from '@conf/http-adapter';
import placeService from '@services/places-service';

const router = Router();

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

router.get('/:reference', async (req: Request, res: Response, next: NextFunction) => {
    const { reference } = req.params;
    try {
        const response = await httpAdapter.get(`${process.env.PLACES_API_URL}/${reference}`);
        const data = placeService.getFormatedPlaceData(response);
        res.status(httpCodes.OK).json({
            data
        });
    } catch (err) {
        next(err);
    }
});

export default router;
