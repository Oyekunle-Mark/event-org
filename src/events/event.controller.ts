import { Request, Response } from 'express';
import { check, validationResult } from "express-validator";

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

export const createEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        await check("creator", "Event creator name must be longer than 4 characters.").isLength({ min: 4 }).run(req);
        await check("title", "Event title must be longer than 3 characters.").isLength({ min: 3 }).run(req);
        await check("description", "Event description must be longer than 10 characters.").isLength({ min: 10 }).run(req);
        await check("venue", "Event venue must be longer than 5 characters.").isLength({ min: 5 }).run(req);
        await check("isFree", "isFree property missing.").isBoolean().run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return response(res, 400, 'error', errors.array());
        }

        const event = Events.create({ ...req.body });

        response(res, 201, 'data', event);
    } catch (err) {
        response(res, 500, 'error', err);
    }
}
