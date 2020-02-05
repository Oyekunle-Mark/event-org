import { Request, Response } from 'express';
// import { check, sanitize, validationResult } from "express-validator";

import { Events } from './event.model';
import response from '../utils/response';

export const getEvents = async (req: Request, res: Response): Promise<void> => {
    try {
        const events = await Events.find().lean().exec();

        response(res, 200, 'data', events);
    } catch (err) {
        response(res, 500, 'error', err);
    }
}
