import { Request, Response } from 'express';
// import { check, sanitize, validationResult } from "express-validator";

import { Events } from './event.model';

export const getEvents = async (req: Request, res: Response) => {
    try {
        const events = await Events.find().lean().exec();

        res.status(200).json({
            status: 200,
            data: events,
        })
    } catch (err) {
        res.status(500).json({
            status: 500,
            error: `Internal server error: ${err}`
        })
    }
}