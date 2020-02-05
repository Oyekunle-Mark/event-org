import { Response } from 'express';

type flagLabel = 'data' | 'error' | 'message';

export default (res: Response, status: number, flag: flagLabel, data: object | null | string): Response => {
    return res.status(status).json({
        status,
        [flag === 'data' ? 'data' : 'error']: data
    })
}
