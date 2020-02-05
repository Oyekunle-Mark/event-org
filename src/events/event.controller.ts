import { Request, Response } from 'express';
import { check, validationResult } from "express-validator";

import { Events } from './event.model';
import response from '../utils/response';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await Events.find().lean().exec();

        return response(res, 200, 'data', events);
    } catch (err) {
        return response(res, 500, 'error', err);
    }
}

export const createEvent = async (req: Request, res: Response) => {
    try {
        await check("creator", "Event creator name must be longer than 4 characters.").isLength({ min: 4 }).run(req);
        await check("title", "Event title must be longer than 3 characters.").isLength({ min: 3 }).run(req);
        await check("description", "Event description must be longer than 10 characters.").isLength({ min: 10 }).run(req);
        await check("venue", "Event venue must be longer than 5 characters.").isLength({ min: 5 }).run(req);
        await check("isFree", "isFree property must be a boolean.").isBoolean().run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return response(res, 400, 'error', errors.array());
        }

        const event = await Events.create({ ...req.body });

        return response(res, 201, 'data', event);
    } catch (err) {
        return response(res, 500, 'error', err);
    }
}

export const updateEvent = async (req: Request, res: Response) => {
    try {
        await check("creator", "Event creator name must be longer than 4 characters.").isLength({ min: 4 }).run(req);
        await check("title", "Event title must be longer than 3 characters.").isLength({ min: 3 }).run(req);
        await check("description", "Event description must be longer than 10 characters.").isLength({ min: 10 }).run(req);
        await check("venue", "Event venue must be longer than 5 characters.").isLength({ min: 5 }).run(req);
        await check("isFree", "isFree property must be a boolean.").isBoolean().run(req);
        await check("id", "Request parameter must be provided").isMongoId().run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return response(res, 400, 'error', errors.array());
        }

        const { id } = req.params;
        const event = await Events.findOneAndUpdate({ _id: id }, req.body, { new: true }).lean().exec();

        return response(res, 201, 'data', event);
    } catch (err) {
        return response(res, 500, 'error', err);
    }
}

export const deleteEvent = async (req: Request, res: Response) => {
    try {
        await check("id", "Request parameter must be provided").isMongoId().run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return response(res, 400, 'error', errors.array());
        }

        const { id } = req.params;
        const event = await Events.findOneAndRemove({ _id: id }, req.body);

        return response(res, 201, 'data', event);
    } catch (err) {
        return response(res, 500, 'error', err);
    }
}
