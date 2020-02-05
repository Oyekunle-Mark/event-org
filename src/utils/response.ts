import { Response } from 'express';

type flagLabel = 'data' | 'error';

export default (res: Response, status: number, flag: flagLabel, data: object | null): Response => {
    return res.status(status).json({
        status,
        [flag === 'data' ? 'data' : 'error']: flag === 'data' ? data : `Internal server error: ${data}`
    })
}
