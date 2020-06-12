import { httpCodes } from '@constants';

export interface IException extends Error {
    code: number;
    message: string;
}

const BadRequest = (message: string): IException => ({
    code: httpCodes.BAD_REQUEST,
    message,
    name: 'Bad Request'
});

const NotFound = (message = 'Not Found'): IException => ({
    code: httpCodes.NOT_FOUND,
    message,
    name: 'Not Found'
});

// Business rule exceptions
const PlaceDataException = (message: string): IException => ({
    code: httpCodes.PLACE_DATA_EXCEPTION,
    message,
    name: 'Place Data Exception'
});

export { BadRequest, NotFound, PlaceDataException };
